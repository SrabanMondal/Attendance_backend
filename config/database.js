import mongoose from "mongoose";

const ConnectDb = async ()=>{
   await mongoose.connect(process.env.MONGO_URI,{
        dbName:"Students"
    }).then(()=>console.log("DataBase Connected Successfully")).catch((e)=>console.log(e));
}

export default ConnectDb;