import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import UpgradeButton from './UpgradeButton';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const Navbar = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const navigate = useNavigate();
    const [userInfo, getUserInfo] = state.userAPI.userInfo;
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
    const handleCloseMenu = () => {
        setShowMenu(false);
    };
    useEffect(() => {
        if (token) {
            getUserInfo(token);
        }
    }, [token]);

    return (
        <nav className='flex fixed z-10 top-0 left-0 bg-[#151719] bg-opacity-25 backdrop-blur-md md:bg-transparent md:backdrop-blur-0 md:bg-opacity-100 w-full items-center justify-between px-4 py-2 md:px-10 md:py-4'>
            <div className='w-24' onClick={handleCloseMenu}>
                <Link to={isLogged ? '/dashboard' : '/'}><img className='w-full' src={logo} alt="Logo" /></Link>
            </div>
            <div className='md:hidden cursor-pointer transition-all duration-200 active:rotate-180' onClick={handleShowMenu}>
                {
                    showMenu ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
            </div>
            {
                !isLogged && <div className='hidden md:flex'>
                    <Link className='w-fit mx-auto px-5 py-2.5 rounded-md' to="/login">Login</Link>
                    <Link className='bg-[#5d5dff] w-fit mx-auto px-5 py-2.5 rounded-md' to="/signup">Sign up</Link>
                </div>
            }
            {
                isLogged ?
                    <aside className={`fixed shadow-lg shadow-zinc-900 w-52 md:w-60 z-10 top-20 transition-all duration-300 rounded-lg min-h-[80vh] bg-[#202325] md:bg-transparent ${showMenu ? 'left-0' : '-left-52'} md:left-2`}>
                        <div className='flex flex-col text-left justify-between px-1 md:px-3 py-2 gap-1'>
                            <div className='grid gap-1'>
                                <Link onClick={handleCloseMenu} to="/dashboard" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Dashboard</Link>
                                <Link onClick={handleCloseMenu} to="/testimonials" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Testimonials</Link>
                                <Link onClick={handleCloseMenu} to="/profile" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Profile</Link>

                                {
                                    userInfo.isProUser === false ? (
                                        <UpgradeButton />
                                    )
                                        :
                                        <p onClick={handleCloseMenu} className='flex gap-1 items-center w-full px-4 py-2.5 rounded-md'>Pro <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} className='text-yellow-400 fill-yellow-900' fill={"none"}>
                                            <path d="M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg></p>
                                }
                            </div>
                            <div className='absolute left-0 px-3 bottom-4 w-full'>
                                <button className='w-full flex items-center gap-1 text-left hover:bg-zinc-700 px-4 py-2.5 rounded-md' onClick={handleLogout}>Logout <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} fill={"none"}>
    <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg></button>
                            </div>
                        </div>
                    </aside>
                    :
                    <aside className={`fixed shadow-lg shadow-zinc-900 w-52 md:w-60 z-10 top-20 transition-all md:hidden duration-300 rounded-lg min-h-[80vh] bg-[#202325] md:bg-transparent ${showMenu ? 'left-0' : '-left-52'} md:left-2`}>
                        <div className='flex flex-col text-left justify-between px-4 md:px-5 py-2 gap-1'>
                            <Link onClick={handleCloseMenu} className='w-full mx-auto px-5 py-2.5 rounded-md' to="/login">Login</Link>
                            <Link onClick={handleCloseMenu} className='bg-[#5d5dff] w-full mx-auto px-5 py-2.5 rounded-md' to="/signup">Sign up</Link>
                        </div>
                    </aside>
            }

        </nav>
    )
}

export default Navbar
