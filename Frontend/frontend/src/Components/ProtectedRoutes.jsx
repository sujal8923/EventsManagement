import React from 'react'

function ProtectedRoutes({allowedRoles, children}) {
    const userRole = localStorage.getItem('userRole');
    if(!userRole || !allowedRoles.includes(userRole)) {
        return (
            <div className="grid min-h-screen place-items-center text-center text-gray-700">
                <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
                <p className="mb-4">You do not have permission to access this page.</p>
                <a
                    href="/"
                    className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                    Go to Login
                </a>
            </div>
        );
    }
    
  return children;
}

export default ProtectedRoutes
