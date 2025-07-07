import React from 'react';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function EventCard({ event, navigate }) {
  return (
    <div
      onClick={() => navigate(`/event/${event.id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-blue-400 max-w-sm"
    >
  
      <img
        src={event.imageUrl || `https://placehold.co/400x250?text=${event.title?.slice(0, 15)}`}
        alt={event.title}
        className="w-full h-52 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x250/eeeeee/333333?text=No+Image`;
        }}
      />

    
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

          <div className="flex items-center text-gray-500 text-sm mb-2">
            <CalendarDaysIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPinIcon className="w-5 h-5 mr-2 text-green-600" />
            <span>{event.location}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/register/${event.id}`);
          }}
          className="mt-2 px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold transition-shadow shadow-md hover:shadow-lg w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCard;
