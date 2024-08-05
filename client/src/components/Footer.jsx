import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='px-4 w-full md:w-[80%] lg:w-[50%] mx-auto py-2 mt-10 pb-4'>
        <div className='grid gap-2'>
            <img className='w-24' src={logo} alt="our logo" />
            <p className='text-gray-300 text-sm'>The easiest way to collect testimonials from your clients and customers and embed them to your websites and blogs.</p>
        </div>
        <div className='mt-8 flex justify-between'>
            <ul className='text-gray-400 grid gap-1'>
               <h2 className='text-gray-200 uppercase'>Products</h2>
               <li className='text-sm'><Link>Pricing</Link></li> 
               <li className='text-sm'><Link>Features</Link></li> 
               <li className='text-sm'><Link>Help Center</Link></li> 
            </ul>
            <ul className='text-gray-400 grid gap-1'>
               <h2 className='text-gray-200 uppercase'>Company</h2>
               <li className='text-sm'><Link>Resources</Link></li> 
               <li className='text-sm'><Link>Tutorials</Link></li> 
               <li className='text-sm'><Link>Privacy Policy</Link></li> 
            </ul>
        </div>
    </footer>
  )
}

export default Footer
