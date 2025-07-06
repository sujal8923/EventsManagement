import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon, PhoneIcon, MagnifyingGlassIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

function Navbar({ handleLogout, userRole, searchTerm, setSearchTerm }) { // Ensure all props are destructured here
  const navigate = useNavigate();
  const navItemClass = "flex items-center space-x-2 p-2 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer text-gray-700 hover:text-cyan-700";
  const iconClass = "w-5 h-5";

  const isSearchBarPresent = userRole === 'user';

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-b-3xl fixed top-0 left-0 right-0 z-50">
      {/* Logo/Name */}
      <div className="text-2xl font-bold text-cyan-700 mb-4 md:mb-0 md:mr-8">
        EventFlow
      </div>

      {/* Group for Navigation Links and Search/Logout */}
      <div className="flex flex-col md:flex-row items-center flex-grow justify-center">

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:flex-row md:space-x-6 space-y-2 md:space-y-0 mb-4 md:mb-0">
          <button className={navItemClass} onClick={() => { navigate('/home'); setSearchTerm(''); }}>
            <HomeIcon className={iconClass} />
            <span>Home</span>
          </button>
          <button className={navItemClass} onClick={() => { navigate('/about'); setSearchTerm(''); }}>
            <InformationCircleIcon className={iconClass} />
            <span>About Us</span>
          </button>
          <button className={navItemClass} onClick={() => { navigate('/contact'); setSearchTerm(''); }}>
            <PhoneIcon className={iconClass} />
            <span>Contact Us</span>
          </button>
          {userRole === 'superadmin' && (
            <button className={navItemClass} onClick={() => { navigate('/superadmin'); setSearchTerm(''); }}>
              <span>Superadmin Dashboard</span>
            </button>
          )}
          {userRole === 'admin' && (
            <button className={navItemClass} onClick={() => { navigate('/admin'); setSearchTerm(''); }}>
              <span>Admin Dashboard</span>
            </button>
          )}
        </div>

        {!isSearchBarPresent && (
          <div className="md:w-40 lg:w-60 xl:w-80">
          </div>
        )}

        {/* Search Bar and Logout */}
        <div className="flex items-center space-x-4 md:ml-auto">
          {isSearchBarPresent && (
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 p-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md transition-all w-40 md:w-auto"
                value={searchTerm}
                onChange={(e) => {
                  // Ensure setSearchTerm is a function before calling it
                  if (typeof setSearchTerm === 'function') {
                    setSearchTerm(e.target.value);
                    console.log('Search Term Updated:', e.target.value); // Debugging log
                  } else {
                    console.error('setSearchTerm is not a function in Navbar.jsx');
                  }
                }}
              />
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
