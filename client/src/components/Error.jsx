import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='mt-4 flex flex-col items-center min-h-[80vh] justify-center gap-3 text-center px-3 py-2'>
      <video autoPlay loop muted playsInline controls={false} className='max-w-[400px] mx-auto rounded-md'>
        <source src='https://res.cloudinary.com/da3wjnlzg/video/upload/f_auto:video,q_auto/v1/testimonialJS/ylimpsxjscwxvvz4utto' type="video/mp4" />
      </video>
      <h2 className='text-lg'>Page is unavailable, go back to <Link to="/" className='underline'>Home</Link></h2>
    </div>
  );
};

export default Error;
