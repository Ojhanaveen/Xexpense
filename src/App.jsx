import React, { useState, useEffect } from "react";
import WalletBalance from "./components/WalletBalance";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [balance, setBalance] = useState(
    Number(localStorage.getItem("balance")) || 5000
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  // Persist data
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  // Add transaction (income or expense)
  const addTransaction = (transaction, isIncome = false) => {
    if (isIncome) {
      setBalance((prev) => prev + Number(transaction.price));
    } else {
      if (transaction.price > balance) {
        alert("Insufficient balance!");
        return;
      }
      setExpenses((prev) => [...prev, transaction]);
      setBalance((prev) => prev - transaction.price);
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      {/* Cards container */}
      <div className="cards-container">
        <div className="card">
          <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
          <button type="button" onClick={() => setShowIncomeModal(true)}>
            + Add Income
          </button>
        </div>
        <div className="card">
          <h2>
            Expenses: $
            {expenses.reduce((acc, e) => acc + Number(e.price), 0).toFixed(2)}
          </h2>
          <button type="button" onClick={() => setShowExpenseModal(true)}>
            + Add Expense
          </button>
        </div>
      </div>

      {/* Expense List */}
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />

      {/* Charts */}
      <ExpenseSummary expenses={expenses} />
      <ExpenseTrends expenses={expenses} />

      {/* Income Modal */}
      <Modal
        isOpen={showIncomeModal}
        onRequestClose={() => setShowIncomeModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <ExpenseForm
          isIncome={true}
          addTransaction={addTransaction}
          closeModal={() => setShowIncomeModal(false)}
        />
      </Modal>

      {/* Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        onRequestClose={() => setShowExpenseModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <ExpenseForm
          isIncome={false}
          addTransaction={addTransaction}
          closeModal={() => setShowExpenseModal(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
