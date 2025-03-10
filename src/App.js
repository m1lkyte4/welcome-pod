import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import LoginPage from './loginPage';
import CustomerDetailsPage from './CustomerDetailsPage';
import CallStaff from './CallStaff';
import CheckInMethodPage from './checkinmethod';
import LoadingPage from './loading';
import Loading2 from './loading2';
import Dispenser from './dispenser';
import ErrorPage from './errorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check-in-method" element={<CheckInMethodPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path="/customer-details" element={<CustomerDetailsPage />} />
        <Route path="/call-staff" element={<CallStaff />} />
        <Route path="/loading2" element={<Loading2 />} />
        <Route path="/dispenser" element={<Dispenser />} />
        <Route path="/error" element={<ErrorPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
