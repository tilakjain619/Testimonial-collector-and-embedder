import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalState } from '../GlobalState';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_API_URL}/user/login`, { ...user })
            localStorage.setItem('testimonial_user_login', true)
            setIsLogged(true);
            console.log("Login done");
            // navigate("/dashboard");
            window.location.href = '/dashboard';
        } catch (error) {
            toast.warning(error.response.data.msg)
        }
    }
    return (
        <main className='px-4 py-2 my-10 grid items-center md:max-w-[50%] lg:max-w-[30%] mx-auto mt-20'>
            <div className='text-center my-4'>
                <h2 className='text-2xl md:text-3xl font-semibold'>Welcome back 👋</h2>
            </div>
            <form className='grid bg-zinc-800 rounded-md px-4 md:px-6 py-4 mt-2' onSubmit={handleLogin}>

                <label className='mt-3 text-gray-300 text-sm' htmlFor="email">Email</label>
                <input value={user.email} onChange={handleChange} required className='block px-3 w-full py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="email" name='email' id='email' placeholder='you@email.com' />

                <label className='mt-3 text-gray-300 text-sm' htmlFor="password">Password</label>
                <input value={user.password} onChange={handleChange} required className='block px-3 w-full py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="password" name='password' id='password' placeholder='Password' />

                <button className='bg-[#5d5dff] mt-4 mb-4 py-2 rounded-md' type='submit'>Login</button>
            </form>
            <p className='text-sm text-center mt-4 text-gray-300'>
                Don't have an account? <Link className='text-[#7f7fff]' to="/signup">Sign up</Link>
            </p>
        </main>
    )
}

export default Login
