import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logs = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.setItem('loggedIn', 'false');
    alert('Logout successful');
    navigate('/login');
  };

  const role = localStorage.getItem('userRole');

  // Helper to apply active class
 const getNavItemClass = (path) =>
  `flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer ${
    location.pathname === path
      ? 'text-red-600 font-semibold'
      : 'text-gray-700 hover:text-red-600'
  }`;


  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-b-3xl fixed top-0 left-0 right-0 z-50">
      <div className="text-2xl font-bold text-cyan-700 mb-4 md:mb-0 md:mr-8">
        EventFlow
      </div>

      <div className="flex flex-col md:flex-row items-center flex-grow justify-center">
        <div className="flex flex-wrap justify-center md:flex-row md:space-x-6 space-y-2 md:space-y-0 mb-4 md:mb-0">
          {/* Login (when not logged in) */}
          {!role && (
            <button
              className={getNavItemClass('/login')}
              onClick={() => navigate('/login')}
            >
              {/* <HomeIcon className="w-5 h-5" /> */}
              <span>Login</span>
            </button>
          )}

          {/* Home for USER */}
          {/* {role === 'USER' && ( */}
          {
             role == 'USER' || role == null ? <button
              className={getNavItemClass('/')}
              onClick={() => navigate('/')}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </button>:""
          }
            
           {role === 'SUPER_ADMIN' && (
            <button
              className={getNavItemClass('/superadmin')}
              onClick={() => navigate('/superadmin')}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </button>
          )}
          {role === 'ADMIN' && (
            <button
              className={getNavItemClass('/admin')}
              onClick={() => navigate('/admin')}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </button>
          )}

          {/* About Us */}
          <button
            className={getNavItemClass('/about')}
            onClick={() => navigate('/about')}
          >
            <InformationCircleIcon className="w-5 h-5" />
            <span>About Us</span>
          </button>

          {/* Contact Us */}
          {
            role == 'USER' ?  <button
            className={getNavItemClass('/contact')}
            onClick={() => navigate('/contact')}
          >
            <PhoneIcon className="w-5 h-5" />
            <span>Contact Us</span>
          </button>:""
          }
         

          {/* Home for SUPER_ADMIN */}
         

          {/* Home for ADMIN */}
          
        </div>

        {/* Logout button */}
        <div className="flex items-center space-x-4 md:ml-auto">
          {role && (
            <button
              onClick={logs}
              className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
