// require ('dotenv').config({path:'./env'});

import dotenv from "dotenv";
import { app } from "./app.js";

import connectDB from "./db/index.js";
dotenv.config({
    path:'./.env'});

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at port :${process.env.PORT}`)
  })
})
.catch((error)=> {
      console.log("Mongodb connection failed !!",error);
})

























// first Method to connect to MongoDB  

/*
( async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
    }
    catch (error){
        console.log(error);
    }
})()

*/