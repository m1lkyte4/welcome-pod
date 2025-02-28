import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import LoginPage from './loginPage';
import CustomerDetailsPage from './CustomerDetailsPage';
import CheckInMethodPage from './checkinmethod';
import LoadingPage from './loading';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check-in-method" element={<CheckInMethodPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path="/customer-details" element={<CustomerDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
