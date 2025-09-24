import React, { useState } from "react";

function ExpenseForm({ balance, setBalance, expenses, setExpenses }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, category, date } = formData;
    if (!title || !price || !category || !date) {
      alert("Please fill in all fields");
      return;
    }
    const amount = Number(price);
    if (amount > balance) {
      alert("Insufficient balance!");
      return;
    }
    const newExpense = { ...formData, id: Date.now(), type: "expense" };
    setExpenses([...expenses, newExpense]);
    setBalance(balance - amount);
    setFormData({ title: "", price: "", category: "", date: "" });
  };

  return (
    <div className="card">
      <button type="button" onClick={() => document.getElementById("expense-form").classList.toggle("hidden")}>+ Add Expense</button>
      <form id="expense-form" className="hidden" onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Expense Title" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Expense Amount" />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
