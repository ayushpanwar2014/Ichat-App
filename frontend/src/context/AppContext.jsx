
import { useCallback, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios';
import { AppContext } from "./exportAppContext";
import { useNavigate } from "react-router-dom";
import { useProgress } from "./ProgressContext";


const AppContextProvider = (props) => {

    const { startProgress, completeProgress } = useProgress();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
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

    const [user, setUser] = useState("");

    //logout clear cookies
    const fetchLogout = useCallback(async () => {

        try {
            startProgress();
            const resp = await axios.post(backendURL + '/api/user/logout', {}, { withCredentials: true });

            if (resp.data.success) {
                localStorage.removeItem('userData');
                setUser("");
                navigate('/')
                alert('Logout Done!')
                completeProgress();
            }

        } catch (error) {
            console.log(error.response.data.msg);
            completeProgress();
        }
    }, [backendURL, navigate, startProgress, completeProgress]);

    //get user
    const fetchUser = useCallback(async () => {
        try {
            startProgress();
            const response = await axios.get(backendURL + '/api/user/getuser', { withCredentials: true })

            if (response.data.success) {
                setUser(response.data.data);
                const { _id, ...copyData } = response.data.data;
                localStorage.setItem('userData', JSON.stringify(copyData));
                completeProgress();
            }
            else if (!response.success) {
                localStorage.removeItem('userData');
                setUser("");
                completeProgress();
            }

        } catch (err) {
            console.log(err)
            localStorage.removeItem('userData');
            setUser("");
            completeProgress();
            // toast.error(error.response.data.msg);
        }
    }, [backendURL, completeProgress, startProgress]);

    //Register
    const onSubmitRegister = async (e) => {
        e.preventDefault();

        startProgress();
        if (signUp.password !== signUp.confirmPassword) {
            alert('Password not Matched!');
        }
        else {
            try {
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
                    fetchUser();
                    navigate('/');
                    alert('Logged In')
                    completeProgress();
                }

            } catch (error) {
                completeProgress();
                console.log(error);
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
                fetchUser();
                navigate('/');
                alert('Logged In')
                completeProgress();
            }

        } catch (error) {
            completeProgress();
            console.log(error);
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
