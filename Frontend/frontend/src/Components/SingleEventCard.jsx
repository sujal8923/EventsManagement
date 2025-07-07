import React from 'react';
import { useNavigate } from 'react-router-dom';

function SingleEventCard() {
  let navi = useNavigate();
  const naviToForm = (e)=>{
    navi(`/register/:${e}`); 

  }

  const event = {
    title: "Campus DevConnect 2025",
    image: "https://via.placeholder.com/300x120.png?text=DevConnect",
    time: "11:00 AM - 3:00 PM",
    location: "ABES Engineering College, Ghaziabad",
    description:
      "An engaging developer meetup with sessions on Web3, AI, and startup networking.",
    tags: ['Web3', 'AI', 'Startup', 'Networking'],
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100  justify-center p-6">
      <div
        className="transition-all duration-500 p-4 rounded-xl shadow-xl text-white font-semibold flex flex-col items-center justify-start bg-white text-black"
        style={{
          width: '300px',
          height: '360px',
          opacity: 1,
        }}
      >
        <img
          src={event.image}
          alt="Event"
          className="w-full h-[120px] object-cover rounded-md mb-2"
        />
        <h2 className="text-xl font-bold mb-1 text-center">{event.title}</h2>
        <p className="text-sm text-gray-600 mb-1">🕒 {event.time}</p>
        <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
        <p className="text-sm text-gray-700 mb-2 text-center">{event.description}</p>

    
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          // onClick={() => alert(`Registered for: ${event.title}`)}
          onClick={()=> naviToForm(event?.id)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default SingleEventCard;