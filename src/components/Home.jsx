import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import SupplyProperty from "../components/SupplyProperty";
import React from 'react'
import { useParams } from "react-router-dom";
import AssetProperty from "./AssetProperty";
const Home = () => {
  return (
    <div>
        <Hero />
        <ApartmentCards />    
		<AssetProperty />
    </div>
  )
}

export default Home
