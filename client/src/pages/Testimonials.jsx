import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../GlobalState';
import { useNavigate, Link } from 'react-router-dom';

const Testimonials = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const {userTestimonialPages, fetchUserTestimonials} = state.testimonialAPI

    const navigate = useNavigate();
    
    const checkUser = () =>{
        const isUserTrue = localStorage.getItem('testimonial_user_login')
        if(isUserTrue === 'false' || !isUserTrue){
          navigate('/login')
        }
        return;
      }
      async function getTestimonialPages(token){
        await fetchUserTestimonials(token);
      }
      useEffect(() =>{
        checkUser()
        getTestimonialPages(token)
      }, [userTestimonialPages])
  return (
    <main className='px-4 py-2 md:py-0 md:ml-64 mt-2 md:mt-0'>
        <h2 className='font-semibold text-2xl'>Your Pages</h2>
        {
            userTestimonialPages && userTestimonialPages.length > 0 ?
            <div className='flex mt-4 gap-2 flex-wrap'>
                {
                    userTestimonialPages.map((pages) =>(
                        <Link to={`/testimonials/${pages._id}`} key={pages._id} className='bg-zinc-800 cursor-pointer hover:bg-zinc-700 min-h-52 max-[640px]:w-full sm:min-w-64 max-w-80 rounded-md px-4 py-3'>
                            <p className='text-pretty'>{pages.description}</p>
                            <div className='mt-2'>
                                <p className='text-sm text-gray-400'>Testimonial received: {pages.testimonials.length}</p>
                            </div>
                        </Link>
                    ))
                }
                <Link to="/create" className='bg-zinc-800 group cursor-pointer min-h-40 max-[640px]:w-full sm:min-w-64 rounded-md px-4 py-3'>
                            <p>Create new page</p>
                            <div className='mt-[25%] text-gray-500 group-hover:scale-125 transition-all duration-150 group-hover:text-white text-center'>
                                <p className='text-5xl'>+</p>
                            </div>
                        </Link>
            </div>
            :
            <p className='mt-4'>You haven't created any testimonial pages yet 👷‍♂️</p>
        }
    </main>
  )
}

export default Testimonials
