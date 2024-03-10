import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const PORT = process.env.port || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.get('/', (req,res) => {
    res.send("SUCCESS");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})