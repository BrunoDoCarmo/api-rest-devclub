import "./config/env";
import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import router from './routes/routes';
import { env } from "process";

dotenv.config()

const app = express()

app.use(express.json())
app.use(
    cors(
        {
            origin: env.APP_URL,
            credentials: true, 
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }
    )
)
app.use('/api', router)

export default app