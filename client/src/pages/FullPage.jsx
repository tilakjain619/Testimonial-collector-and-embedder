import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import gridImage from '../assets/grid-sample.png'
import marqueeImage from '../assets/marquee-sample.png'

const FullPage = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [showOptions, setShowOptions] = useState(false);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const { userTestimonial, fetchTestimonialsById } = state.testimonialAPI
    const [showEmbedPopup, setShowEmbedPopup] = useState(false);
    const [embedType, setEmbedType] = useState("grid");
    const [showEmbed, setShowEmbed] = useState(false);
    const { id } = useParams();

    const checkUser = () => {
        const isUserTrue = localStorage.getItem('testimonial_user_login')
        if (isUserTrue === 'false' || !isUserTrue) {
            navigate('/login')
        }
        return;
    }
    async function getTestimonialById(id) {
        await fetchTestimonialsById(id);
    }
    useEffect(() => {
        checkUser()
        getTestimonialById(id)
    }, [])
    const handleShowEmbedPopup = () =>{
        setShowEmbedPopup(!showEmbedPopup)
    }
    const handleShowOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions);
    };
    const handleEmbedOptions = (e) => {
        setEmbedType(e.target.value);
        setShowEmbed(true);
    }
    return (
        <main className='px-4 py-2 md:py-0 md:ml-64 md:mr-64 mt-2 md:mt-0'>
            <div className={`absolute ${showEmbedPopup ? 'block' : 'hidden'} w-[95%] sm:max-w-[600px] md:max-w-[800px] shadow-lg shadow-zinc-900 border-2 border-zinc-700 rounded-md px-4 py-3 sm:translate-y-[-50%] translate-x-[-50%] z-20 bg-zinc-800 sm:top-[50%] left-[50%] min-h-[72vh]`}>
                <div className='float-right cursor-pointer bg-zinc-700 hover:bg-zinc-600 w-8 h-8 grid items-center justify-center text-center rounded-full text-lg' onClick={handleShowEmbedPopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='grid gap-2 mt-12 sm:grid-cols-2'>
                    <div className='bg-zinc-700 px-3 py-2 rounded-md grid gap-1'>
                        <h2>Grid Theme</h2>
                        <img src={gridImage} alt="Grid Image" className='rounded-md h-48 w-full object-cover' />
                        <div className='flex gap-2'>
                            <p className='text-sm text-gray-300 underline'><Link to={`/embed/grid/${userTestimonial._id}`} target='_blank'>Preview</Link></p>
                            <button className='text-sm text-gray-300 underline' onClick={handleEmbedOptions} value="grid">Embed</button>
                        </div>
                    </div>
                    <div className='bg-zinc-700 px-3 py-2 rounded-md grid gap-1'>
                        <h2>Marquee Theme</h2>
                        <img src={marqueeImage} alt="Marquee Image" className='rounded-md h-48 w-full object-cover' />
                        <div className='flex gap-2'>
                            <p className='text-sm text-gray-300 underline'><Link to={`/embed/marquee/${userTestimonial._id}`} target='_blank'>Preview</Link></p>
                            <button className='text-sm text-gray-300 underline' onClick={handleEmbedOptions} value="marquee">Embed</button>
                        </div>
                    </div>
                </div>
                {
                    showEmbed && <div className='bg-zinc-700 grid gap-3 px-3 mt-4 py-2 rounded-md'>
                        <p>Copy this code and paste it in your website's HTML part where you want it:</p>
                        <pre className='overflow-auto bg-gray-900 px-3 py-2 rounded-md whitespace-pre-wrap w-full'>
                            <code className='font-mono'>
                                &lt;iframe id="testimonialIframe" src="https://testiflow.netlify.app/embed/{embedType}/{userTestimonial._id}"&gt;&lt;/iframe&gt;
                                &lt;script src="https://res.cloudinary.com/da3wjnlzg/raw/upload/v1/testimonialJS/ihlzrspaxe2tvbm6qbza.js"&gt;&lt;/script&gt;
                            </code>
                        </pre>
                    </div>
                }
            </div>
            <div className={`${showEmbedPopup ? 'opacity-25' : 'opacity-100'} grid gap-3 mt-4`}>
                {
                    userTestimonial.images && userTestimonial.images.url ? (
                        <img
                            className="w-full max-w-[400px] rounded-md"
                            src={userTestimonial.images.url} // Accessing the URL of the image
                            alt="User Testimonial"
                        />
                    ) : (
                        ""
                    )
                }
                <h2 className='text-lg'>{userTestimonial.description}</h2>
                <p className='text-sm text-gray-400'>Created: {new Date(userTestimonial.createdAt).toLocaleString()}</p>
                <button onClick={handleShowOptions} className='text-left w-fit text-sm bg-gray-800 px-3 py-1 rounded-md md:hidden'>Options</button>
            </div>
            <div className={`${showEmbedPopup ? 'opacity-25' : 'opacity-100'}`}>
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
                        <button to="#" className='text-left w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md' onClick={handleShowEmbedPopup}>Website</button>
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
