import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import EventCard from './EventCard';
import axios from 'axios'; // Still importing axios just in case it's used elsewhere, but not directly used here for fetch

function UserHomePage({ handleLogout }) { // Removed searchTerm prop
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // This will hold all fetched events
  const [upcomingEvents, setUpcomingEvents] = useState([]); // Renamed from upcomingEventss
  const [pastEvents, setPastEvents] = useState([]); // Renamed from pastEventss

  useEffect(() => {
    fetch("http://localhost:8080/user/event")
      .then((res) => {
        if (!res.ok) { // Check for HTTP errors
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data); // Store all fetched events
        separateEvents(data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        // Optionally, set an error state here to display a message to the user
      });
  }, []); // Empty dependency array means this runs once on mount

  const separateEvents = (allEvents) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to compare correctly

    const upcoming = [];
    const past = [];

    allEvents.forEach((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Normalize event date for comparison

      if (eventDate >= today) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };

  // console.log(upcomingEvents); // Removed console logs for cleaner output
  // console.log(pastEvents);    // Removed console logs for cleaner output

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} userRole="user" />
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center mt-8">Welcome to EventFlow!</h1>

        {/* Section for Past Highlights (always displayed) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Our Past Highlights</h2>
          {pastEvents.length > 0 ? (
            <Carousel events={pastEvents} />
          ) : (
            <p className="text-center text-gray-600 text-lg">No past events to display.</p>
          )}
        </section>

        {/* Section for Upcoming Events (always displayed) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} navigate={navigate} />
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg col-span-full">No upcoming events available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserHomePage;