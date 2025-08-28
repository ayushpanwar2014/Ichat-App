import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (user, backendURL, onMessage, onTyping, onStopTyping) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!user) return;

        const socket = io(backendURL, { withCredentials: true });
        socketRef.current = socket;

        socket.emit("setup", user);

        socket.on("connected", () => console.log("✅ Socket connected"));
        socket.on("message received", onMessage);
        socket.on("typing", onTyping);
        socket.on("stop typing", onStopTyping);

        return () => {
            socket.disconnect();
        };
    }, [user, backendURL]);

    return socketRef;
};
