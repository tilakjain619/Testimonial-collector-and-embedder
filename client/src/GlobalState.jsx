import { createContext, useState, useEffect } from "react";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import TestimonialAPI from "./api/TestimonialAPI";

export const GlobalState = createContext();
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const testimonialAPI = TestimonialAPI();
  
    axios.defaults.withCredentials = true; // Ensure axios sends cookies
  
    const refreshToken = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/user/refresh-token`, { withCredentials: true });
        setToken(res.data.accessToken);
        setLoading(false);
      } catch (error) {
        console.error("Failed to refresh token", error.response ? error.response.data : error.message);
        setError(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const firstLogin = localStorage.getItem('testimonial_user_login');
      if (firstLogin) {
        refreshToken();
      } else {
        setLoading(false);
      }
    }, []);
  
    const state = {
      token: [token, setToken],
      loading,
      error,
      testimonialAPI,
      userAPI: UserAPI(token)
    };
  
    if (loading) {
      return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
    }
  
    return (
      <GlobalState.Provider value={state}>
        {children}
      </GlobalState.Provider>
    );
  };