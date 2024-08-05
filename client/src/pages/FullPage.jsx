import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';

const FullPage = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [showOptions, setShowOptions] = useState(false);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const { userTestimonial, fetchTestimonialsById } = state.testimonialAPI

    const { id } = useParams();

    const checkUser = () => {
        const isUserTrue = localStorage.getItem('testimonial_user_login')
        if (isUserTrue === 'false' || !isUserTrue) {
            navigate('/login')
        }
        return;
    }
    async function getTestimonialById(id, token) {
        await fetchTestimonialsById(id, token);
    }
    useEffect(() => {
        checkUser()
        getTestimonialById(id, token)
    }, [])
    const handleShowOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions);
    };
    return (
        <main className='px-4 py-2 md:py-0 md:ml-64 md:mr-64 mt-2 md:mt-0'>
            <div className='grid gap-3'>
                {
                    userTestimonial.images && userTestimonial.images.url ? (
                        <img
                            className="w-full max-w-[400px] rounded-md"
                            src={userTestimonial.images.url} // Accessing the URL of the image
                            alt="User Testimonial"
                        />
                    ) : (
                        <p>No Cover Image</p>
                    )
                }
                <h2 className='text-lg'>{userTestimonial.description}</h2>
                <p className='text-sm text-gray-400'>Created: {new Date(userTestimonial.createdAt).toLocaleString()}</p>
                <button onClick={handleShowOptions} className='text-left w-fit text-sm bg-gray-800 px-3 py-1 rounded-md md:hidden'>Options</button>
            </div>
            <div>
                {
                    userTestimonial.testimonials && userTestimonial.testimonials.length > 0 ?
                        <div className='grid gap-4 mt-4'>
                            {
                                userTestimonial.testimonials.map((item) => (
                                    <div key={item._id} className='bg-zinc-800 min-h-44 px-4 flex flex-col gap-2 rounded-md py-2'>
                                        <div className='flex items-center gap-1.5 mt-1'>
                                            <div className='w-7 h-7 select-none rounded-full grid items-center justify-center bg-green-500'>
                                                {item.name.charAt(0).toUpperCase()}
                                            </div>
                                            <h2>{item.name}</h2>
                                        </div>
                                        <p>{item.testimonial}</p>
                                        <StarRating rating={item.ratings} />
                                        <p className='text-sm text-gray-400'>Date: {new Date(item.submittedOn).toLocaleString()}</p>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <p className='mt-4'>No testimonials received yet! Share with your customers to collect hear what they say ⚡😎</p>
                }
            </div>
            <aside className={`fixed shadow-lg shadow-zinc-900 w-52 md:w-60 z-10 top-20 transition-all duration-300 rounded-lg min-h-[88vh] bg-[#202325] md:bg-transparent ${showOptions ? 'right-0' : '-right-52'} md:right-2`}>
                <div className='flex flex-col text-left justify-between px-1 md:px-3 py-2 gap-1'>
                    <div className='grid gap-1'>
                        <h2 className='px-4 pt-2.5 text-slate-400 font-semibold uppercase'>Embed</h2>
                        <Link to="#" className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Website</Link>
                    </div>
                    <div className='grid gap-1'>
                        <h2 className='px-4 pt-2.5 text-slate-400 font-semibold uppercase'>Links</h2>
                        <Link to={`/page/${userTestimonial._id}`} className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Public Landing Page</Link>
                    </div>
                </div>
            </aside>
        </main>
    )
}
// const firstLetter = item.name.charAt(0).toUpperCase(); // Capitalizes the first letter if needed


export default FullPage
