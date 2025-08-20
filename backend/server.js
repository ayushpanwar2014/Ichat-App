import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { chats } from './src/data/data.js';

dotenv.config();


const app = express();

const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

app.get('/api/chats', (req,res) => {
    res.send(chats)
})


app.listen(PORT, () => {
    console.log('Server is running ', PORT);
});