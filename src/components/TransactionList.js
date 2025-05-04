import React, { useState } from 'react';
import axios from '../axios'; // Use the configured instance

function TransactionList({ transactions, fetchTransactions }) {
  const [message, setMessage] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    transaction_type: '',
    category: '',
    amount: '',
    date: '',
    description: '',
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setMessage({ type: 'success', text: 'Transaction deleted successfully!' });
      fetchTransactions();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete transaction. Please try again.' });
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction.id);
    setEditForm({
      transaction_type: transaction.transaction_type,
      category: transaction.category.name,
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/transactions/${editingTransaction}/`,
        {
          transaction_type: editForm.transaction_type,
          category: { name: editForm.category },
          amount: editForm.amount,
          date: editForm.date,
          description: editForm.description,
        },
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        }
      );
      setMessage({ type: 'success', text: 'Transaction updated successfully!' });
      setEditingTransaction(null);
      fetchTransactions();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update transaction. Please try again.' });
    }
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setEditForm({
      transaction_type: '',
      category: '',
      amount: '',
      date: '',
      description: '',
    });
  };

  return (
    <div>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              {editingTransaction === transaction.id ? (
                <>
                  <td>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={editForm.transaction_type}
                      onChange={(e) => setEditForm({ ...editForm, transaction_type: e.target.value })}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{transaction.date}</td>
                  <td>{transaction.category.name}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.transaction_type}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(transaction)}>
                      ✏️
                    </button>
                    <button className="delete" onClick={() => handleDelete(transaction.id)}>
                      🗑️
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;