import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const correctPassword = "ok123"; // Replace with your actual password

    // useEffect(() => {
    //     const password = prompt("Please enter the password to access this website:");
    //     if (password === correctPassword) {
    //         setIsAuthenticated(true);
    //     } else {
    //         setIsAuthenticated(false);
    //     }
    // }, []);

    // if (!isAuthenticated) {
    //     return null; // Render nothing if not authenticated
    // }
    return (
        <div className='md:max-w-[80%] lg:max-w-[60%] mx-auto'>
            <main className='grid min-h-screen px-2 items-center justify-center text-center'>
                <div className='mt-16'>
                    <h2 className='text-3xl font-bold md:text-6xl'>Easily collect testimonials from your clients</h2>
                    <p className='text-gray-300 mt-4'>Testiflow helps professionals collect reviews and feedbacks from their clients and customers in minutes without any hard work.</p>
                    <div className='mt-5 grid gap-2'>
                        <Link className='bg-[#5d5dff] w-fit mx-auto px-5 py-2.5 rounded-md' to="/signup">Try FREE now</Link>
                        <small className='text-gray-400'>Get started for free.</small>
                    </div>
                </div>
                <div className='mt-10 text-pretty'>
                    <img className='rounded-3xl lg:w-3/4 mx-auto' src="https://cdn.dribbble.com/userupload/7390122/file/original-f0a51857256dd5802cfc7a47a6f070a2.png?resize=1024x768" alt="some sample dashboard" />
                    <h2 className='text-3xl mt-6 md:mt-10 font-bold md:text-5xl'>A dashboard to manage all testimonials</h2>
                    <p className='text-gray-300 mt-4'>You will have a simple & clean dashboard to manage all testimonials in one place. It's like your email inbox, but it's designed for your social proof!</p>
                </div>
            </main>
            <section className='grid md:flex gap-6 relative text-pretty min-h-[60vh] mt-10 px-2 items-center justify-center text-center md:text-left'>
                <img className='rounded-3xl mt-6 md:w-2/4' src="https://cdn.dribbble.com/userupload/13661344/file/original-7b4ed024ce4b13ff7580b84b8ec8ecf6.png?resize=1024x768" alt="testimonials sample" />
                <div className='mt-6 md:mt-0 text-pretty'>
                    <h2 className='text-3xl md:mt-6 font-bold md:text-3xl'>Ready to collect testimonials?</h2>
                    <p className='text-gray-300 mt-4 md:line-clamp-6'>We are loved by Fortune 500 companies, early-stage startups, marketing agencies, real estate agents, freelancers, and many more. Your customers' testimonials are the best social proof you can get! Get started now 👇</p>
                    <ul className='grid gap-2 justify-center md:justify-start mt-4'>
                        <li className='flex text-sm text-gray-400 gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color='lightgreen' fill={"none"}>
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> No coding skill required.</li>
                        <li className='flex text-sm text-gray-400 gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color='lightgreen' fill={"none"}>
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> Start in under 2 minutes.</li>
                    </ul>
                    <div className='mt-5 grid gap-2 md:flex items-center'>
                        <Link to="signup" className='bg-[#5d5dff] w-fit mx-auto md:mx-0 px-5 py-2.5 rounded-md'>Try FREE now</Link>
                        <small className='text-gray-400'>Get started now for free.</small>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
