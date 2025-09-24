import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ExpenseTrends({ expenses }) {
  const trends = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.price);
    return acc;
  }, {});
  const data = Object.entries(trends).map(([name, value]) => ({ name, value }));

  return (
    <div className="card">
      <h2>Expense Trends</h2>
      {data.length === 0 ? <p>No trends available</p> : (
        <BarChart width={350} height={200} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
}

export default ExpenseTrends;
