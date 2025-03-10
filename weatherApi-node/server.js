import express, { json } from 'express'
import cors from "cors"
import dotenv from "dotenv"

import router from './routers/weather.js';


dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/weather",router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))