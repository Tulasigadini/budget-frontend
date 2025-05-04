import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryChart from '../charts/SummaryChart';

function Dashboard() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('https://budget-track-19hu.onrender.com/api/summary/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        });
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary', error);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="container">
      <h2>Financial Summary</h2>
      <div className="chart-container">
        <SummaryChart summary={summary} />
      </div>
      <div>
        <p>Total Income: ${summary.total_income || 0}</p>
        <p>Total Expenses: ${summary.total_expenses || 0}</p>
        <p>Balance: ${summary.balance || 0}</p>
        <p>Monthly Budget: ${summary.budget || 0}</p>
      </div>
    </div>
  );
}

export default Dashboard;