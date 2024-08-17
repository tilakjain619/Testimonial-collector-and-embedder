import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
import Confetti from 'react-confetti'
const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const navigate = useNavigate()
    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const res = await axios.get(`${BASE_API_URL}/user/success`, {
                    params: { session_id: sessionId }
                });
                setTimeout(() =>{
                    // navigate('/dashboard')
                    window.location.href = '/dashboard';
                }, 3000)
            } catch (error) {
                console.error(error.response?.data?.msg || 'Error verifying payment');
            }
        };

        verifyPayment();
    }, [sessionId]);

    return (
        <div className='px-4 py-2 md:py-0 md:ml-64 mt-10 md:mt-0'>
            <Confetti
                className='overflow-x-hidden w-full h-full'
            />
            <h1 className='text-2xl'>Payment Successful!</h1>
            <p className='text-gray-300 mt-2'>You have been upgraded to Pro 🥳</p>
            <p className='mt-4 text-gray-400 text-sm'>Redirecting you back to dashboard</p>
        </div>
    );
};

export default Success;
