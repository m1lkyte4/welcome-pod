import React, { useState } from 'react';
import './App.css';

function App() {
  // State for customer input
  const [name, setName] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle the check-in logic here
    alert(`Checking in ${name} with booking number ${bookingNumber}`);
  };

  return (
    <div className="App">
      <h1>Welcome to the Hotel Hilton</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <br />
        <label>
          Booking Number:
          <input
            type="text"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            placeholder="Enter your booking number"
          />
        </label>
        <br />
        <button type="submit">Check-in</button>
      </form>
    </div>
  );
}

export default App;
