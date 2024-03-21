import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import authR from './routes/auth.r.js'
import passport from 'passport'
import initializePassport from './passport-config.js'
import session from 'express-session'
import flash from 'express-flash'
import MongoStore from 'connect-mongo'
import http from 'http'
import {Server} from 'socket.io'

const app = express();
const PORT = process.env.port || 5000
const server = http.createServer(app);
const dbUrl = process.env.DATABASE;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Passport config
initializePassport(passport)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: dbUrl, collectionName: 'sessions'}),
    cookie: {
        maxAge: 60000*60
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req,res) => {
    res.send("SUCCESS");
})
app.use('/auth', authR);

//Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (client) => {
    console.log('Client connected');
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
})

//Connect server
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to database')
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})
