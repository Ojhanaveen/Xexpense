import React, { useState } from "react";

function WalletBalance({ balance }) {
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  return (
    <div className="card">
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <button type="button" onClick={() => setShowIncomeForm(true)}>+ Add Income</button>
      {showIncomeForm && (
        <form>
          <input type="number" placeholder="Income Amount" name="income" />
          <button type="submit">Add Balance</button>
        </form>
      )}
    </div>
  );
}

export default WalletBalance;
