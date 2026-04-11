import { asyncHandlers } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandlers(async (req, res) => {

    // Get data from Frontend
    const { fullName, email, username, password } = req.body;

    console.log("email:", email);

    // Validation
    if ([username, fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    // Get files safely
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Create user
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    // Response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

    // ------- Login User-----//

    const loginUser=asyncHandlers(async(req,res)=>{
        // User Requirements are here
        // req->body=data
        // username or em

        const{email,username,password}=req.body

        if(username || email){
            throw new ApiError(400,"Username or Email is required")
        }
    })

export { registerUser };