import React, { useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn, setLogin, setUserId }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loginForm, setLoginForm] = useState({
    email: '',
    passwords: ''
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const navi = useNavigate();

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
      const { email, passwords } = loginForm;
      if (!email || !passwords) {
        setErrorMsg('Please fill all fields.');
        return;
      }

      const payload = { email, passwords };
      axios.post('http://localhost:8080/login', payload)
        .then((response) => {
          const { token, role, userId } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', role);
          setUserId(userId);
          setLoggedIn(true);
          setLogin(true);

          if (role === 'USER') {
            navi('/');
          } else if (role === 'ADMIN') {
            navi('/admin');
          } else {
            navi('/superadmin');
          }

          alert('Login successful');
          setLoginForm({ email: '', passwords: '' });
        })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 403) {
              setErrorMsg("Your account is deactivated. Please contact admin.");
            } else if (status === 404) {
              setErrorMsg("User not found.");
            } else if (status === 401) {
              setErrorMsg("Invalid email or password.");
            } else {
              setErrorMsg("Something went wrong. Try again.");
            }
          } else {
            setErrorMsg("Server not responding. Check your connection.");
          }
        });
    } else {
      const { email, userName, password, confirmPassword } = signupForm;

      if (!email || !userName || !password || password.length < 6 || password !== confirmPassword) {
        setErrorMsg('Please fill all fields correctly.');
        return;
      }

      const payload = { email, userName, password };
      axios.post('http://localhost:8080/register', payload)
        .then(() => {
          alert('Signup successful');
          setIsLoginMode(true);
          setSignupForm({
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
          });
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setErrorMsg(error.response.data.message || 'Signup failed. Please try again.');
          } else {
            setErrorMsg('Signup failed. Please try again.');
          }
        });
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-tr from-sky-100 to-indigo-100 px-4">
      <div className="w-full sm:max-w-md bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200 animate-fade-in mx-4">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </h2>
        </div>

        {/* Toggle */}
        <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 z-10 text-lg font-medium transition-all hover:font-semibold ${isLoginMode ? 'text-white' : 'text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 z-10 text-lg font-medium transition-all hover:font-semibold ${!isLoginMode ? 'text-white' : 'text-gray-700'}`}
          >
            Sign Up
          </button>
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 transition-all duration-300 ease-in-out ${isLoginMode ? 'left-0' : 'left-1/2'}`}
          ></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={isLoginMode ? loginForm.email : signupForm.email}
              onChange={(e) => handleChange(e, isLoginMode ? 'login' : 'signup')}
              className={inputStyle}
              required
            />
          </div>

          {!isLoginMode && (
            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={signupForm.userName}
                onChange={(e) => handleChange(e, 'signup')}
                className={inputStyle}
                required
              />
            </div>
          )}

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name={isLoginMode ? 'passwords' : 'password'}
              placeholder="Password"
              value={isLoginMode ? loginForm.passwords : signupForm.password}
              onChange={(e) => handleChange(e, isLoginMode ? 'login' : 'signup')}
              className={inputStyle}
              required
            />
          </div>

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
            <p className="text-red-500 text-sm font-medium text-center">{errorMsg}</p>
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
    </div>
  );
}

export default Login;
