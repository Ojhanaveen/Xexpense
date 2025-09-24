import React, { useState } from "react";

function ExpenseForm({ balance, setBalance, expenses, setExpenses }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
    type: "expense", // expense or income
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

    const amount = Number(formData.price);

    // Check balance for expense
    if (formData.type === "expense" && amount > balance) {
      alert("Insufficient balance!");
      return;
    }

    const newEntry = { ...formData, id: Date.now() };
    setExpenses([...expenses, newEntry]);

    if (formData.type === "income") {
      setBalance(balance + amount);
    } else {
      setBalance(balance - amount);
    }

    // Reset form
    setFormData({ title: "", price: "", category: "", date: "", type: "expense" });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder={formData.type === "income" ? "Income Amount" : "Expense Amount"}
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="entertainment">Entertainment</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <button type="submit">
        {formData.type === "income" ? "Add Balance" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
