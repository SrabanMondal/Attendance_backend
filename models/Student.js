import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    Name:{
        type:String,
    },
    Rollnumber:{
        type:String,
    },
    record:{
        type:String,
        default:"Absent"
    },
    Datepresent:{
        type:Date
    }
},{versionKey:false});
const Student = mongoose.model("Student",StudentSchema);

export default Student;
