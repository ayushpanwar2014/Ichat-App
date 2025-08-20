import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

function Chatpage() {

    const [chats,setChats] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const fetchChats = useCallback( async () => {
        try {
            const response = await axios.get(`${backendURL}/api/chats`);
            setChats(response.data)
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }, [backendURL])

    useEffect(() => {
        fetchChats();
    },[fetchChats])


    return (
        <div>
            <h1>Chatpage</h1>
            {console.log(chats)
            }
        </div>
    );
}

export default Chatpage;
