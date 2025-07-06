import React, { useState } from 'react';
// Removed: import { useNavigate } from 'react-router-dom'; // This is handled by App.jsx

import {
  UserIcon,
  EnvelopeIcon, // Still using EnvelopeIcon for the input, but it represents username now
  LockClosedIcon,
} from '@heroicons/react/24/outline';

function Login({ onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  // Confirm Password state is only relevant for Signup
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const inputStyle =
    'w-full pl-10 p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (isLoginMode) {
      // --- Login Validation ---
      if (!username || !password) { // Changed from email to username
        setErrorMsg('Username and password are required.');
        setLoading(false);
        return;
      }
    } else {
      // --- Sign Up Validation ---
      if (!username || !password || !confirmPassword) { // Changed from name/email to username
        setErrorMsg('Please fill all fields for sign up.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        setLoading(false);
        return;
      }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLoginMode) {
      // --- Login Logic ---
      // Changed email to username in hardcoded checks
      if (username === 'superadmin@example.com' && password === 'superadmin123') {
        onLoginSuccess('superadmin');
      } else if (username === 'admin@example.com' && password === 'admin123') {
        onLoginSuccess('admin');
      } else {
        onLoginSuccess('user');
      }
    } else {
      // --- Sign Up Logic ---
      console.log('Sign Up Data:', { username, password }); // Changed name/email to username
      onLoginSuccess('user'); // Auto-login as user after successful signup
      setErrorMsg('Sign up successful!'); // Optional feedback
    }
    setLoading(false);
  };

  return (
    <div className="w-full sm:max-w-md bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200 animate-fade-in mx-4">
      {/* Header */}
      <div className="flex justify-center mb-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>
      </div>

      {/* Toggle */}
      <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
        <button
          onClick={() => {
            setIsLoginMode(true);
            setErrorMsg('');
            setUsername(''); // Clear username
            setPassword('');
            setConfirmPassword('');
          }}
          className={`w-1/2 z-10 text-lg font-medium transition-all hover:font-semibold ${
            isLoginMode ? 'text-white' : 'text-gray-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => {
            setIsLoginMode(false);
            setErrorMsg('');
            setUsername(''); // Clear username
            setPassword('');
            setConfirmPassword('');
          }}
          className={`w-1/2 z-10 text-lg font-medium transition-all hover:font-semibold ${
            !isLoginMode ? 'text-white' : 'text-gray-700'
          }`}
        >
          Sign Up
        </button>
        <div
          className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 transition-all duration-300 ease-in-out ${
            isLoginMode ? 'left-0' : 'left-1/2'
          }`}
        ></div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Username field - for both Login and Sign Up */}
        <div className="relative">
          <UserIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" /> {/* Using UserIcon for username */}
          <input
            type="text" // Changed type to text for generic username
            placeholder="Username" // Changed placeholder
            className={inputStyle}
            value={username} // Changed from email to username
            onChange={(e) => setUsername(e.target.value)} // Changed from setEmail to setUsername
            required
          />
        </div>

        {/* Password field - for both Login and Sign Up */}
        <div className="relative">
          <LockClosedIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password field - only for Sign Up */}
        {!isLoginMode && (
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required // Required for signup
            />
          </div>
        )}

        {/* Forgot password link - only for Login */}
        {isLoginMode && (
          <div className="text-right">
            <p className="text-cyan-600 text-sm hover:underline cursor-pointer">
              Forgot password?
            </p>
          </div>
        )}

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium text-center">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            isLoginMode ? 'Login' : 'Sign Up'
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg('');
              setUsername(''); // Clear username
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-cyan-600 ml-1 hover:underline font-medium"
          >
            {isLoginMode ? 'Sign Up now' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
