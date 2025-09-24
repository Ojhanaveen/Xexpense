import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function ExpenseSummary({ expenses }) {
  const summary = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.price);
    return acc;
  }, {});
  const data = Object.entries(summary).map(([name, value]) => ({ name, value }));
  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#AA336A"];

  return (
    <div className="card">
      <h2>Expense Summary</h2>
      {data.length === 0 ? <p>No data to show</p> : (
        <PieChart width={300} height={200}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
            {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}

export default ExpenseSummary;
