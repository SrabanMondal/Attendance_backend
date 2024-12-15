import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import studentRouter from "./routes/Student.routes.js";
import ConnectDb from "./config/database.js";
import cors from "cors"
dotenv.config();
ConnectDb();
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/student",studentRouter);
export default app;