import { useEffect, useRef } from "react";
import {io} from 'socket.io-client';
export const useSocket = (user, backendURL, onMessage, onTyping, onStopTyping) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!user) return;

        const socket = io(backendURL, { withCredentials: true });
        socketRef.current = socket;

        socket.emit("setup", user);

        socket.on("connected", () => {});
        console.log(onMessage);

        socket.on("message received", onMessage);

        // ✅ chat-aware typing
        socket.on("typing", (data) => {
            onTyping(data); // data = { chatId, user }
        });
        socket.on("stop typing", (data) => {
            onStopTyping(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [user, backendURL]);

    return socketRef;
};
