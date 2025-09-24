import React from "react";

function WalletBalance({ balance }) {
  return (
    <div>
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <button type="button">+ Add Income</button>
    </div>
  );
}

export default WalletBalance;
