import express from "express"
import { addstudent,updateAttendence,getcsv,getallstudents } from "../controllers/Student.controller.js";
const studentRouter = express.Router();

studentRouter.post("/add",addstudent);
studentRouter.put("/update",updateAttendence);
studentRouter.get("/getcsv",getcsv);
studentRouter.get("/getdata",getallstudents);
export default studentRouter;