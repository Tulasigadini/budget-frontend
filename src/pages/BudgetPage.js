import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import BudgetChart from '../charts/BudgetChart';

function BudgetPage() {
  const [budget, setBudget] = useState({ amount: 0, month: new Date().toISOString().slice(0, 7) });
  const [expenses, setExpenses] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const fetchBudget = async (month = selectedMonth) => {
    try {
      // Fetch expenses for the selected month
      const summaryResponse = await axios.get('https://budget-track-19hu.onrender.com/api/summary/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setExpenses(summaryResponse.data.total_expenses || 0);

      // Fetch budget for the selected month
      const budgetResponse = await axios.get('https://budget-track-19hu.onrender.com/api/budgets/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        params: { month },
      });
      const budgetData = budgetResponse.data.find(b => b.month === month) || { amount: 0, month };
      setBudget(budgetData);
    } catch (error) {
      console.error('Error fetching budget', error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    fetchBudget(newMonth);
  };

  return (
    <div className="container">
      <h2>Budget Management</h2>
      <div className="form-container">
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ marginBottom: '15px' }}
        />
      </div>
      <BudgetForm fetchBudget={() => fetchBudget(selectedMonth)} />
      <div className="chart-container">
        <BudgetChart budget={budget.amount || 0} expenses={expenses} />
      </div>
      <div className="summary">
        <p>Budget: ${budget.amount || 0}</p>
        <p>Expenses: ${expenses}</p>
        <p>Remaining: ${(budget.amount || 0) - expenses}</p>
      </div>
    </div>
  );
}

export default BudgetPage;