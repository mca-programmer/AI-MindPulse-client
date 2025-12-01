import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AunthContext } from '../Auth/AuthProvider';

const Card = ({ purchase }) => {
    console.log(purchase);
    const { setDetails } = useContext(AunthContext);
    function handleDetails(){
        setDetails(purchase);
    }
  return (
    <div
      className="relative w-[220px] h-[300px] bg-black flex flex-col justify-between p-4 gap-4 rounded-lg cursor-pointer text-white overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${purchase.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Card Content */}
      <div>
        <p className="text-2xl font-bold capitalize text-transparent bg-clip-text bg-gradient-to-br from-[#fff] to-[#e81cff]">
          {purchase.name}
        </p>
        <p className="text-sm text-gray-300">{purchase.framework}</p>
        <p className="text-sm text-gray-300">{purchase.useCase}</p>
        <p className="text-sm text-gray-300">{purchase.createdBy}</p>
        <p className="text-sm text-gray-300">{purchase.purchasedBy}</p>
      </div>
      
      {/* View Details Button */}
      <div className="mt-4">
        <NavLink    to={`/details/${purchase._id}`}>
            <button
          className="w-full py-2 bg-[#e81cff] text-white font-semibold rounded-lg hover:bg-[#d215db] transition duration-300"
          onClick={handleDetails}
          
        >
          View Details
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
