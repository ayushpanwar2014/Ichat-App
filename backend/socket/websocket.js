

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log('Socket connected client', socket.id);

        socket.on("setup", (userData) => {
            socket.join(userData._id);
            console.log('user id', userData._id);
            socket.emit("connected")
        })

        socket.on("join chat", (room) => {
            socket.join(room);
            console.log('User Join chat ', room);
        })

        socket.on("send msg", (chatId, newMessage) => {
            const chat = newMessage.chat;

            if (!chat.users) return console.log("This chat doesn't have users to chat");

            // Send to all sockets in the room (active chat)
            socket.to(chatId).emit("receiveMessage", newMessage);
            
            // Notify all chat participants individually
            chat.users.forEach(user => {
                if (user === newMessage.sender._id) return; // skip sender

                // Use io.to instead of socket.to
                io.to(user).emit("messageNotification", newMessage);
            });
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

}