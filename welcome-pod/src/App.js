import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import LoginPage from './loginPage';
import CustomerDetailsPage from './CustomerDetailsPage';
import CheckInMethodPage from './checkinmethod';
import LoadingPage from './loading';
import Loading2 from './loading2';
import Dispenser from './dispenser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check-in-method" element={<CheckInMethodPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path="/customer-details" element={<CustomerDetailsPage />} />
        <Route path="/loading2" element={<Loading2 />} />
        <Route path="/dispenser" element={<Dispenser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
