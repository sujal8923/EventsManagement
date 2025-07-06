import React from 'react';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// EventCard now receives 'navigate' function directly
function EventCard({ event, navigate }) {
  return (
    <div
      className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col sm:flex-row items-center p-4"
      onClick={() => navigate(`/event/${event.id}`)} // Navigate to detail page using event ID
    >
      {/* Image on the right */}
      {/* Added 'p-2' to create padding around the image within its container */}
      <div className="w-full sm:w-1/3 flex-shrink-0 mb-4 sm:mb-0 sm:ml-4 p-2">
        <img
          src={event.imageUrl || `https://placehold.co/150x100/007bff/ffffff?text=${event.name.replace(/\s/g, '+')}`}
          alt={event.name}
          className="w-full h-auto rounded-lg object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x100/cccccc/333333?text=Image+Missing`; }}
        />
      </div>

      {/* Content on the left */}
      {/* Added 'sm:pr-4' to add space to the right of the text content on small screens and up */}
      {/* Also added 'sm:mr-4' to the image div to push it away from the text on small screens and up */}
      <div className="flex-grow text-center sm:text-left sm:pr-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-2 justify-center sm:justify-start">
          <CalendarDaysIcon className="w-4 h-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4 justify-center sm:justify-start">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span>{event.location}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from firing when button is clicked
            navigate(`/register/${event.id}`); // Navigate to registration page using event ID
          }}
          className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-md font-semibold hover:opacity-90 transition-all shadow-md"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCard;
