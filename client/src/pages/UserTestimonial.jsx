import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState'
import { useParams } from 'react-router-dom';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const UserTestimonial = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const { testimonialDescription, fetchTestimonialDescriptionById, submitTestimonial } = state.testimonialAPI
    const { id } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [totalStars, setTotalStars] = useState(5);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [showConfetti, setShowConfetti] = useState(null);
    const { width, height } = [100, 100]

    async function getTestimonialDescriptionById(id) {
        await fetchTestimonialDescriptionById(id);
    }
    useEffect(() => {
        getTestimonialDescriptionById(id)
    }, [])

    useEffect(() => {
        setTestimonialText(prevText => ({ ...prevText, ratings: rating }));
    }, [rating]);

    function handleShowPopup() {
        setShowPopup(prevShow => !prevShow);
    }

    const [testimonialText, setTestimonialText] = useState({
        name: "",
        ratings: rating,
        testimonial: ""
    })
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setTestimonialText({ ...testimonialText, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitTestimonial(testimonialText, id);
        setTestimonialText({
            name: "",
            ratings: "",
            testimonial: ""
        })
        setRating(null);
        setShowPopup(false)

        setShowConfetti(true);

        setTimeout(()=>{
            setShowConfetti(false)
        }, 10000);
    }
    return (
        <main className={`px-4 py-2 md:py-0 ${isLogged ? 'md:ml-64' : 'md:ml-0'} mt-2 md:mt-0`}>
            {showConfetti && <Confetti
                width={width}
                height={height}
                className='overflow-x-hidden'
            />}
            <div className={`grid gap-5 mt-8 md:mt-10 ${showPopup ? "opacity-25" : "opacity-100"}`}>
                {
                    testimonialDescription.images && testimonialDescription.images.url ? (
                        <img
                            className="w-full max-w-[400px] mx-auto rounded-md"
                            src={testimonialDescription.images.url} // Accessing the URL of the image
                            alt="User Testimonial"
                        />
                    ) : (
                        ""
                    )
                }
                <pre className='text-center mt-2 text-lg md:text-2xl whitespace-pre-wrap line-clamp-6 font-[Poppins]'>{testimonialDescription.description}</pre>
                <button onClick={handleShowPopup} className='bg-[#5d5dff] px-5 py-3 mt-2 rounded-md w-fit mx-auto'>Send a testimonial</button>
            </div>
            {/* form for sending testimonial */}
            <div className={`fixed ${showPopup ? 'block' : 'hidden'} w-[95%] sm:max-w-[500px] shadow-lg shadow-zinc-900 border-2 border-zinc-700 rounded-md px-4 py-3 translate-y-[-50%] translate-x-[-50%] z-10 bg-zinc-800 top-[50%] left-[50%] min-h-[60vh]`}>
                <div className='float-right cursor-pointer bg-zinc-700 hover:bg-zinc-600 w-8 h-8 grid items-center justify-center text-center rounded-full text-lg' onClick={handleShowPopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <form onSubmit={handleSubmit} className='my-2 grid w-full gap-2'>
                    <label htmlFor="name" className='mt-1'>Name</label>
                    <input required onChange={handleChangeInput} value={testimonialText.name} placeholder='Your full name' className='block bg-zinc-700 w-full rounded-md px-3 py-2 outline-none' type="text" name='name' id='name' />
                    <label htmlFor="ratings" className='mt-3'>Ratings</label>

                    <div className='flex text-3xl gap-1'>
                        {[...Array(totalStars)].map((star, index) => {
                            const currentRating = index + 1;

                            return (
                                <label key={index}>
                                    <input
                                        hidden
                                        type="radio"
                                        name="ratings"
                                        value={currentRating}
                                        onChange={() => setRating(currentRating)}
                                    />
                                    <span
                                        className="star cursor-pointer"
                                        style={{
                                            color:
                                                currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                        }}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    >
                                        &#9733;
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    <label htmlFor="testimonial" className='mt-3'>Write a message</label>
                    <textarea required onChange={handleChangeInput} value={testimonialText.testimonial} placeholder='Any message, suggestions, feedback...' className='block bg-zinc-700 min-h-32 w-full rounded-md px-3 py-2 outline-none' name="testimonial" id="testimonial"></textarea>
                    <p className='text-xs text-gray-300 mt-3'>Your testimonial might also be used for marketing purposes, your co-operation matters.</p>
                    <button type='submit' className='bg-[#5d5dff] px-5 py-2 mt-2 rounded-md w-fit mx-auto'>Send</button>

                </form>
            </div>
        </main>
    )
}

export default UserTestimonial
