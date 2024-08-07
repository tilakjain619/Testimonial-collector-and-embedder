import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import gridImage from '../assets/grid-sample.png'
import marqueeImage from '../assets/marquee-sample.png'
import { toast } from 'react-toastify';

const FullPage = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [showOptions, setShowOptions] = useState(false);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const { userTestimonial, fetchTestimonialsById, deleteTestimonialPage } = state.testimonialAPI
    const [showEmbedPopup, setShowEmbedPopup] = useState(false);
    const [embedType, setEmbedType] = useState("grid");
    const [showEmbed, setShowEmbed] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()

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
    const handleShowEmbedPopup = () => {
        setShowEmbedPopup(!showEmbedPopup);
        setShowOptions(false);
    }
    const handleShowOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions);
    };
    const handleCloseOptions = () => {
        setShowOptions(false);
    };
    const handleEmbedOptions = (e) => {
        setEmbedType(e.target.value);
        setShowEmbed(true);
    }

    const handleDeletePage = async () =>{
        const confirmDelete = confirm("Are you sure want to delete this page?");
        if(confirmDelete){
            await deleteTestimonialPage(id, token);
        navigate('/testimonials'); // Navigate to the testimonials page after deletion
        }
        else{
            return;
        }
        setShowOptions(false);
    }

    const embedCode = `<iframe id="testimonialIframe" src="https://testiflow.netlify.app/embed/${embedType}/${userTestimonial._id}"></iframe>
<script src="https://res.cloudinary.com/da3wjnlzg/raw/upload/v1/testimonialJS/ihlzrspaxe2tvbm6qbza.js"></script>`
    return (
        <main className='px-4 py-2 md:py-0 md:ml-64 md:mr-64 mt-2 md:mt-0'>
            <div onClick={handleShowOptions} className='fixed grid md:hidden cursor-pointer bottom-4 right-4 bg-gray-300 text-black w-12 h-12 items-center justify-center rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
    <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
      </div>
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
                                {embedCode}
    </code>
                        </pre>
                        <button className='bg-[#5d5dff] w-fit mx-auto px-3 py-1 rounded-md' onClick={() => {
                            navigator.clipboard.writeText(embedCode);
                            toast.success("Copied to clipboard")
                        }}>
                            Copy
                        </button>
                    </div>
                }
            </div>
            <div onClick={handleCloseOptions} className={`${showEmbedPopup ? 'opacity-25' : 'opacity-100'} grid gap-3 mt-4`}>
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
                </div>
            <div onClick={handleCloseOptions} className={`${showEmbedPopup ? 'opacity-25' : 'opacity-100'}`}>
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
                        <p className='mt-4'>No testimonials received yet! Share with your customers to hear what they say ⚡😎</p>
                }
            </div>
            <aside className={`fixed shadow-lg shadow-zinc-900 w-52 md:w-60 z-10 top-20 transition-all duration-300 rounded-lg min-h-[80vh] bg-[#202325] md:bg-transparent ${showOptions ? 'right-0' : '-right-52'} md:right-2`}>
                <div className='flex flex-col text-left justify-between px-1 md:px-3 py-2 gap-1'>
                    <div className='grid gap-1'>
                        <h2 className='px-4 pt-2.5 text-slate-400 font-semibold uppercase'>Embed</h2>
                        <button to="#" className='text-left w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md' onClick={handleShowEmbedPopup}>Website</button>
                    </div>
                    <div className='grid gap-1'>
                        <h2 className='px-4 pt-2.5 text-slate-400 font-semibold uppercase'>Links</h2>
                        <Link onClick={handleCloseOptions} to={`/page/${userTestimonial._id}`} className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Public Landing Page</Link>
                    </div>
                    <div className='grid gap-1'>
                        <h2 className='px-4 pt-2.5 text-slate-400 font-semibold uppercase'>Manage</h2>
                        <Link onClick={handleCloseOptions} to={`/edit/${userTestimonial._id}`} className=' w-full hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Edit Page</Link>
                        <button onClick={handleDeletePage} className=' w-full text-left hover:bg-zinc-700 px-4 py-2.5 rounded-md'>Delete Page</button>
                    </div>
                </div>
            </aside>
        </main>
    )
}
// const firstLetter = item.name.charAt(0).toUpperCase(); // Capitalizes the first letter if needed


export default FullPage
