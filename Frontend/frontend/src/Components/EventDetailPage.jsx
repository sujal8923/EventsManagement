import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';

function EventDetailPage({ handleLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventType = searchParams.get('type'); // 'past' or null (for upcoming)

  // Consolidated dummy data for ALL events (past and upcoming)
  // This array should be consistent across EventDetailPage and RegistrationForm
  const allEvents = [
    // Past Events
    { id: 'past-event-1', name: 'Annual Tech Summit 2024', description: 'A grand gathering of tech enthusiasts and innovators, featuring keynote speakers and interactive workshops. This event covered cutting-edge topics in AI, blockchain, and sustainable technology.', date: 'November 10, 2024', location: 'Virtual Conference Platform', timings: '09:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/600x400/007bff/ffffff?text=Past+Tech+Summit', isPast: true },
    { id: 'past-event-2', name: 'Innovate Hackathon 2023', description: 'A thrilling 24-hour coding challenge that brought together brilliant minds to solve real-world problems with technology, fostering creativity and collaboration.', date: 'December 05, 2023', location: 'City Arena, Main Hall', timings: 'All Day Event', imageUrl: 'https://placehold.co/600x400/28a745/ffffff?text=Past+Hackathon', isPast: true },
    { id: 'past-event-3', name: 'Design Conference 2022', description: 'Exploring the future of design, user experience, and creative technologies with leading designers and industry experts from around the world.', date: 'September 20, 2022', location: 'Online Webinar Series', timings: '10:00 AM - 04:00 PM IST', imageUrl: 'https://placehold.co/600x400/ffc107/ffffff?text=Past+Design+Conf', isPast: true },
    { id: 'past-event-4', name: 'Marketing Masterclass 2023', description: 'An intensive workshop on digital marketing strategies and brand building for modern businesses, covering SEO, social media, and content marketing.', date: 'July 15, 2023', location: 'Grand Hotel Ballroom', timings: '09:30 AM - 03:30 PM IST', imageUrl: 'https://placehold.co/600x400/dc3545/ffffff?text=Past+Marketing', isPast: true },
    { id: 'past-event-5', name: 'Fintech Forum 2024', description: 'Discussing the latest trends and innovations in financial technology and investment strategies, with insights from fintech leaders and economists.', date: 'March 22, 2024', location: 'Business Center Auditorium', timings: '11:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/600x400/6f42c1/ffffff?text=Past+Fintech', isPast: true },

    // Upcoming Events (These IDs should match what's in UserHomePage.jsx)
    { id: 'upcoming-event-4', name: 'Future of AI Workshop', description: 'Dive deep into Artificial Intelligence and machine learning, exploring topics like neural networks, deep learning, and practical applications. This workshop is designed for developers, researchers, and enthusiasts looking to expand their knowledge in AI.', date: 'August 15, 2025', location: 'Online via Zoom', timings: '10:00 AM - 04:00 PM IST', imageUrl: 'https://placehold.co/600x400/007bff/ffffff?text=AI+Workshop', isPast: false },
    { id: 'upcoming-event-5', name: 'Web Dev Masterclass', description: 'A comprehensive masterclass covering modern web development with React, Tailwind CSS, and best practices for building responsive and performant applications. Suitable for intermediate developers.', date: 'September 01, 2025', location: 'City Convention Center, Hall B', timings: '09:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/600x400/28a745/ffffff?text=Web+Dev', isPast: false },
    { id: 'upcoming-event-6', name: 'Cybersecurity Seminar', description: 'Protecting your digital assets: A comprehensive guide to cybersecurity threats, defense mechanisms, and best practices for individuals and organizations. Learn from industry experts.', date: 'September 20, 2025', location: 'University Auditorium', timings: '02:00 PM - 06:00 PM IST', imageUrl: 'https://placehold.co/600x400/ffc107/ffffff?text=Cybersecurity', isPast: false },
    { id: 'upcoming-event-7', name: 'Mobile App Design Sprint', description: 'Rapid prototyping for mobile apps: UI/UX best practices.', date: 'October 05, 2025', location: 'Tech Hub Co-working Space', timings: '09:30 AM - 04:30 PM IST', imageUrl: 'https://placehold.co/600x400/dc3545/ffffff?text=Mobile+App', isPast: false },
  ];

  // Find the event based on the ID from the URL parameters
  const event = allEvents.find(e => e.id === id);

  // Determine if the event is past based on the query parameter or the event data itself
  const isEventPast = eventType === 'past' || (event && event.isPast);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
        <Navbar handleLogout={handleLogout} />
        <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Event Not Found</h1>
          <p className="text-lg text-gray-700 mb-6">The event you are looking for could not be displayed.</p>
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
          {/* Event Image */}
          <div className="md:w-1/2 flex justify-center items-center rounded-xl overflow-hidden shadow-lg">
            <img
              src={event.imageUrl || `https://placehold.co/600x400/007bff/ffffff?text=${event.name.replace(/\s/g, '+')}`}
              alt={event.name}
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/007bff/ffffff?text=Image+Not+Found`; }}
            />
          </div>

          {/* Event Details */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold text-cyan-700 mb-4">{event.name}</h1>
            <p className="text-xl text-gray-800 mb-6">{event.description}</p>

            <div className="space-y-3 text-lg text-gray-700 mb-8">
              <p><span className="font-semibold">Date:</span> {event.date}</p>
              <p><span className="font-semibold">Location:</span> {event.location}</p>
              <p><span className="font-semibold">Timings:</span> {event.timings}</p>
              {/* Add more details as needed, e.g., speakers, agenda */}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isEventPast && ( // Conditionally render Register Now button
                <button
                  onClick={() => navigate(`/register/${event.id}`)}
                  className="flex-1 p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                  Register Now
                </button>
              )}
              <button
                onClick={() => navigate('/home')}
                className={`flex-1 p-3 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold hover:bg-gray-300 transition-all shadow-lg ${isEventPast ? 'w-full' : ''}`}
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
