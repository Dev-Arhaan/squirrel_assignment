import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  // This style will be applied to the active NavLink
  const activeLinkStyle = {
    color: '#4f46e5', // indigo-600
    textDecoration: 'underline',
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-indigo-600">
              Doc-Finder
            </NavLink>
          </div>
          <div className="flex items-baseline space-x-4">
            <NavLink
              to="/find-doctors"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Find a Doctor
            </NavLink>
            <NavLink
              to="/doctor-register"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              For Doctors
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;