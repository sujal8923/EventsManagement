import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

function RegistrationForm({ handleLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'error', 'loading', ''

  // Consolidated dummy data for ALL events (past and upcoming)
  // This array should be consistent across EventDetailPage and RegistrationForm
  const allEvents = [
    // Past Events (these are not meant for registration, but kept for consistency)
    { id: 'past-event-1', name: 'Annual Tech Summit 2024', description: 'A grand gathering of tech enthusiasts and innovators.', date: '2024-11-10', location: 'Virtual', timings: '09:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/300x200/007bff/ffffff?text=Past+Tech+Summit', isPast: true },
    { id: 'past-event-2', name: 'Innovate Hackathon 2023', description: 'A 24-hour coding challenge.', date: '2023-12-05', location: 'City Arena', timings: 'All Day', imageUrl: 'https://placehold.co/300x200/28a745/ffffff?text=Past+Hackathon', isPast: true },
    { id: 'past-event-3', name: 'Design Conference 2022', description: 'Exploring the future of design.', date: '2022-09-20', location: 'Online', timings: '10:00 AM - 04:00 PM IST', imageUrl: 'https://placehold.co/300x200/ffc107/ffffff?text=Past+Design+Conf', isPast: true },
    { id: 'past-event-4', name: 'Marketing Masterclass 2023', description: 'An intensive workshop on digital marketing strategies.', date: '2023-07-15', location: 'Grand Hotel', timings: '09:30 AM - 03:30 PM IST', imageUrl: 'https://placehold.co/300x200/dc3545/ffffff?text=Past+Marketing', isPast: true },
    { id: 'past-event-5', name: 'Fintech Forum 2024', description: 'Discussing the latest trends in financial technology.', date: '2024-03-22', location: 'Business Center', timings: '11:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/300x200/6f42c1/ffffff?text=Past+Fintech', isPast: true },

    // Upcoming Events (These IDs should match what's in UserHomePage.jsx)
    { id: 'upcoming-event-4', name: 'Future of AI Workshop', description: 'Dive deep into Artificial Intelligence and machine learning.', date: '2025-08-15', location: 'Online via Zoom', timings: '10:00 AM - 04:00 PM IST', imageUrl: 'https://placehold.co/300x200/007bff/ffffff?text=AI+Workshop', isPast: false },
    { id: 'upcoming-event-5', name: 'Web Dev Masterclass', description: 'Learn React, Tailwind CSS, and advanced web development techniques.', date: '2025-09-01', location: 'City Convention Center, Hall B', timings: '09:00 AM - 05:00 PM IST', imageUrl: 'https://placehold.co/300x200/28a745/ffffff?text=Web+Dev', isPast: false },
    { id: 'upcoming-event-6', name: 'Cybersecurity Seminar', description: 'Protecting your digital assets: A comprehensive guide to cybersecurity.', date: '2025-09-20', location: 'University Auditorium', timings: '02:00 PM - 06:00 PM IST', imageUrl: 'https://placehold.co/300x200/ffc107/ffffff?text=Cybersecurity', isPast: false },
    { id: 'upcoming-event-7', name: 'Mobile App Design Sprint', description: 'Rapid prototyping for mobile apps: UI/UX best practices.', date: '2025-10-05', location: 'Tech Hub Co-working Space', timings: '09:30 AM - 04:30 PM IST', imageUrl: 'https://placehold.co/300x200/dc3545/ffffff?text=Mobile+App', isPast: false },
  ];

  // Find the event based on the ID from the URL parameters
  const event = allEvents.find(e => e.id === id);

  const inputStyle =
    'w-full pl-10 p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Basic validation
    if (!name || !email || !phone) {
      setStatus('error');
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real application, you would send this data to your backend
    // to register the user for the event (e.g., add to a 'registrations' collection)
    console.log('Registration Data:', {
      eventName: event ? event.name : 'Unknown Event',
      name,
      email,
      phone,
    });

    // Simulate success or failure
    const success = Math.random() > 0.1; // 90% chance of success

    if (success) {
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      // After successful registration, navigate back to home
      setTimeout(() => navigate('/home'), 1000);
    } else {
      setStatus('error');
    }
  };

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
        <Navbar handleLogout={handleLogout} />
        <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">No Event Selected</h1>
          <p className="text-lg text-gray-700 mb-6">Please select an event to register for.</p>
          <button
            onClick={() => navigate('/home')}
            className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} />
      <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-xl">
        <h1 className="text-4xl font-bold text-cyan-700 mb-4 text-center">Register for {event.name}</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Please fill out the form below to register for the event.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Your Name"
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Your Email"
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="tel" // Use type="tel" for phone numbers
              placeholder="Phone Number"
              className={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {status === 'loading' && (
            <p className="text-center text-cyan-600 font-medium">Registering...</p>
          )}
          {status === 'success' && (
            <p className="text-center text-green-600 font-medium">Registration successful! Redirecting to home...</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600 font-medium">Registration failed. Please try again.</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Complete Registration'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full p-3 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold hover:bg-gray-300 transition-all shadow-lg mt-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
