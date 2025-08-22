import mongoose from 'mongoose';

const ChatModelSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
            required: function () {
                return this.isGroupChat;
            },
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: function () {
                return this.isGroupChat;
            },
        },
    },
    { timestamps: true }
);

// Ensure at least 2 users in a chat
ChatModelSchema.pre('save', function (next) {
    if (!this.users || this.users.length < 2) {
        return next(new Error('A chat must have at least 2 users.'));
    }
    next();
});

// 🔹 Add indexes for faster queries
ChatModelSchema.index({ users: 1 });           // Find all chats a user is in
ChatModelSchema.index({ latestMessage: 1 });   // Sort/fetch by latest message
ChatModelSchema.index({ isGroupChat: 1 });     // Filter group vs one-to-one chats

export const ChatModel = mongoose.model('Chat', ChatModelSchema);
