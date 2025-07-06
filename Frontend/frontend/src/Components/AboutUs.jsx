import React from 'react';
import Navbar from './Navbar';

function AboutUs({ navigateTo, handleLogout }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar navigateTo={navigateTo} handleLogout={handleLogout} />
      <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-cyan-700 mb-6 text-center">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to EventFlow, your premier platform for discovering and managing events! We are dedicated to connecting people with engaging experiences, whether it's a professional conference, a community workshop, or a vibrant festival.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Our mission is to simplify event registration and management for both attendees and organizers. We believe in fostering a community where knowledge, creativity, and connections flourish through well-organized and accessible events.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          EventFlow was founded on the principle of seamless interaction and user-centric design. We continuously strive to enhance our platform, ensuring a smooth and enjoyable experience for everyone involved. Join us in building a world of shared experiences!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
