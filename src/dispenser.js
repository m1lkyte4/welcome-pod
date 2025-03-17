import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './services/api';
import './dispenser.css';
import hotelLogo from './assets/hotel-logo.jpg'; // Import your hotel logo
import checkmark from './assets/checkmark.webp'; // Import your checkmark image


const Dispenser = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result || []); // Fallback to empty array if `result` is undefined
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setData([]); // Set to empty array on error
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // You can add an optional delay before navigating
    setTimeout(() => {
      navigate('/');  // reroute to homepage screen 
    }, 5000); // reroute-ing to homepage in 5 seconds.
  }, [navigate]);

  return (
    <div className="dispenser-container">
      <img src={hotelLogo} alt="Hilton Hotel Logo" className="hotel-logo" />
      <img src={checkmark} alt="Checkmark" className="checkmark" />
      <h1>Card Dispensed.</h1>
      <p>We hope you have a wonderful stay.</p>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dispenser;
