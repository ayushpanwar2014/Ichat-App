
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { AppContext } from "./exportAppContext";
import { useProgress } from "./ProgressContext";
import { notifyError, notifySuccess } from "../components/notification/toast";

const AppContextProvider = (props) => {

    const { startProgress, completeProgress } = useProgress();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [signUp, setSignUp] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    })
    const [Login, setLogin] = useState({
        email: '',
        password: '',
    })
    const [userImg, setUserImg] = useState(null);

    const [user, setUser] = useState(null);

    

    //logout clear cookies
    const fetchLogout = useCallback(async () => {

        try {
            startProgress();
            const resp = await axios.post(backendURL + '/api/user/logout', {}, { withCredentials: true });

            if (resp.data.success) {
                setUser(null);
                notifySuccess(resp.data.msg);
                completeProgress();
            }

        } catch (error) {
            console.log(error.response.data.msg);
            notifyError(error.response.data.msg);
            completeProgress();
        }
    }, [backendURL, startProgress, completeProgress]);

    //get user
    const fetchUser = useCallback(async () => {
        try {
            startProgress();
            const response = await axios.get(backendURL + '/api/user/getuser', { withCredentials: true })

            if (response.data.success) {
                setUser(response.data.data);
                completeProgress();
            }
            else{
                setUser(null);  // explicitly null if not logged in
            }
            
        } catch (error) {
            localStorage.removeItem('userData');
            setUser(null);  
            completeProgress();
            
        }
    }, [backendURL, completeProgress, startProgress]);
    
    
    //Register
    const onSubmitRegister = async (e) => {
        e.preventDefault();
        if (signUp.password !== signUp.confirmPassword) {
            return notifyError( "Password not Matched!");
        }
        else {
            try {
                startProgress();
                const UserData = new FormData();
                UserData.append('name', signUp.name);
                UserData.append('email', signUp.email);
                UserData.append('password', signUp.password);
                UserData.append('image', userImg)
                
                const response = await axios.post(backendURL + '/api/user/register', UserData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                
                if (response.data.success) {
                    await fetchUser();
                    setSignUp({
                        email: '',
                        name: '',
                        password: '',
                        confirmPassword: ''
                    })
                    setUserImg(null);
                    notifySuccess("Account created successfully!");
                    completeProgress();
                }

            } catch (error) {
                notifyError(error.response.data.msg);
                completeProgress();
            }
        }
    }

    //login
    const onSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            startProgress();
            const response = await axios.post(backendURL + '/api/user/login', Login, { withCredentials: true });

            if (response.data.success) {
                await fetchUser();
                setLogin({
                    email: '',
                    password: ''
                })
                notifySuccess("Logged in successfully!");
                completeProgress();
            }

        } catch (error) {
            notifyError(error.response.data.msg);
            completeProgress();
        }

    }

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    const value = {
        fetchUser,
        fetchLogout,
        user,
        backendURL,
        setUserImg,
        userImg,
        setSignUp,
        signUp,
        onSubmitRegister,
        Login,
        setLogin,
        onSubmitLogin,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
