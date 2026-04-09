import {asyncHandlers} from "../utils/asyncHandlers.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandlers(async (req,res)=>{

    // Get data from Frontend 

    const{fullName,email,username,password} =req.body
    console.log("email:",email);

    res.status(200).json({
        message:"success"
    });
    

    // Check Validation 

    if (
        [username,FullName,email,password].some((field)=>
           field?.trim() === "" )
    ){
        throw new ApiError(400,"All fields are required")
    }

    // Chech if the User is already exit

    const exitedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(exitedUser){
        throw new ApiError(409,"User with username or email has already exit")
    }

    // Check for Image and Avatar

    const avatarLocalPath=req.file?.avatar[0]?.path;
    const coverImageLocalPath=req.file?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // Upload them to cloudinary ,Avatar

    const avatar= await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    // Create the User Object And Enter into database

    User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase

    })

})


export {registerUser}