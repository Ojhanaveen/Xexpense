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
    <div>
      <h1>Expense Tracker</h1>
      <WalletBalance balance={balance} />
      <ExpenseForm 
        balance={balance} 
        setBalance={setBalance} 
        expenses={expenses} 
        setExpenses={setExpenses} 
      />
      <ExpenseList 
        expenses={expenses} 
        setExpenses={setExpenses} 
      />
      <ExpenseSummary expenses={expenses} />
      <ExpenseTrends expenses={expenses} />
    </div>
  );
}

export default App;
