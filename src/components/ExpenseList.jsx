import React from "react";

function ExpenseList({ expenses, setExpenses }) {
  const handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <div className="transaction-list card">
      <h2>Transactions</h2>
      {expenses.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <ul className="transaction-items">
          {expenses.map((item) => (
            <li key={item.id} className={`transaction-item ${item.type} ${item.category}`}>
              <div className="transaction-info">
                <strong>{item.title}</strong> ({item.category})
              </div>
              <div className="transaction-amount">
                {item.type === "income" ? "+" : "-"}₹{item.price}
              </div>
              <div className="transaction-date">{item.date}</div>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
