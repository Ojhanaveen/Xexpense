import React from "react";

function ExpenseSummary({ expenses }) {
  // simple category summary
  const summary = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.price);
    return acc;
  }, {});

  return (
    <div>
      <h2>Expense Summary</h2>
      {Object.keys(summary).length === 0 ? (
        <p>No data to show</p>
      ) : (
        <ul>
          {Object.entries(summary).map(([category, total]) => (
            <li key={category}>
              {category}: ${total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseSummary;
