import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function RegistrationForm({ handleLogout,userId }) {
  const navigate = useNavigate();
  const { id } = useParams();
console.log(userId)


  const [formData, setFormData] = useState({
    userId:userId,
    name: '',
    email: '',
    phone: '',
    college: '',
  });
console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = () => {
    const payload = {
    ...formData,
  };
    axios
      .post(`http://localhost:8080/user/register/${id}`,payload, {
        
      })
      .then((response) => {
        alert('Registration successful!');
        console.log("userregister", response.data);
        navigate('/home');
      })
      .catch((err) => {
        console.error('Error during registration:', err);
        alert('Registration failed. Please try again.');
      });
  };

  const inputStyle =
    'w-full pl-10 p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all';

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} />
      <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-xl">
        <h1 className="text-4xl font-bold text-cyan-700 mb-4 text-center">Register for Dummy Event</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Please fill out the form below to register for the event.
        </p>

        <form className="space-y-6">
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Name"
              className={inputStyle}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className={inputStyle}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              className={inputStyle}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="College Name"
              className={inputStyle}
              name="college"
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            onClick={handleSubmit}
          >
            Complete Registration
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
