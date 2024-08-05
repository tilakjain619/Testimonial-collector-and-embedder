import React, { useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalState } from '../GlobalState';
import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const Navbar = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const handleLogout = async () => {
        await axios.get(`${BASE_API_URL}/user/logout`);
        localStorage.clear();
        setIsLogged(false);
        navigate('/login');
    }
    const handleShowMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    };
    return (
        <nav className='flex items-center justify-between px-4 py-2 md:px-10 md:py-4'>
            <div className='w-24'>
                <Link to="/"><img className='w-full' src={logo} alt="Logo" /></Link>
            </div>
            <div className='md:hidden cursor-pointer' onClick={handleShowMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {
                !isLogged && <div className='hidden md:flex'>
                    <Link className='w-fit mx-auto px-5 py-2.5 rounded-md' to="/login">Login</Link>
                    <Link className='bg-[#5d5dff] w-fit mx-auto px-5 py-2.5 rounded-md' to="/signup">Sign up</Link>
                </div>
            }
            {
                isLogged &&
                <aside className={`fixed shadow-lg shadow-zinc-900 w-52 md:w-60 z-10 top-20 transition-all duration-300 rounded-lg min-h-[88vh] bg-[#202325] md:bg-transparent ${showMenu ? 'left-0' : '-left-52'} md:left-2`}>
                    <div className='flex flex-col text-left justify-between px-1 md:px-3 py-2 gap-1'>
                        <div className='grid gap-1'>
                        <Link to="/dashboard" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Dashboard</Link>
                        <Link to="/testimonials" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Testimonials</Link>
                        <Link to="/profile" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Profile</Link>
                        </div>
                        <div className='absolute left-0 px-3 bottom-4 w-full'>
                        <button className='w-full text-left hover:bg-zinc-700 px-4 py-2.5 rounded-md' onClick={handleLogout}>Logout</button>
                        </div>
                        </div>
                </aside>
            }

        </nav>
    )
}

export default Navbar
