import { useParams } from "react-router-dom";
import {searchData} from "../../assets/SearchData";

const ListingDetails = () => {
  const { id } = useParams();
  const listing = searchData.find((item) => item.id.toString() === id);

  if (!listing) {
    return <div className="p-4 text-center text-red-500">Listing not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
      <p className="text-gray-700">📍 {listing.location}</p>
      <p className="text-gray-700">🏡 {listing.type}</p>
      <p className="text-gray-700">💰 {listing.price}</p>
      <p className="text-gray-700">📌 {listing.status}</p>
    </div>
  );
};

export default ListingDetails;

