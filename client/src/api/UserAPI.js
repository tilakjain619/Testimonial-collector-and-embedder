import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    setIsLogged(true);
                    await getUserInfo(token); // Ensure getUserInfo is called
                } catch (error) {
                    toast.warning(error.response?.data?.msg || "Error logging in");
                }
            };
            getUser();
        }
    }, [token]);

    const getUserInfo = async (token) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/user/user-info`, {
                headers: { Authorization: token }
            });
            setUserInfo(res.data);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Something went wrong");
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        userInfo: [userInfo, setUserInfo, getUserInfo]
    };
};

export default UserAPI;
