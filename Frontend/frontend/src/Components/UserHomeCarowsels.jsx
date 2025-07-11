import React, { useState, useEffect } from 'react';

function UserHomeCarowsels() {
  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔹 Dummy data for preview
  useEffect(() => {
    const dummyEvents = [
      
      {
        title: "Tech Conference 2025",
        image: "https://kommunity-app.s3.ap-south-1.amazonaws.com/1qvyvdz3n0q7a58npgsmaw26gdwj?response-content-disposition=inline%3B%20filename%3D%22Commudle%20Banner.png%22%3B%20filename%2A%3DUTF-8%27%27Commudle%2520Banner.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXUMQJEJBCK2EC566%2F20250706%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T063419Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=01f80e5281622125a41d7ae1beafc760db1f21126d7582b8bfa72af6d8222b21",
        time: "10:00 AM - 4:00 PM",
        location: "Delhi Convention Center",
        description: "A tech meetup with top speakers from around the globe.",
      },
      {
        title: "Startup Pitch Fest",
        image: "https://via.placeholder.com/300x120.png?text=Startup+Fest",
        time: "2:00 PM - 6:00 PM",
        location: "IIT Bombay",
        description: "Pitch your startup ideas to investors and mentors.",
      },
      {
        title: "AI & ML Workshop",
        image: "https://via.placeholder.com/300x120.png?text=AI+Workshop",
        time: "9:00 AM - 1:00 PM",
        location: "Online (Zoom)",
        description: "Learn the basics of Machine Learning from industry experts.",
      },
    ];

    setEvents(dummyEvents);
  }, []);

  // 🔁 Auto-slide every 3 seconds
  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="h-screen bg-gradient-to-br from-rose-400 to-pink-300 ">
      <div className="relative w-[90%] max-w-4xl h-[350px] flex items-center justify-center">
        {events.map((event, index) => {
          const isActive = index === activeIndex;
          const offset = index - activeIndex;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 p-4 rounded-xl shadow-xl text-white font-semibold flex flex-col items-center justify-start bg-white text-black`}
              style={{
                transform: `translateX(${offset * 140}px) scale(${isActive ? 1 : 0.9})`,
                zIndex: 100 - Math.abs(offset),
                width: isActive ? '300px' : '220px',
                height: '330px',
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <img
                src={event.image}
                alt="Event"
                className="w-full h-[120px] object-cover rounded-md mb-2"
              />
              <h2 className="text-xl font-bold mb-1">{event.title}</h2>
              <p className="text-sm text-gray-600 mb-1">🕒 {event.time}</p>
              <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
              <p className="text-sm text-gray-700 mb-3">{event.description}</p>
              <button
                onClick={() => alert(`Registering for ${event.title}`)}
                className="mt-auto bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md"
              >
                Register
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserHomeCarowsels;
