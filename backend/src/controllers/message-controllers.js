import mongoose from "mongoose";
import { ChatModel } from "../models/chat-model.js";
import { MessageModel } from "../models/message-model.js";

//send message
export const sendMessage = async (req, res, next) => {

    const { chatId, content } = req.body;
    const { userID } = req.user;
    try {

        // 1. Validate
        if (!chatId || !content) {
            return res.status(400).json({ success: false, msg: "content are required" });
        }

        // 2. Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ success: false, msg: "Invalid chat ID" });
        }

        // 3. Create new message
        let newMessage = new MessageModel({
            sender: userID,
            content,
            chat: chatId,
        });

        newMessage = await newMessage.save();

        // 4. Populate message for frontend
        newMessage = await newMessage.populate([
            { path: "sender", select: "name email image" },
            { path: "chat" },
        ]);

        // 5. Update latestMessage in Chat
        await ChatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage });

        return res.status(201).json({ success: true, newMessage: newMessage });

    } catch (error) {
        console.log(error);
        next({ success: 500, message: "unauthorized access" });
    }
}

//fetch all message
export const allMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params; // or req.query.chatId
        
        // 1. Validate
        if (!chatId) {
            return res.status(400).json({ success: false, message: "Chat ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ success: false ,message: "Invalid chat ID" });
        }

        // 2. Fetch messages
        const messages = await MessageModel.find({ chat: chatId })
            .populate("sender", "name email image") // get sender details
            .populate("chat"); // get chat details

        // 3. Send response
        return res.status(200).json({ success: true, messages: messages });
    } catch (error) {
        console.error("AllMessages Error:", error);
        next({ success: 500, message: "Failed to fetch messages" });
    }
};
