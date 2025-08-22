import mongoose from 'mongoose';

const MessageModelSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',   
        },
        content: {
            type: String,
            trim: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    },
    { timestamps: true }
);



export const MessageModel = mongoose.model('Message', MessageModelSchema);
