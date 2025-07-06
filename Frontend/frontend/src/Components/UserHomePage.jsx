import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import EventCard from './EventCard';

function UserHomePage({ handleLogout, searchTerm }) { // Receive searchTerm prop
  const navigate = useNavigate();

  // Dummy data for past events (for carousel) - ensure unique IDs
  const pastEvents = [
    { id: 'past-event-1', name: 'Annual Tech Summit 2024', description: 'A grand gathering of tech enthusiasts and innovators, featuring keynote speakers and interactive workshops.', date: '2024-11-10', location: 'Virtual', timings: '09:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/400x200/007bff/ffffff?text=Past+Tech+Summit' },
    { id: 'past-event-2', name: 'Innovate Hackathon 2023', description: 'A 24-hour coding challenge that brought together brilliant minds to solve real-world problems with technology.', date: '2023-12-05', location: 'City Arena', timings: 'All Day', imageUrl: 'https://placehold.co/400x200/28a745/ffffff?text=Past+Hackathon' },
    { id: 'past-event-3', name: 'Design Conference 2022', description: 'Exploring the future of design, user experience, and creative technologies with leading designers.', date: '2022-09-20', location: 'Online', timings: '10:00 AM - 04:00 PM IST', imageUrl: 'https://placehold.co/400x200/ffc107/ffffff?text=Past+Design+Conf' },
    { id: 'past-event-4', name: 'Marketing Masterclass 2023', description: 'An intensive workshop on digital marketing strategies and brand building for modern businesses.', date: '2023-07-15', location: 'Grand Hotel', timings: '09:30 AM - 03:30 PM IST', imageUrl: 'https://placehold.co/400x200/dc3545/ffffff?text=Past+Marketing' },
    { id: 'past-event-5', name: 'Fintech Forum 2024', description: 'Discussing the latest trends and innovations in financial technology and investment strategies.', date: '2024-03-22', location: 'Business Center', timings: '11:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/400x200/6f42c1/ffffff?text=Past+Fintech' },
  ];

  // Dummy data for upcoming events (for cards) - ENSURE UNIQUE IDs
  const upcomingEvents = [
    { id: 'upcoming-event-4', name: 'Future of AI Workshop', description: 'Dive deep into Artificial Intelligence and machine learning, exploring topics like neural networks, deep learning, and practical applications. This workshop is designed for developers, researchers, and enthusiasts looking to expand their knowledge in AI.', date: '2025-08-15', location: 'Online via Zoom', timings: '10:00 AM - 04:00 PM IST', imageUrl: 'https://placehold.co/300x200/007bff/ffffff?text=AI+Workshop' },
    { id: 'upcoming-event-5', name: 'Web Dev Masterclass', description: 'A comprehensive masterclass covering modern web development with React, Tailwind CSS, and best practices for building responsive and performant applications. Suitable for intermediate developers.', date: '2025-09-01', location: 'City Convention Center, Hall B', timings: '09:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/300x200/28a745/ffffff?text=Web+Dev' },
    { id: 'upcoming-event-6', name: 'Cybersecurity Seminar', description: 'Protecting your digital assets: A comprehensive guide to cybersecurity threats, defense mechanisms, and best practices for individuals and organizations. Learn from industry experts.', date: '2025-09-20', location: 'University Auditorium', timings: '02:00 PM - 06:00 PM IST', imageUrl: 'https://placehold.co/300x200/ffc107/ffffff?text=Cybersecurity' },
    { id: 'upcoming-event-7', name: 'Mobile App Design Sprint', description: 'Rapid prototyping for mobile apps: UI/UX best practices.', date: '2025-10-05', location: 'Tech Hub Co-working Space', timings: '09:30 AM - 04:30 PM IST', imageUrl: 'https://placehold.co/300x200/dc3545/ffffff?text=Mobile+App' },
  ];

  // Filter upcoming events based on search term
  const filteredEvents = upcomingEvents.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} userRole="user" /> {/* Navbar now receives searchTerm props from App.jsx */}
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center mt-8">Welcome to EventFlow!</h1>

        {/* Conditionally render Carousel or search results */}
        {searchTerm === '' ? (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Our Past Highlights</h2>
            <Carousel events={pastEvents} />
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Search Results for "{searchTerm}"</h2>
          </section>
        )}


        {/* Upcoming Events as Cards / Filtered Results */}
        <section>
          {searchTerm === '' && ( // Only show "Upcoming Events" title if no search term
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Upcoming Events</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard key={event.id} event={event} navigate={navigate} />
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
