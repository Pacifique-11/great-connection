import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NavBar } from './components/NavBar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'
import PropertyDetail from './pages/PropertyDetail';
import './App.css'

function App() {
  return (
     <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        {/* 404 Page Not Found */}
        <Route path="*" element={
          <div className='flex flex-col items-center shadow-md p-6 mt-25'>
            <h3 className='font-bold my-3 text-red-600'>Oooops! Requested Page Not Found!</h3>
            <Link to="/">
              <button className='py-3 px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition'>
                Back | Home
              </button>
            </Link>
          </div>
        } />

      </Routes>
      <Footer />
     </Router>
  )
}

export default App
