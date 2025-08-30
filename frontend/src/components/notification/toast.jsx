import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sounds (put them inside /public/sounds/ folder)
const successSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");
const messageReceive = new Audio("/sounds/messageReceived.mp3");
const messageSent = new Audio("/sounds/messageSent.mp3");
const addedToGroups = new Audio("/sounds/addedToGroup.mp3");
const removeToGroups = new Audio("/sounds/removeFromGroup.mp3");
const renameGroup = new Audio("/sounds/renameGroup.mp3");

export const notifySuccess = (msg) => {
    toast.success(msg);
    successSound.play().catch(() => { });
};

export const notifyError = (msg) => {
    toast.error(msg);
    errorSound.play().catch(() => { });
};

export const messageReceived = (msg) => {
    toast.success(msg);
    messageReceive.play().catch(() => { });
};

export const messageSented = () => {
    messageSent.play().catch(() => { });
};

export const addedToGroup = (msg) => {
    toast.success(msg);
    addedToGroups.play().catch(() => { });
};

export const removeToGroup = (msg) => {
    toast.success(msg);
    removeToGroups.play().catch(() => { });
};

export const renameToGroup = (msg) => {
    toast.success(msg);
    renameGroup.play().catch(() => { });
};

