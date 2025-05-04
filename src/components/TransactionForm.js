import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm({ fetchTransactions }) {
  const [transactionType, setTransactionType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://budget-track-19hu.onrender.com/api/transactions/',
        {
          transaction_type: transactionType,
          category: { name: category },
          amount,
          date,
          description,
        },
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        }
      );
      setMessage({ type: 'success', text: 'Transaction added successfully!' });
      fetchTransactions();
      setTransactionType('income');
      setCategory('');
      setAmount('');
      setDate('');
      setDescription('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add transaction. Please try again.' });
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
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;