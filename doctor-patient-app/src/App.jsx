import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorPage from './pages/DoctorPage';
import PatientSearchPage from './pages/PatientSearchPage';
import Navbar from './components/common/NavBar';

function HomePage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">Welcome to Doc-Finder</h1>
      <p className="mt-4 text-xl text-gray-600">
        Hi, this is my submission for the doctor-patient platform. <br/> 
        I've built the frontend using React, Vite, and Tailwind CSS, <br/>
        integrating with Google Maps and an Express backend. <br />
        <span className="text-blue-600 cursor-pointer">
          Let's watch Doctor Registration Flow Demo
          </span>
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-doctors" element={<PatientSearchPage />} />
          <Route path="/doctor-register" element={<DoctorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;