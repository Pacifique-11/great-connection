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

import CreateSupplyProperty from './components/CreateSupplyProperty';
import ClothesDetails from './components/Buy/ClothesDetails';
import LandDetails from './components/Buy/LandDetails';


import RequestProperty from './components/RequestProperty';
import BuyApartment from './components/Buy/BuyApartment';
import BuyHouse from './components/Buy/BuyHouse';
import BuyHotel from './components/Buy/BuyHotel';
import BuyCar from './components/Buy/BuyCar';
import BuyMotorcycle from './components/Buy/BuyMotorcycle';
import BuyOtherProperties from './components/Buy/BuyOtherProperties';
import RentApartment from './components/Rent/RentApartment';
import RentHouse from './components/Rent/RentHouse';
import RentHotel from './components/Rent/RentHotel';
import RentCar from './components/Rent/RentCar';
import RentMotorcycle from './components/Rent/RentMotorcycle';
import RentOtherProperties from './components/Rent/RentOtherProperties';
import SupplyPropertyDetail from './components/SupplyDetail';
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
        <Route path="/supply-property" element={<CreateSupplyProperty />} />
        <Route path="/request-property" element={<RequestProperty />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/clothes/:id" element={<ClothesDetails />} />
        <Route path="/land/:id" element={<LandDetails />} />
        <Route path="/buy-apartment" element={<BuyApartment />} />
        <Route path="/buy-house" element={<BuyHouse />} />
        <Route path='/buy-hotel' element={<BuyHotel />} />
        <Route path="/buy-car" element={<BuyCar />} />
        <Route path="/buy-motorcycle" element={<BuyMotorcycle />} />
        <Route path="/buy-other-properties" element={<BuyOtherProperties />} />
        <Route path="/rent-apartment" element={<RentApartment />} />
        <Route path="/rent-house" element={<RentHouse />} />
        <Route path='rent-hotel' element={<RentHotel /> } />
        <Route path="/rent-car" element={<RentCar />} />
        <Route path="/rent-motorcycle" element={<RentMotorcycle />} />
        <Route path="/rent-other-properties" element={<RentOtherProperties />} />
		<Route path="/supply-property-detail/:id" element={<SupplyPropertyDetail />} />
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
