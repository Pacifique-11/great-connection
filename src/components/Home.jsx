import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import SuppliedProperties from "./Home/GetSuppliedProperty";
import React from 'react'

const Home = () => {
  return (
    <div>
        <Hero />
        <ApartmentCards />    
		<SuppliedProperties />  
    </div>
  )
}

export default Home
