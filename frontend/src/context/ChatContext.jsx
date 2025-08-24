import axios from 'axios';
import { ChatContext } from "./exportChatContext";
import { useProgress } from "./ProgressContext";
import { notifyError, notifySuccess } from "../components/notification/toast";


const ChatContextProvider = (props) => {

    const { startProgress, completeProgress } = useProgress();
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    

    const value = {
       
    }

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;
