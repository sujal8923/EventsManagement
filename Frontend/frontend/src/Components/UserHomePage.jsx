import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import EventCard from './EventCard';

function UserHomePage({ handleLogout }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/user/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        separateEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        // Optionally show an error UI
      });
  }, []);

  const separateEvents = (allEvents) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = [];
    const past = [];

    allEvents.forEach((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate >= today) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} userRole="user" />
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center mt-8">
          Welcome to EventFlow!
        </h1>

        {/* Past Events */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            Our Past Highlights
          </h2>
          {pastEvents.length > 0 ? (
            <Carousel events={pastEvents} />
          ) : (
            <p className="text-center text-gray-600 text-lg">
              No past events to display.
            </p>
          )}
        </section>

        {/* Upcoming Events */}
        <section>
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} navigate={navigate} />
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg col-span-full">
                No upcoming events available.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserHomePage;
