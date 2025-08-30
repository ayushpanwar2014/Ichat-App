

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log('Socket connected client', socket.id);

        socket.on("setup", (userData) => {
            if (!userData || !userData._id) {
                console.log("Invalid setup, disconnecting socket", socket.id);
                socket.disconnect();
                return;
            }

            socket.join(userData._id);
            console.log("User setup:", userData._id);
            socket.emit("connected");
        });

        socket.on("join chat", (room) => {
            socket.join(room);
            console.log('User Join chat ', room);
        })

        socket.on("typing", (chatId, user) => {
            
            socket.in(chatId).emit('typing', user);
        })

        socket.on("stop typing", (chatId) => {
            socket.in(chatId).emit('stop typing');
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