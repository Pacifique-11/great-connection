import React from 'react'
import Hero from '../components/Home/Hero'
import Footer from '../components/Footer'
import { NavBar } from '../components/NavBar'
import AssetPropertyList from '../components/property/AssetPropertyList'
import ProprtertyList from '../components/property/PropertyList'
const Homepage = () => {
  return (
	<>
	<NavBar />
	<Hero />
	<ProprtertyList />
	<AssetPropertyList />
	<Footer />
	</>
		
  )
}

export default Homepage
