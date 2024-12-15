import Student from "../models/Student.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError,.js"
import moment from "moment"
import { Parser } from "json2csv"
const addstudent = async(req,res)=>{
    try {
        const {name,rollnumber} = req.body;
        if(!name||!rollnumber){
            return res.status(400).json(new ApiResponse(false,"Name and RollNumber is Required"));
        }
        const prevstudent = await Student.find({
            Rollnumber:rollnumber
        })
        if(prevstudent.length>0){
            return res.status(400).json(new ApiResponse(false,"Student Already Exists"));
        }
        const student  =  await Student.create({
            Name:name,
            Rollnumber:rollnumber
        });
        res.status(201).json(new ApiResponse(true,"Student Created Succesfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false,error.message));
    }
}

const updateAttendence = async(req,res)=>{
    try {
        const formattedDate = moment().format('YYYY-MM-DD');
        const {data} = req.body;
        for(let i=0;i<data.length;i++)
        {
            const student = await Student.findOne({Rollnumber:data[i].rollnumber});
            student.record = data[i].record;
            student.Datepresent = formattedDate;
            await student.save();
        }
        res.status(200).json(new ApiResponse(true,"Attendence Success"));
    } catch (error) {
        res.status(500).json(new ApiError(false,error.message));
    }
}
const getcsv = async(req,res)=>{
    try {
        const formattedDate = moment().format('DD-MM-YYYY');
        const data = await Student.find().lean().select("Name Rollnumber record -_id");
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(data);
        const header = ` CLASS :- A1 (${formattedDate})\n\n\n`
        const finalcsv = header+csv;
        res.header('Content-Type', 'text/csv');
        res.attachment(`${formattedDate}.csv`);
        res.send(finalcsv);
    } catch (error) {
        res.status(500).json(new ApiError(false,error.message));
    }
}
const getallstudents = async(req,res)=>{
    try {
        const students = await Student.find();
        const student = [];
        for(let i=0;i<students.length;i++)
        {
            const data = {
                Name:students[i].Name,
                Rollnumber:students[i].Rollnumber
            }
            student.push(data);
        }
        res.status(200).json(new ApiResponse(true,student));  
    } catch (error) {
        res.status(500).json(new ApiError(false,error.message));
    }

}
export {addstudent,updateAttendence,getcsv,getallstudents};
