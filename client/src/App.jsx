// App.js
import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from './GlobalState';
import Dashboard from './pages/Dashboard';
import Testimonials from './pages/Testimonials';
import FullPage from './pages/FullPage';
import UserTestimonial from './pages/UserTestimonial';
import CreateTestimonialPage from './pages/CreateTestimonialPage';
import Profile from './pages/Profile';
import GridLayout from './pages/Themes/GridLayout';
import Layout from './components/Layout';
import MarqueeLayout from './pages/Themes/MarqueeLayout';
import Error from './components/Error';

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
          theme="dark"
          transition="Bounce"
        />
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route path='/testimonials/:id' element={<FullPage />} />
            <Route path='/page/:id' element={<UserTestimonial />} />
            <Route path='/create' element={<CreateTestimonialPage />} />
            <Route path='/profile' element={<Profile />} />
            {/* theme layouts for embeds */}
            <Route path='/embed/grid/:id' element={<GridLayout />} />
            <Route path='/embed/marquee/:id' element={<MarqueeLayout />} />
            
            <Route path='*' element={<Error />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
