import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uploadImage from '../utils/uploadImage'; // Import the uploadImage function
import { GlobalState } from '../GlobalState';
import { toast } from 'react-toastify';
const CreateTestimonialPage = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [token] = state.token;
    const [file, setFile] = useState(null);
    const { createTestimonialPage } = state.testimonialAPI;
    const navigate = useNavigate();
    const checkUser = () => {
        const isUserTrue = localStorage.getItem('testimonial_user_login')
        if (isUserTrue === 'false' || !isUserTrue) {
            navigate('/login')
        }
        return;
    }
    useEffect(() => {
        checkUser()
    }, []);

    const [newPage, setNewPage] = useState({
        description: '',
        images: { public_id: '', url: '' },
    });

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setNewPage({ ...newPage, [name]: value });
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please upload an image.");
            return;
        }

        try {
            const uploadedImage = await uploadImage(file, token); // Upload the image
            const newTestimonialPage = {
                ...newPage,
                images: { public_id: uploadedImage.public_id, url: uploadedImage.url },
            };

            await createTestimonialPage(newTestimonialPage, token); // Create the new Testimonial Page with the image data

            setNewPage({
                description: '',
                images: ''
            });
            window.location.href = '/testimonials';
        } catch (error) {
            console.log(error);
            toast.error("Error creating new Testimonial Page.");
        }
    };

    return (
        <main className='px-4 py-2 md:py-0 md:ml-64 mt-2 md:mt-0'>
            <form onSubmit={handleSubmit} className='grid gap-2 max-w-[500px] mx-auto sm:mt-10'>
                <label htmlFor="description">Description</label>
                <textarea
                    className='block min-h-24 w-full px-3 py-2 mt-1 rounded-md bg-transparent focus:bg-gray-800 border-2 border-zinc-700 focus:border-zinc-600 outline-none'
                    type="text"
                    name="description"
                    id='description'
                    required
                    placeholder='Something you want to specificlly ask from your customers'
                    value={newPage.description}
                    onChange={handleChangeInput}
                ></textarea>

                <label htmlFor="file_input" className='mt-2'>Cover Image or your logo</label>
                <input required onChange={handleFileChange} accept='png,jpeg,webp' id='file_input' className="block w-full py-2 text-sm text-gray-300 px-2 rounded-lg cursor-pointer outline-none border-2 border-zinc-700" type="file" />
                <p className="mt-1 text-sm text-gray-300" id="file_input_help">PNG, JPEG or WebP (MAX. 1024 x 1024)</p>
                
                <button className='bg-[#5d5dff] text-white py-2 mt-2 rounded-md hover:bg-opacity-40' type="submit">Create Page</button>
            </form>
        </main>
    )
}

export default CreateTestimonialPage
