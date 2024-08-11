import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import authR from './routes/auth.r.js'
import updateScoreC from './controllers/updateScore.c.js'
import passport from 'passport'
import initializePassport from './passport-config.js'
import session from 'express-session'
import flash from 'express-flash'
import MongoStore from 'connect-mongo'
import http from 'http'
import { Server } from 'socket.io'
import accountM from './models/account.m.js';

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Passport config
initializePassport(passport)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE, collectionName: 'sessions' }),
    cookie: {
        sameSite: 'none',
        secure: true,
        maxAge: 60000 * 60,
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send("SUCCESS");
})
app.use('/auth', authR);
app.post('/api/update-score', updateScoreC.updateScore);

//Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const rooms = [];
function updateRoom(roomId, playerData, joining) {
    // Tìm phòng với mã phòng tương ứng
    const roomIndex = rooms.findIndex(room => room.roomId === roomId);
    if (roomIndex !== -1) {
        if (joining) {
            // Thêm người chơi vào phòng
            rooms[roomIndex].players.push(playerData);
        } else {
            // Xóa người chơi khỏi phòng
            const playerIndex = rooms[roomIndex].players.findIndex(player => player.email === playerData.email);
            if (playerIndex !== -1) {
                rooms[roomIndex].players.splice(playerIndex, 1);
            }

            // Nếu không còn người chơi nào trong phòng, xóa phòng
            if (rooms[roomIndex].players.length === 0) {
                rooms.splice(roomIndex, 1);
            }
            else {
                rooms[roomIndex].players[0].isReady = false;
            }
        }
        io.emit('currentRooms', {rooms: rooms});
        io.to(roomId).emit('roomDetails', {room: rooms[roomIndex]});
    }
    else {
        rooms.push({roomId: roomId, roomName: playerData.fullname, players: [playerData]});
        io.emit('currentRooms', {rooms: rooms});
    }
}

io.on('connection', (socket) => {
    const userId = socket.id;
    console.log('Client connected: ',userId);
    socket.on('disconnect', (reason) => {
        console.log(reason);
        //find room id that rooms have userId
        const roomIndex = rooms.findIndex(room => room.players.some(player => player.socketId === userId));
        if (roomIndex !== -1) {
            const playerData = rooms[roomIndex].players.find(player => player.socketId === userId);
            updateRoom(rooms[roomIndex].roomId, playerData, false);
        }
        console.log('Client disconnected: ',userId);
    })
    socket.on('currentRooms', () => {
        socket.emit('currentRooms', {rooms: rooms});
    })
    socket.on('joinRoom', (data) => {
        let roomId = data.roomId;
        let userData= data.userData;
        userData.socketId = userId;
        userData.isReady = false;
        socket.join(roomId);
        updateRoom(roomId, userData, true);
    })
    socket.on('getRoomDetails', async (data) => {
        const roomId = data.roomId;
        const room = rooms.find(room => room.roomId === roomId);
        if (room.players.length === 2) {
            let player1 = await accountM.findOne({email: room.players[0].email});
            let player2 = await accountM.findOne({email: room.players[1].email});
            room.players[0].score = player1.score;
            room.players[1].score = player2.score;
        }
        io.to(roomId).emit('roomDetails', {room: room});
    })
    socket.on('changeReadyStatus', (data) => {
        const roomId = data.roomId;
        const playerData = data.userData;
        const roomIndex = rooms.findIndex(room => room.roomId === roomId);
        if (roomIndex !== -1) {
            const playerIndex = rooms[roomIndex].players.findIndex(player => player.email === playerData.email);
            if (playerIndex !== -1) {
                rooms[roomIndex].players[playerIndex].isReady = !rooms[roomIndex].players[playerIndex].isReady;
                io.to(roomId).emit('roomDetails', {room: rooms[roomIndex]});
            }
        }
        if (rooms[roomIndex].players.every(player => player.isReady)) {
            io.to(roomId).emit('startGame', {room: rooms[roomIndex]});
        }
    })
    socket.on('leaveRoom', (data) => {
        const roomId = data.roomId;
        const userData = data.userData;
        socket.leave(roomId);
        updateRoom(roomId, userData, false);
    })
    socket.on('move', (data) => {
        socket.broadcast.emit('move', {i: data.i,j: data.j});
    })
    socket.on('resetGame', (data) => {
        console.log("RESET GAME")
        const roomId = data.roomId;
        const roomIndex = rooms.findIndex(room => room.roomId === roomId);
        rooms[roomIndex].players.forEach(player => {
            player.isReady = false;
        });
        io.to(roomId).emit('resetGame');
    })
});

//Connect server
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database')
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
