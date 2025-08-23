import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sounds (put them inside /public/sounds/ folder)
const successSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");

export const notifySuccess = (msg) => {
    toast.success(msg, { position: "top-right", autoClose: 3000 });
    successSound.play().catch(() => { });
};

export const notifyError = (msg) => {
    toast.error(msg, { position: "top-right", autoClose: 3000 });
    errorSound.play().catch(() => { });
};
