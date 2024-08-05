import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../GlobalState'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const navigate = useNavigate();
    
    const checkUser = () =>{
        const isUserTrue = localStorage.getItem('testimonial_user_login')
        if(isUserTrue === 'false' || !isUserTrue){
          navigate('/login')
        }
        return;
      }
      useEffect(() =>{
        checkUser()
      }, [])
  return (
    <main className='px-4 py-2 md:py-0 md:ml-64 mt-2 md:mt-0'>
        <h2 className='font-semibold text-2xl'>Dashboard</h2>
        
    </main>
  )
}

export default Dashboard
