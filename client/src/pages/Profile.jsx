import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const Profile = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [userInfo, setUserInfo, getUserInfo] = state.userAPI.userInfo;
    const navigate = useNavigate();
    
    useEffect(() => {
        checkUser();
    }, []);
    
    const checkUser = () => {
        const isUserTrue = localStorage.getItem('testimonial_user_login');
        if (isUserTrue === 'false' || !isUserTrue) {
            navigate('/login');
        }
    };
    
    useEffect(() => {
        if (token) {
            getUserInfo(token);
        }
    }, [token, isLogged]);
    
    const [user, setUser] = useState({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        password: ""
    });
    
    useEffect(() => {
        setUser({
            name: userInfo?.name || "",
            email: userInfo?.email || "",
            password: ""
        });
    }, [userInfo]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BASE_API_URL}/user/update-account`, { ...user }, {
                headers: { Authorization: token }
            });
            console.log("Profile update done");
            toast.success("Profile updated");
        } catch (error) {
            toast.warning(error.response?.data?.msg || "Update failed");
        }
    };
    
    return (
        <main className='px-4 py-2 md:py-0 md:ml-64 mt-2 md:mt-0'>
            <form className='grid bg-zinc-800 max-w-[400px] rounded-md px-4 md:px-6 py-4' onSubmit={handleUpdate}>
                <label className='mt-3 text-gray-300 text-sm' htmlFor="name">Name</label>
                <input onChange={handleChange} value={user.name} className='read-only:opacity-70 block px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="text" name='name' id='name' placeholder='Your full name' />

                <label className='mt-3 text-gray-300 text-sm' htmlFor="email">Email</label>
                <input onChange={handleChange} value={user.email} className='read-only:opacity-70 block px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="email" name='email' id='email' placeholder='you@email.com' />

                <label className='mt-3 text-gray-300 text-sm' htmlFor="password">Password</label>
                <input onChange={handleChange} value={user.password} className='block px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="password" name='password' id='password' placeholder='Password' />
                <button className='bg-[#5d5dff] mt-4 mb-4 py-2 rounded-md disabled:opacity-60' type='submit'>Update</button>
            </form>
        </main>
    );
};

export default Profile;
