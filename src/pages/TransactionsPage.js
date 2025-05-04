import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ category: '', date: '', amount: '' });

  const fetchTransactions = async () => {
    try {
      const params = { page, ...filter };
      const response = await axios.get('https://budget-track-19hu.onrender.com/api/transactions/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        params,
      });
      setTransactions(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 records per page
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, filter]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <h2>Transactions</h2>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <div className="form-container">
        <h3>Filter Transactions</h3>
        <input
          type="text"
          placeholder="Category"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={filter.amount}
          onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
        />
      </div>
      <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
      <div className="pagination">
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default TransactionsPage;