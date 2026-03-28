import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";



const connectDB= async () =>{
       try{

         const connectionIsntance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${ connectionIsntance.connection.host}`);

       }
       catch(error){
        console.log("MONGODB connection failed");
        process.exit(1);
       }
   }

   export default connectDB;