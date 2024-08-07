import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const TestimonialAPI = () => {
    const [userTestimonialPages, setUserTestimonialPages] = useState([]);
    const [userTestimonial, setUserTestimonial] = useState([]);
    const [testimonialDescription, setTestimonialDescription] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserTestimonials = async (token) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/api/get-testimonials-page`, {
                headers: { Authorization: token }
            });
            setUserTestimonialPages(res.data)
        } catch (error) {
            setError(error);
            console.error("Error fetching all products:", error);
        }
    }
    const fetchTestimonialsById = async (id, token) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/api/testimonials/${id}`);
            setUserTestimonial(res.data)
        } catch (error) {
            setError(error);
            console.error("Error fetching all products:", error);
        }
    }
    const fetchTestimonialDescriptionById = async (id) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/api/testimonials/${id}`);
            setTestimonialDescription(res.data)
        } catch (error) {
            setError(error);
            console.error("Error fetching all products:", error);
        }
    }
    const submitTestimonial = async (testimonialText, id) =>{
        try {
            await axios.post(`${BASE_API_URL}/api/add-testimonial/${id}`, testimonialText);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error sending testimonial!");
        }
    }
    const createTestimonialPage = async (newTestimonialPage, token) => {
        try {
          const res = await axios.post(`${BASE_API_URL}/api/create`, newTestimonialPage, {
            headers: { Authorization: token }
          });
          setUserTestimonialPages((prevPages) => [...prevPages, res.data]);
          toast.success("Testimonial Page created successfully!");
        } catch (error) {
          toast.error(error.response?.data?.msg || "Error creating testimonial page");
          console.error("Error creating testimonial page:", error);
        }
      };
      
      const updateTestimonialPage = async (id, updatedTestimonialPage, token) => {
        try {
          const res = await axios.put(`${BASE_API_URL}/api/edit-testimonials-page/${id}`, updatedTestimonialPage, {
            headers: { Authorization: token },
          });
          console.log(res.data);
          
          setUserTestimonialPages((prevPages) => 
            prevPages.map((page) => (page._id === id ? res.data : page))
          );
      
          toast.success("Testimonial Page updated successfully!");
        } catch (error) {
          toast.error(error.response?.data?.msg || "Error updating testimonial page");
          console.error("Error updating testimonial page:", error);
        }
      };
      const deleteTestimonialPage = async (id, token) => {
        try {
            const res = await axios.delete(`${BASE_API_URL}/api/delete-testimonials-page/${id}`, {
                headers: { Authorization: token }
            });
            // Update the state to remove the deleted testimonial page from the list
            setUserTestimonialPages((prevPages) => prevPages.filter(page => page._id !== id));
            toast.success(res.data.msg || "Testimonial Page deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error deleting testimonial page");
            console.error("Error deleting testimonial page:", error);
        }
    };
      
    
    return { fetchUserTestimonials, deleteTestimonialPage, updateTestimonialPage, createTestimonialPage, submitTestimonial, fetchTestimonialDescriptionById, testimonialDescription, fetchTestimonialsById, userTestimonial, setUserTestimonial ,userTestimonialPages, setUserTestimonialPages }
}

export default TestimonialAPI
