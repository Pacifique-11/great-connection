import React from 'react'
import { FaSearch } from "react-icons/fa"


const SearchBar = () => {
  return (
	<div>
	  <div className='flex  bg-gray-200 rounded-lg p-2 items-center max-w-2xl'>
		<FaSearch size={20}/>
		<input type="text" placeholder='Search...' className='border-none outline-none py-2 px-4 text-xl'/>
	  </div>
	</div>
  )
}

export default SearchBar
