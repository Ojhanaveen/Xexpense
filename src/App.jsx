import React, { useState, useEffect } from "react";
import WalletBalance from "./components/WalletBalance";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";

function App() {
  const [balance, setBalance] = useState(
    Number(localStorage.getItem("balance")) || 5000
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  // Persist data
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  return (
    <div id="root">
      <h1>Expense Tracker</h1>
      <div className="card">
        <WalletBalance balance={balance} />
      </div>
      <div className="card">
        <ExpenseForm 
          balance={balance} 
          setBalance={setBalance} 
          expenses={expenses} 
          setExpenses={setExpenses} 
        />
      </div>
      <div className="card">
        <ExpenseList 
          expenses={expenses} 
          setExpenses={setExpenses} 
        />
      </div>
      <div className="card">
        <ExpenseSummary expenses={expenses} />
      </div>
      <div className="card">
        <ExpenseTrends expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
  