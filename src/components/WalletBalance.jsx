import React from "react";

function WalletBalance({ balance, onAddIncome }) {
  return (
    <div className="card">
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <button type="button" onClick={onAddIncome}>
        + Add Income
      </button>
    </div>
  );
}

export default WalletBalance;
