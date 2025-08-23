import { ChatModel } from "../models/chat-model.js";
import UserModel from "../models/user-model.js";


// access chat between 2 users, or create if it doesn’t exist
export const accessChat = async (req, res, next) => {
    const { userID } = req.body;  // other user
    const currentUser = req.user.userID; // logged-in user

    try {
        if (!userID) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // ✅ Try to find chat first
        let chat = await ChatModel.findOne({
            isGroupChat: false,
            users: { $all: [currentUser, userID] },
        }).populate("users", "-password").populate("latestMessage");

        if (!chat) {
            // ✅ If not found, create it
            chat = await ChatModel.create({
                chatName: "sender",
                isGroupChat: false,
                users: [currentUser, userID],
            });

            chat = await chat.populate("users", "-password");
        }

        // ✅ Populate latestMessage.sender if it exists
        chat = await UserModel.populate(chat, {
            path: "latestMessage.sender",
            select: "name image email",
        });

        res.status(200).json({ success: true, data: chat });

    } catch (error) {
        next({ status: 500, message: error.message });
    }
};


export const fetchChats = async (req, res, next) => {
    try {



    } catch (error) {
        next({ status: 401, message: "UnAuthorized User" });
    }
}

export const createGroupChat = async (req, res, next) => {
    try {



    } catch (error) {
        next({ status: 401, message: "UnAuthorized User" });
    }
}

export const renameGroup = async (req, res, next) => {
    try {



    } catch (error) {
        next({ status: 401, message: "UnAuthorized User" });
    }
}

export const removeFromGroup = async (req, res, next) => {
    try {



    } catch (error) {
        next({ status: 401, message: "UnAuthorized User" });
    }
}

export const addToGroup = async (req, res, next) => {
    try {



    } catch (error) {
        next({ status: 401, message: "UnAuthorized User" });
    }
}
