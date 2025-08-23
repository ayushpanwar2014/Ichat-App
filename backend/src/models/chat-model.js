// models/ChatModel.js
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

// ✅ Ensure at least 2 users in a chat
ChatModelSchema.pre('save', function (next) {
    if (!this.users || this.users.length < 2) {
        return next(new Error('A chat must have at least 2 users.'));
    }
    if (this.isGroupChat && this.users.length < 2) {
        return next(new Error('Group chat must have at least 2 members.'));
    }
    next();
});

// ✅ Unique compound index for private chats
ChatModelSchema.index(
    { isGroupChat: 1, users: 1 },
    { unique: true, partialFilterExpression: { isGroupChat: false } }
);

// ✅ Index for quickly fetching chats by latest message
ChatModelSchema.index({ latestMessage: 1 });

export const ChatModel = mongoose.model('Chat', ChatModelSchema);
