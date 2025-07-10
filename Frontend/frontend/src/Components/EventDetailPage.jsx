import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function EventDetailPage({ handleLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventType = searchParams.get('type');

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
let role = localStorage.getItem('userRole');
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    axios.get('http://localhost:8080/user/event', {
      
    })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const event = events.find(e => e.id === Number(id));
  const isEventPast = event && new Date(event.date) < new Date();

  if (loading) {
    return <div className="text-center p-20 text-xl text-gray-600">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
        <Navbar handleLogout={handleLogout} />
        <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate('/home')}
            className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} />
      <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center items-center rounded-xl overflow-hidden shadow-lg">
            <img
              src={event.imageUrl || `https://placehold.co/600x400/007bff/ffffff?text=${event.title.replace(/\s/g, '+')}`}
              alt={event.title}
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x400/007bff/ffffff?text=Image+Not+Found`;
              }}
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold text-cyan-700 mb-4">{event?.title}</h1>
            <p className="text-xl text-gray-800 mb-6">{event?.description}</p>

            <div className="space-y-3 text-lg text-gray-700 mb-8">
              <p><span className="font-semibold">Date:</span> {event?.date}</p>
              <p><span className="font-semibold">Location:</span> {event?.location}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isEventPast && (
                <button
                  onClick={() =>  {
                    if( role == null){
                      alert("Please login to register for the event");
                    }else{

                      navigate(`/register/${event.id}`)}
                    }
                  } 
                  className="flex-1 p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                  Register Now
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="flex-1 p-3 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold hover:bg-gray-300 transition-all shadow-lg"
              >
                Back to Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
