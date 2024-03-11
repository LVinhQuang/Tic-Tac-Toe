import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import authR from './routes/auth.r.js'

const app = express();
const PORT = process.env.port || 5000
const URI = 'mongodb+srv://titanlight:4zlVQcEGxVs7Bt1u@cluster0.yijkebc.mongodb.net/'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.get('/', (req,res) => {
    res.send("SUCCESS");
})
app.use('/auth', authR);
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})