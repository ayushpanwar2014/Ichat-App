import axios from 'axios';
import { ChatContext } from "./exportChatContext";
import { useProgress } from "./ProgressContext";
import { notifyError, notifySuccess } from "../components/notification/toast";
import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from './exportAppContext';

const ChatContextProvider = (props) => {
    const { startProgress, completeProgress } = useProgress();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const {user} = useContext(AppContext);
    const [search, setSearch] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const [loading, setLoading] = useState(false); // 🔹 new state
    const [AllUsersChats, setAllUsersChats] = useState([]);

    //adding users 1 on 1
    const onHandleAccessChat = async (userID) => {
        try {
            const response = await axios.post(backendURL + '/api/chat', { userID }, { withCredentials: true });

            if (response.data.success) {
                notifySuccess(response.data.msg);
                await onFetchAllUserChats();
            }
        } catch (error) {

            console.log(error.message);
            return notifyError("User Not Added !");
        }
    }

    //fetching all chats
    const onFetchAllUserChats = useCallback(async () => {
        try {

            const response = await axios.get(backendURL + '/api/chat', { withCredentials: true });

            if (response.data.success) {
                setAllUsersChats(response.data.chats);
            }

        } catch (error) {
            console.log(error.message);
            return notifyError("Something went wrong !");
        }
    }, [backendURL])

    // search user
    const onHandleSearch = async () => {
        startProgress();
        if (search.length === 0) {
            completeProgress();
            return notifyError("Please Provide Name or Email !");
        }
        try {
            startProgress();
            setLoading(true); // start loading
            const response = await axios.get(backendURL + `/api/user/alluser?search=${search}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                setSearchUsers(response.data.data);
                completeProgress();
            }
        } catch (error) {
            console.log(error);
            completeProgress()
            notifyError(error.message);
        } finally {
            setLoading(false); // stop loading
        }
    };



    useEffect(() => {

        if (user?.name){
            onFetchAllUserChats();
        }
    }, [user,onFetchAllUserChats])

    const value = {
        backendURL,
        completeProgress,
        startProgress,
        onHandleSearch,
        search,
        setSearch,
        searchUsers,
        loading, // 🔹 expose loading
        onHandleAccessChat,
        AllUsersChats
    };

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
