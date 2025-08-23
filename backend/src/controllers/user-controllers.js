
import SessionModel from "../models/session-model.js";
import UserModel from "../models/user-model.js";
import { v2 as cloudinary } from 'cloudinary';



//setting age for cookies to be expire
export const accessTokenAge = 1000 * 60 * 15; // 15 mins
export const refreshTokenAge = 1000 * 60 * 60 * 24 * 7; // 7 days

//register
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const imageFile = req.file

        if (imageFile) {

            //Checking User Exist
            const userExist = await UserModel.findOne({ email: email });

            if (userExist) {
                return res.status(404).json({ success: false, msg: "User already exists!" });
            }

            //image upload in cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageURL = imageUpload.secure_url;

            //Creating User
            const createUser = await UserModel.create({
                name: name,
                email: email,
                password: password,
                image: imageURL
            });

            // creating access token and refresh token and sending to client
            await authenticateUser(req, res, createUser);

        }
        else {
            return res.status(404).json({ success: false, msg: "Please select Profile Image !" });
        }

    } catch (error) {
        next(error);
    }
};

//login
export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        //checking if user exist in database
        const userExist = await UserModel.findOne({ email: email });

        if (!userExist) return res.status(404).json({ success: false, msg: "Invalid Credentials!" });

        //Comaparing User Password

        const validPassword = await userExist.comparePassword(password);

        if (!validPassword) return res.status(401).json({ success: false, msg: "Invalid Credentials!" })

        // creating access token and refresh token and sending to client
        await authenticateUser(req, res, userExist);

    } catch (err) {
        const error = {
            status: 401,
            message: "Not Authenticated"
        }
        next(error);
    }
};

//logout
export const logout = async (req, res, next) => {
    try {

        res.clearCookie('accessToken')
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/',
        }).status(200).json({ success: true, msg: "Logout SuccessFully!" });

    } catch (err) {

        const error = {
            status: 401,
            message: "Not Authorized"
        }
        next(error);
    }
};

//authenticated user
export const authUser = async (req, res, next) => {
    try {
        //userId and current sessionID
        const { userID, _id } = req.user;

        const response = await UserModel.findById({ _id: userID }).select('-password')

        //creating new accessToken if there is refreshtoken
        if (!req.cookies.accessToken && req.cookies.refreshToken) {

            //deleting old session for generating new session in database
            await SessionModel.findByIdAndDelete(_id);

            //creating new session in database
            const newSession = await response.createSession({ ip: req.ip, userAgent: req.headers["user-agent"] });

            const accessToken = await response.createAccessToken(newSession._id);
            const refreshToken = await response.createRefreshToken(newSession._id);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: accessTokenAge,
                path: '/',
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: refreshTokenAge,
                path: '/',
            })
        }

        res.status(200).json({ success: true, data: response });

    } catch (err) {

        const error = {
            status: 401,
            message: 'UnAuthorized User'
        };
        next(error);
    }
};


//creating access Token and refresh Token
const authenticateUser = async (req, res, user) => {

    //generating session in user Model method
    const session = await user.createSession({ ip: req.ip, userAgent: req.headers["user-agent"] });

    //create accesstoken with jwt in user Model method
    const accessToken = await user.createAccessToken(session._id);

    //create refreshtoken with jwt in user Model method
    const refreshToken = await user.createRefreshToken(session._id);

    //setting cookie becuse more security rather then saving in localstorage

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: accessTokenAge,
        path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: refreshTokenAge,
        path: '/',
    }).status(200).json({
        success: true,
        msg: "Logged In",
    });

};

//all Users
export const allUsers = async (req, res, next) => {
    const { userID } = req.user;
    const search = req.query.search || "";

    try {
        let users = [];

        if (search) {
            // Fast prefix search (good for autocomplete)
            const regex = new RegExp("^" + search, "i");

            users = await UserModel.find({
                $or: [{ name: regex }, { email: regex }],
                _id: { $ne: userID }
            })
                .select("name email image")
                .limit(20) // pagination
                .lean();
        } else {
            // If no search, just return limited users
            users = await UserModel.find({ _id: { $ne: userID } })
                .select("name email image")
                .limit(20)
                .lean();
        }

        res.status(200).json({ success: true, data: users });
    } catch (err) {
        next({ status: 401, message: "UnAuthorized User" });
    }
};

