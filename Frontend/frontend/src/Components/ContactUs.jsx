import React, { useState } from 'react';
import Navbar from './Navbar';
import { UserIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

function ContactUs({ navigateTo, handleLogout }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const inputStyle =
    'w-full pl-10 p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all';
  const textareaStyle =
    'w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all min-h-[120px]';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    if (!name || !email || !subject || !message) {
      setStatus('error');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Contact Form Submission:', { name, email, subject, message });

    const success = Math.random() > 0.2;

    if (success) {
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} />
      <div className="flex-grow container mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl my-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-cyan-700 mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Have questions or feedback? We'd love to hear from you!
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
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Subject"
              className={inputStyle}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Your Message"
              className={textareaStyle}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {status === 'loading' && (
            <p className="text-center text-cyan-600 font-medium">Sending message...</p>
          )}
          {status === 'success' && (
            <p className="text-center text-green-600 font-medium">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600 font-medium">Failed to send message. Please try again.</p>
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
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
