import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from './GlobalState'
import Dashboard from './pages/Dashboard'
import Testimonials from './pages/Testimonials'
import FullPage from './pages/FullPage'
import UserTestimonial from './pages/UserTestimonial'
import CreateTestimonialPage from './pages/CreateTestimonialPage'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
/>
        <Navbar />
        <div className='min-h-[84vh]'>

        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/testimonials' element={<Testimonials/>}/>
          <Route path='/testimonials/:id' element={<FullPage/>}/>
          <Route path='/page/:id' element={<UserTestimonial/>}/>
          <Route path='/create' element={<CreateTestimonialPage/>}/>
        
        </Routes>

        </div>
        <Footer/>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
