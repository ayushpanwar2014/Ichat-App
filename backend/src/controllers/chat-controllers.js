import { ChatModel } from "../models/chat-model.js";
import UserModel from "../models/user-model.js";
import mongoose from "mongoose";


// access chat between 2 users, or create if it doesn’t exist
export const accessChat = async (req, res) => {
    const { userID } = req.body;  // other user
    const currentUser = req.user.userID; // logged-in user

    try {
        if (!userID) {
            return res.status(400).json({ success: false, msg: "User ID is required" });
        }

        // Try to find existing private chat
        let chat = await ChatModel.findOne({
            isGroupChat: false,
            users: { $all: [currentUser, userID], $size: 2 }
        })
            .populate("users", "-password")
            .populate("latestMessage");

        if (chat) {
            // Populate latestMessage.sender only if exists
            if (chat.latestMessage) {
                chat = await UserModel.populate(chat, {
                    path: "latestMessage.sender",
                    select: "name image email",
                });
            }

            res.status(200).json({ success: true, chat, msg: "Already your Friend" });
        }

        // If no chat, create one
        else if (!chat) {
            chat = await ChatModel.create({
                isGroupChat: false,
                users: [currentUser, userID],
                chatName: "sender"
            });

            chat = await chat.populate("users", "-password");


            // Populate latestMessage.sender only if exists
            if (chat.latestMessage) {
                chat = await UserModel.populate(chat, {
                    path: "latestMessage.sender",
                    select: "name image email",
                });
            }

            res.status(200).json({ success: true, chat, msg: "Added new Friend" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "unauthorized access" });
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

        return res.status(200).json({ success: true, chats });
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
        if (!chatName || !users || !Array.isArray(users) || users.length < 2) {
            return res.status(400).json({
                success: false,
                msg: "Chat name and at least 2 users are required",
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
                    msg: "A group with the same name and members already exists",
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
                msg: "New group chat created successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next({ status: 500, message: "unauthorized access" });
        }

    } catch (error) {
        next({ status: 500, message: "unauthorized access" });
    }
};

//rename group
export const renameGroup = async (req, res, next) => {
    try {
        const { chatId, newChatName } = req.body;
        const currentUserId = req.user.userID;

        if (!chatId || !newChatName) {
            return res.status(400).json({
                success: false,
                msg: "chatId and newChatName are required",
            });
        }

        // Find the chat
        const chat = await ChatModel.findById(chatId).lean();
        if (!chat || !chat.isGroupChat) {
            return res.status(404).json({
                success: false,
                msg: "Group chat not found",
            });
        }

        // Check if current user is group admin
        if (chat.groupAdmin.toString() !== currentUserId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "Only the group admin can rename the group",
            });
        }

        // Check if a group with same name and same members already exists
        const duplicateGroup = await ChatModel.findOne({
            isGroupChat: true,
            chatName: newChatName,
            users: { $size: chat.users.length, $all: chat.users },
            _id: { $ne: chatId }, // exclude current chat
        }).lean();

        if (duplicateGroup) {
            return res.status(409).json({
                success: false,
                msg: "A group with the same name and members already exists",
            });
        }

        // Rename the group
        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            { chatName: newChatName },
            { new: true }
        )
            .populate("users", "-password -__v")
            .populate("groupAdmin", "-password -__v")
            .lean();

        return res.status(200).json({
            success: true,
            data: updatedChat,
            msg: "Group renamed successfully",
        });
    } catch (error) {
        next({ status: 500, message: "unauthorized access" });
    }
};

//add to group
export const addToGroup = async (req, res, next) => {
    try {
        const { chatId, newUsers } = req.body; // newUsers = array of user IDs
        const currentUserId = req.user.userID;

        if (!chatId || !newUsers || !Array.isArray(newUsers) || newUsers.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "chatId and newUsers array are required",
            });
        }

        // Fetch the chat
        const chat = await ChatModel.findById(chatId);
        if (!chat || !chat.isGroupChat) {
            return res.status(404).json({
                success: false,
                msg: "Group chat not found",
            });
        }

        // Only admin can add members
        if (chat.groupAdmin.toString() !== currentUserId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "Only the group admin can add members",
            });
        }

        // Exclude users who are already in the group
        const currentUsersSet = new Set(chat.users.map(u => u.toString()));
        const filteredUsers = newUsers
            .map(u => u.toString())
            .filter(u => !currentUsersSet.has(u));

        if (filteredUsers.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "All provided users are already in the group",
            });
        }

        // Add new members
        chat.users.push(...filteredUsers);
        chat.users = [...new Set(chat.users)]; // remove duplicates just in case
        await chat.save();

        // Populate users and admin
        const updatedChat = await ChatModel.findById(chatId)
            .populate("users", "-password -__v")
            .populate("groupAdmin", "-password -__v")
            .lean();

        return res.status(200).json({
            success: true,
            data: updatedChat,
            msg: `${filteredUsers.length} members added to the group`,
        });

    } catch (error) {
        next({ status: 500, message: "unauthorized access" });
    }
};

//remove from group
export const removeFromGroup = async (req, res, next) => {
    try {
        const { chatId, removeUsers } = req.body; // removeUsers = array of user IDs to remove
        const currentUserId = req.user.userID;

        if (!chatId || !removeUsers || !Array.isArray(removeUsers) || removeUsers.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "chatId and removeUsers array are required",
            });
        }

        // Atomic removal and admin check
        const updatedChat = await ChatModel.findOneAndUpdate(
            { _id: chatId, groupAdmin: currentUserId, isGroupChat: true },
            { $pull: { users: { $in: removeUsers.map(u => u.toString()) } } },
            { new: true }
        )
            .populate("users", "-password -__v")
            .populate("groupAdmin", "-password -__v")
            .lean();

        if (!updatedChat) {
            return res.status(403).json({
                success: false,
                msg: "Only group admin can remove members or group not found",
            });
        }

        // Ensure group still has at least 2 members
        if (updatedChat.users.length < 2) {
            return res.status(400).json({
                success: false,
                msg: "Group must have at least 2 members",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedChat,
            msg: `${removeUsers.length} members removed from the group`,
        });

    } catch (error) {
        next({ status: 500, message: "unauthorized access" });
    }
};

