// socket/index.js
export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("⚡ Client connected:", socket.id);

        // Setup event listeners
        socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("connected");
            console.log(`User setup: ${userData._id}`);
        });

        socket.on("join chat", (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on("typing", (chatId) => {
            socket.in(chatId).emit("typing");
        });

        socket.on("stop typing", (chatId) => {
            socket.in(chatId).emit("stop typing");
        });

        socket.on("new message", (newMessage) => {
            const chat = newMessage.chat;
            if (!chat?.users) return;

            chat.users.forEach((userId) => {
                if (userId.toString() !== newMessage.sender._id.toString()) {
                    io.to(userId.toString()).emit("message received", newMessage);
                }
            });
        });

        

        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
        });
    });
};
