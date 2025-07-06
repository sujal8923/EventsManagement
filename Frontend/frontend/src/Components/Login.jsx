import React, { useState } from 'react';
import {
  UserIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const inputStyle =
    'w-full pl-10 p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all';

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginForm(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isLoginMode) {
      const { username, password } = loginForm;
      if (!username || !password) {
        setErrorMsg('Please fill all fields.');
        return;
      }

      // 💥 Only send username & password
      const payload = { username, password };
      console.log('Login Payload:', payload);
      // e.g. fetch('/api/login', { method: 'POST', body: JSON.stringify(payload) })
    } else {
      const { username, password, confirmPassword } = signupForm;

      // 🔒 Frontend password match + length check
      if (!username || !password || password.length < 6 || password !== confirmPassword) {
        setErrorMsg('Please fill all fields correctly.');
        return;
      }

      // 💥 Strip out confirmPassword before sending
      const payload = { username, password };
      console.log('Signup Payload:', payload);
      // e.g. fetch('/api/signup', { method: 'POST', body: JSON.stringify(payload) })
    }
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
          onClick={() => setIsLoginMode(true)}
          className={`w-1/2 z-10 text-lg font-medium transition-all hover:font-semibold ${
            isLoginMode ? 'text-white' : 'text-gray-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginMode(false)}
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
        <div className="relative">
          <UserIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={isLoginMode ? loginForm.username : signupForm.username}
            onChange={(e) => handleChange(e, isLoginMode ? 'login' : 'signup')}
            className={inputStyle}
            required
          />
        </div>

        <div className="relative">
          <LockClosedIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={isLoginMode ? loginForm.password : signupForm.password}
            onChange={(e) => handleChange(e, isLoginMode ? 'login' : 'signup')}
            className={inputStyle}
            required
          />
        </div>

        {/* Frontend-only confirm password */}
        {!isLoginMode && (
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              onChange={(e) => handleChange(e, 'signup')}
              className={inputStyle}
              required
            />
          </div>
        )}

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium text-center">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
        >
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
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
