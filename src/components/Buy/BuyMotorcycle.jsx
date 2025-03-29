import React from 'react'
import { Link } from 'react-router-dom'
import car1 from '../../assets/car1.jpg'
import car2 from '../../assets/car2.jpg'
import car3 from '../../assets/car3.jpg'

const carListings = [
    {
      id: 1,
      image:car1 ,
      name: "SUZUKI Grand Vitara 2023",
      price: "43 300 000 RWF",
      transmission: "Automatic",
      fuel: "Hybrid",
      status: "sold",
      certified: true,
      inspected: true,
      warranty: "6 Months",
    },
    {
      id: 2,
      image: car2,
      name: "Leapmotor C10 2024",
      price: "42 000 000 RWF",
      transmission: "Automatic",
      fuel: "Electric",
      status: "sold",
      certified: true,
      inspected: true,
      warranty: "6 Months",
    },
    {
      id: 3,
      image: car3,
      name: "Leapmotor C10 2024",
      price: "42 000 000 RWF",
      transmission: "Automatic",
      fuel: "Electric",
      status: "available",
      certified: true,
      inspected: true,
      warranty: "6 Months",
    },
  ];

const BuyMotorcycle = () => {
  return (
    <div className='mt-30 p-4'>
             <h1 className="text-2xl font-bold text-gray-800">New cars</h1>
             <p className='text-gray-400'>Here you can see different new cars</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
          {carListings.map((car) => (
            <div key={car.id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="relative">
                <img src={car.image} alt={car.name} className="w-full rounded-t-lg" />
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-white text-xs font-bold rounded ${
                    car.status === "sold" ? "bg-orange-500" : "bg-green-500"
                  }`}
                >
                  {car.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-bold mt-2">{car.name}</h3>
              <p className="text-green-600 text-xl font-bold">{car.price}</p>
              <div className="flex items-center text-gray-600 text-sm mt-2">
                <span className="mr-4">⚙ {car.transmission}</span>
                <span>⛽ {car.fuel}</span>
              </div>
              <div className="flex items-center text-green-500 text-sm mt-2">
                {car.certified && <span className="mr-4">✔ Certified</span>}
                {car.inspected && <span className="mr-4">🔍 Inspected</span>}
                {car.warranty && <span>🛡 {car.warranty}</span>}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-500 hover:text-gray-700">♡</button>
                <button className="text-gray-500 hover:text-gray-700">🔗</button>
                <Link to={`/car/${car.id}`}>
                <button  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        </div>
  )
}

export default BuyMotorcycle
