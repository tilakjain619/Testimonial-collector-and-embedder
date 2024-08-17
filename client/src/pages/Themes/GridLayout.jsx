import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../../GlobalState';
import { useParams } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import logo from '../../assets/logo.svg'

const GridLayout = () => {
    const state = useContext(GlobalState);
    const { userTestimonial, fetchTestimonialsById } = state.testimonialAPI

    const { id } = useParams();
    async function getTestimonialById(id) {
        await fetchTestimonialsById(id);
    }
    useEffect(() => {
        getTestimonialById(id)
    }, [])

    useEffect(() => {
        // Function to send height to parent
        const sendHeightToParent = () => {
          const height = document.documentElement.scrollHeight;
          window.parent.postMessage({ height }, '*');
        };
    
        // Send height on mount and whenever content changes
        sendHeightToParent();
        window.addEventListener('resize', sendHeightToParent);
    
        return () => {
          window.removeEventListener('resize', sendHeightToParent);
        };
      }, [userTestimonial]);
    return (
        <main className='mt-4 px-4 py-2 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full'>
            <div className='flex flex-wrap gap-2 mx-auto justify-center'>
                {userTestimonial.testimonials &&
                    userTestimonial.testimonials.map((item) => (
                        <div key={item._id} className='bg-zinc-800 min-h-44 w-[360px] px-4 flex flex-col gap-2 rounded-md py-3'>
                            <div className='flex items-center gap-1.5 mt-1'>
                                <div className='w-7 h-7 select-none rounded-full grid items-center justify-center bg-green-500'>
                                    {item.name.charAt(0).toUpperCase()}
                                </div>
                                <h2>{item.name}</h2>
                            </div>
                            <p>{item.testimonial}</p>
                            <StarRating rating={item.ratings} />
                            <p className='text-sm text-gray-400'>Date: {new Date(item.submittedOn).toLocaleDateString()}</p>
                        </div>
                    ))}
            </div>
            <div className='w-20 rounded-md bg-[#151719] px-3 py-1 sm:w-20 my-4 mx-auto'>
                <img src={logo} className='w-full' alt="Created with Testiflow" />
            </div>
        </main>
    )
}

export default GridLayout

{/* <iframe id="testimonialIframe" src="http://localhost:5173/embed/grid/66ae080a89210f91535dd1c2"></iframe>
  <script src="https://res.cloudinary.com/da3wjnlzg/raw/upload/v1/testimonialJS/ihlzrspaxe2tvbm6qbza.js"></script> */}
