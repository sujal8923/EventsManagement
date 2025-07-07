import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import EventCard from './EventCard';
import axios from 'axios';

function UserHomePage({ handleLogout, searchTerm }) {
   // Receive searchTerm prop
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [upcomingEventss, setUpcomingEvents] = useState([]);
  const [pastEventss, setPastEvents] = useState([]);




 


  useEffect(() => {
   
    fetch("http://localhost:8080/user/event")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        separateEvents(data);
      });
  }, []);

  const separateEvents = (allEvents) => {
    const today = new Date();

    const upcoming = [];
    const past = [];

    allEvents.forEach((event) => {
      const eventDate = new Date(event.date); 

      if (eventDate >= today) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };
  console.log(upcomingEventss)
  console.log(pastEventss)

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} userRole="user" /> 
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center mt-8">Welcome to EventFlow!</h1>

     
        {searchTerm === '' ? (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Our Past Highlights</h2>
            <Carousel  events={pastEventss} />
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Search Results for "{searchTerm}"</h2>
          </section>
        )}


        <section>
          {searchTerm === '' && ( 
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Upcoming Events</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingEventss.length > 0 ? (
              upcomingEventss.map(event => (
                <EventCard  key={event.id} event={event} navigate={navigate} />
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg col-span-full">No events found matching your search.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserHomePage;
