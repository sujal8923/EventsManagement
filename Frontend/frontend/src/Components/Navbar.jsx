import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon, PhoneIcon, MagnifyingGlassIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function Navbar({   searchTerm, setSearchTerm }) { 
  
  const navigate = useNavigate();
  const navItemClass = "flex items-center space-x-2 p-2 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer text-gray-700 hover:text-cyan-700";
  const iconClass = "w-5 h-5";


  let logs = ()=>{
    const res = axios.get('http://localhost:8080/logout');
    res.then((response)=>{
        alert('Logout successful');
        localStorage.setItem('loggedIn', 'false');

  
        navigate('/');
    })
  }
  let role = localStorage.getItem('userRole');

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-b-3xl fixed top-0 left-0 right-0 z-50">
      
      <div className="text-2xl font-bold text-cyan-700 mb-4 md:mb-0 md:mr-8">
        EventFlow
      </div>
      
      <div className="flex flex-col md:flex-row items-center flex-grow justify-center">

        
        <div className="flex flex-wrap justify-center md:flex-row md:space-x-6 space-y-2 md:space-y-0 mb-4 md:mb-0">
          {
            role != null && role === 'USER'? <button className={navItemClass} onClick={() => { navigate('/home');  }}>
            <HomeIcon className={iconClass} />
            <span>Home</span>
          </button>:""
          }
          <button className={navItemClass} onClick={() => { navigate('/about');  }}>
            <InformationCircleIcon className={iconClass} />
            <span>About Us</span>
          </button>
          <button className={navItemClass} onClick={() => { navigate('/contact');  }}>
            <PhoneIcon className={iconClass} />
            <span>Contact Us</span>
          </button>
          
          {
            role != null && role === 'SUPER_ADMIN'? <button className={navItemClass} onClick={() => { navigate('/superadmin');  }}>
              <span>Superadmin Dashboard</span>
            </button>:""
          }
            
         {
           role != null &&   role == 'ADMIN' ? <button className={navItemClass} onClick={() => { navigate('/admin');  }}>
              <span>Admin Dashboard</span>
            </button>:""
         }
            
          
        </div>

    
          <div className="md:w-40 lg:w-60 xl:w-80">
          </div>
        

      
        <div className="flex items-center space-x-4 md:ml-auto">
          
            {/* <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 p-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md transition-all w-40 md:w-auto"
                value={searchTerm}
                onChange={(e) => {
                
                  if (typeof setSearchTerm === 'function') {
                    setSearchTerm(e.target.value);
                    console.log('Search Term Updated:', e.target.value); 
                  } else {
                    console.error('setSearchTerm is not a function in Navbar.jsx');
                  }
                }}
              />
            </div> */}
          {/* )} */}
          <button
            onClick={logs}
            className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            <span >Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
