import React, { useState } from "react";

function ExpenseForm({ balance, setBalance, expenses, setExpenses, isIncome, onSubmitIncome }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
    type: isIncome ? "income" : "expense",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title && !isIncome) {
      alert("Please enter a title");
      return;
    }
    if (!formData.price) {
      alert("Please enter an amount");
      return;
    }

    const amount = Number(formData.price);

    if (!isIncome && amount > balance) {
      alert("Insufficient balance!");
      return;
    }

    const entry = {
      id: Date.now(),
      title: isIncome ? "Income" : formData.title,
      price: amount,
      category: isIncome ? "income" : formData.category,
      date: formData.date || new Date().toISOString().split("T")[0],
      type: isIncome ? "income" : "expense",
    };

    if (isIncome && onSubmitIncome) {
      onSubmitIncome(amount);
    } else {
      setExpenses([...expenses, entry]);
      setBalance(balance - amount);
    }

    setFormData({ title: "", price: "", category: "", date: "", type: isIncome ? "income" : "expense" });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {!isIncome && <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />}
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Amount" />
      {!isIncome && (
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
      )}
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <button type="submit">{isIncome ? "Add Income" : "Add Expense"}</button>
    </form>
  );
}

export default ExpenseForm;
