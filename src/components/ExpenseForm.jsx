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

    if (!formData.title || !formData.price || !formData.category || !formData.date) {
      alert("Please fill in all fields");
      return;
    }

    if (Number(formData.price) > balance) {
      alert("Insufficient balance!");
      return;
    }

    const newExpense = { ...formData, id: Date.now() };
    setExpenses([...expenses, newExpense]);
    setBalance(balance - Number(formData.price));

    setFormData({ title: "", price: "", category: "", date: "" }); // reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
