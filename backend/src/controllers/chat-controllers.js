import { ChatModel } from "../models/chat-model.js";
import UserModel from "../models/user-model.js";
import mongoose from "mongoose";


// access chat between 2 users, or create if it doesn’t exist
export const accessChat = async (req, res) => {
    const { userID } = req.body;  // other user
    const currentUser = req.user.userID; // logged-in user

    try {
        if (!userID) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Try to find existing private chat
        let chat = await ChatModel.findOne({
            isGroupChat: false,
            users: { $all: [currentUser, userID], $size: 2 }
        })
            .populate("users", "-password")
            .populate("latestMessage");

        // If no chat, create one
        if (!chat) {
            chat = await ChatModel.create({
                isGroupChat: false,
                users: [currentUser, userID],
                chatName: "sender"
            });

            chat = await chat.populate("users", "-password");
        }

        // Populate latestMessage.sender only if exists
        if (chat.latestMessage) {
            chat = await UserModel.populate(chat, {
                path: "latestMessage.sender",
                select: "name image email",
            });
        }

        res.status(200).json({ success: true, chat });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchChats = async (req, res, next) => {
    const currentUser = req.user.userID; // logged-in user

    try {
        const chats = await ChatModel.find({
            users: currentUser,
        })
            .populate("users", "-password") // populate users but exclude password
            .populate("groupAdmin", "-password") // populate groupAdmin but exclude password
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "name email image",
                },
            })
            .sort({ updatedAt: -1 }) // latest chat first
            .lean(); // return plain JS objects for performance

        return res.status(200).json({success: true,chats});
    } catch (error) {
        next({ status: 401, message: "Unauthorized User" });
    }
};

//create group chat
export const createGroupChat = async (req, res, next) => {
    try {
        const { chatName, users } = req.body;
        const currentUserId = req.user.userID;

        // Validation
        if (!chatName || !users || !Array.isArray(users) || users.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Chat name and at least 2 users are required",
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const allUsers = [...new Set([...users, currentUserId.toString()])].sort();

            const existingGroup = await ChatModel.findOne({
                isGroupChat: true,
                chatName,
                users: { $size: allUsers.length, $all: allUsers },
            }).session(session);

            if (existingGroup) {
                await session.abortTransaction();
                session.endSession();
                return res.status(409).json({
                    success: false,
                    message: "A group with the same name and members already exists",
                });
            }

            const newGroup = await ChatModel.create(
                [
                    {
                        chatName,
                        isGroupChat: true,
                        users: allUsers,
                        groupAdmin: currentUserId,
                    },
                ],
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            await newGroup[0].populate([
                { path: "users", select: "-password -__v" },
                { path: "groupAdmin", select: "-password -__v" }
            ]);

            return res.status(201).json({
                success: true,
                data: newGroup[0],
                message: "New group chat created successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next({ status: 500, message: error.message || "Server Error" });
        }


    } catch (error) {
        next({ status: 500, message: error.message || "Server Error" });
    }
};



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
