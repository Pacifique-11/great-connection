import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplyCard from '../components/SupplyCard';
import axios from 'axios';
import { NavBar } from '../components/NavBar';
import Footer from '../components/Footer';
import UserNavbar from '../components/UserNavbar';

const SupplyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://easy-renting-bn.onrender.com/api/supply-property');
        console.log('API Response:', response.data);
        setProperties(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/supply-property-detail/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <>
      <UserNavbar />
      <div className="container mx-auto mt-40 px-6 mb-6 flex justify-center items-center flex-col bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplied Properties</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {properties.map((property) => (
            <SupplyCard
              key={property._id}
              image={property.image}
              title={property.title}
              description={property.description}
              onClick={() => handleViewDetails(property._id)}
            />
          ))}
        </div>

        <button
          onClick={() => navigate('/create-supply-property')}
          className="rounded-lg text-xl text-white bg-green-500 hover:bg-green-600 py-2 px-4 mt-10 lg:w-full max-w-[300px] mx-auto"
        >
          Supply Property
        </button>
      </div>
      <Footer />
    </>
  );
};

export default SupplyProperty;
