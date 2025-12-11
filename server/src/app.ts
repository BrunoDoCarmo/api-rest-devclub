import express from 'express'
import dotenv from 'dotenv'
import router from './routes/routes'
import cors from "cors";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}))
app.use('/api', router)

export default app