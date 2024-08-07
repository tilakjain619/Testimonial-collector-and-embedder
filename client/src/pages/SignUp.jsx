import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const SignUp = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        toast.info("We are not accepting any signups for now. Stay tuned while we're back")
        // try {
        //     await axios.post(`${BASE_API_URL}/user/register`, { ...user })
        //     localStorage.setItem('testimonial_user_register', true)
        //     console.log("Register done");
        //     setUser({
        //         name: "",
        //         email: "",
        //         password: ""
        //     })
        //     toast.success("Signup successful. Please Login");
        // } catch (error) {
        //     toast.warning(error.response.data.msg)
        // }
    }
    return (
        <main className='px-4 py-2 md:my-10 grid items-center md:max-w-[40%] lg:max-w-[30%] mx-auto'>
            <div className='text-center my-4'>
                <h2 className='text-2xl md:text-3xl font-semibold'>Sign up for free 😘</h2>
                <p className='text-gray-300 text-sm mt-3'>Get unlimited credits for free<br />(Limited Time Offer)</p>
            </div>
            <form className='grid bg-zinc-800 rounded-md px-4 md:px-6 py-4' onSubmit={handleSignup}>
                <label className='mt-3 text-gray-300 text-sm' htmlFor="name">Name</label>
                <input value={user.name} onChange={handleChange} required className='block w-full px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="text" name='name' id='name' placeholder='Your full name' />

                <label className='mt-3 text-gray-300 text-sm' htmlFor="email">Email</label>
                <input value={user.email} onChange={handleChange} required className='block w-full px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="email" name='email' id='email' placeholder='you@email.com' />

                <label className='mt-3 text-gray-300 text-sm' htmlFor="password">Password</label>
                <input value={user.password} onChange={handleChange} required className='block w-full px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-700 border-2 border-zinc-700 outline-none' type="password" name='password' id='password' placeholder='Password' />

                <p className='text-xs text-gray-300 mt-4'>By registering, you agree to our <Link className='underline'>Terms of service</Link> and <Link className='underline'>Privacy policy</Link>. Happy Testiflowing.</p>

                <button className='bg-[#5d5dff] disabled:bg-opacity-20 mt-4 mb-4 py-2 rounded-md' type='submit' disabled>Sign up</button>
            </form>
            <p className='text-sm text-center mt-4 text-gray-300'>
                Already have an account? <Link className='text-[#7f7fff]' to="/login">Sign in</Link>
            </p>
        </main>
    )
}

export default SignUp
