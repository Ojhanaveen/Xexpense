import React from "react";

function ExpenseTrends({ expenses }) {
  // Group expenses by category for trend
  const trends = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.price);
    return acc;
  }, {});

  return (
    <div>
      <h2>Expense Trends</h2>
      {Object.keys(trends).length === 0 ? (
        <p>No trends available</p>
      ) : (
        <ul>
          {Object.entries(trends).map(([category, total]) => (
            <li key={category}>
              {category}: ${total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseTrends;
