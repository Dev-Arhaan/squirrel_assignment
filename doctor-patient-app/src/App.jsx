import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/common/Navbar';
import DoctorPage from './pages/DoctorPage';
import PatientSearchPage from './pages/PatientSearchPage';
import Navbar from './components/common/NavBar';

// A simple component for the home page
function HomePage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">Welcome to Doc-Finder</h1>
      <p className="mt-4 text-lg text-gray-600">
        The easiest way to find doctors near you or list your clinic.
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