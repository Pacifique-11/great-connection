import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NavBar } from './components/NavBar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'
import PropertyDetail from './pages/PropertyDetail';
import CarDetail from './components/Buy/carDetails';
import SupplyProperty from './components/SupplyProperty';
import RequestProperty from './components/RequestProperty';
import BuyApartment from './components/Buy/BuyApartment';
import BuyHouse from './components/Buy/BuyHouse';
import BuyCar from './components/Buy/BuyCar';
import BuyMotorcycle from './components/Buy/BuyMotorcycle';
import BuyOtherProperties from './components/Buy/BuyOtherProperties';
import RentApartment from './components/Rent/RentApartment';
import RentHouse from './components/Rent/RentHouse';
import RentCar from './components/Rent/RentCar';
import RentMotorcycle from './components/Rent/RentMotorcycle';
import RentOtherProperties from './components/Rent/RentOtherProperties';
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
        <Route path="/supply-property" element={<SupplyProperty />} />
        <Route path="/request-property" element={<RequestProperty />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/buy-apartment" element={<BuyApartment />} />
        <Route path="/buy-house" element={<BuyHouse />} />
        <Route path="/buy-car" element={<BuyCar />} />
        <Route path="/buy-motorcycle" element={<BuyMotorcycle />} />
        <Route path="/buy-other-properties" element={<BuyOtherProperties />} />
        <Route path="/rent-apartment" element={<RentApartment />} />
        <Route path="/rent-house" element={<RentHouse />} />
        <Route path="/rent-car" element={<RentCar />} />
        <Route path="/rent-motorcycle" element={<RentMotorcycle />} />
        <Route path="/rent-other-properties" element={<RentOtherProperties />} />
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
