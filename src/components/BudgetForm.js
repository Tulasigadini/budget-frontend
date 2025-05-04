import React, { useState } from 'react';
import axios from 'axios';

function BudgetForm({ fetchBudget }) {
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://budget-track-19hu.onrender.com/api/budgets/',
        { amount, month },
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        }
      );
      setMessage({ type: 'success', text: 'Budget set successfully!' });
      fetchBudget();
      setAmount('');
      setMonth('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to set budget. Please try again.' });
    }
  };

  return (
    <div className="form-container">
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <button type="submit">Set Budget</button>
      </form>
    </div>
  );
}

export default BudgetForm;