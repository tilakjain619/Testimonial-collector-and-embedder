import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../GlobalState';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51PmaEI01k1pfJcVru51Nl4Jkus9gwFKSp4yvM4aMv7h2GHCpPPTuVqNPGpbdXfYLfyIb4O9V0mXdDBMh7Tl7rUSB00K916M2wq'); // Replace with your Stripe publishable key
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const UpgradeButton = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;

    const handleUpgrade = async () => {
        const stripe = await stripePromise;
        const res = await axios.post(`${BASE_API_URL}/user/create-checkout-session`, {}, {
            headers: { Authorization: token }
        });
        const { id } = res.data;
        await stripe.redirectToCheckout({ sessionId: id });
    };

    return (
        <button onClick={handleUpgrade} className="bg-blue-500 relative group flex items-center gap-2 justify-center text-white w-full hover:bg-blue-700 px-4 py-2.5 rounded-md">
            Upgrade to Pro
            <div
        class="opacity-0 bottom-12 hidden text-sm group-hover:opacity-100 group-hover:block absolute w-56 mt-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg shadow-lg py-2 z-10">
        <p class="px-2 py-2">Upgrade to pro and get unlimited access to Testiflow and its features.</p>
    </div>
        </button>
    );
};

export default UpgradeButton;