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
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleAddIncomeClick = () => {
    setShowIncomeForm(true);
  };

  const handleIncomeSubmit = (amount) => {
    const incomeEntry = {
      id: Date.now(),
      title: "Income",
      price: amount,
      category: "income",
      date: new Date().toISOString().split("T")[0],
      type: "income",
    };
    setBalance(balance + Number(amount));
    setExpenses([...expenses, incomeEntry]);
    setShowIncomeForm(false);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <WalletBalance balance={balance} onAddIncome={handleAddIncomeClick} />
      {showIncomeForm && (
        <ExpenseForm
          balance={balance}
          setBalance={setBalance}
          expenses={expenses}
          setExpenses={setExpenses}
          isIncome={true}
          onSubmitIncome={handleIncomeSubmit}
        />
      )}
      <ExpenseForm
        balance={balance}
        setBalance={setBalance}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      <ExpenseSummary expenses={expenses} />
      <ExpenseTrends expenses={expenses} />
    </div>
  );
}

export default App;
