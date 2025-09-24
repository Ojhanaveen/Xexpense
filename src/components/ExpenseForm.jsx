import React, { useState } from "react";

function ExpenseForm({ isIncome = false, addTransaction, closeModal }) {
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

    if (isIncome) {
      if (!price) {
        alert("Please enter an amount");
        return;
      }
      addTransaction({ price: Number(price) }, true);
    } else {
      if (!title || !price || !category || !date) {
        alert("Please fill in all fields");
        return;
      }
      addTransaction(
        { ...formData, price: Number(price), id: Date.now(), type: "expense" },
        false
      );
    }

    setFormData({ title: "", price: "", category: "", date: "" });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {!isIncome && (
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="number"
        name="price"
        placeholder={isIncome ? "Income Amount" : "Expense Amount"}
        value={formData.price}
        onChange={handleChange}
        required
      />

      {!isIncome && (
        <>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
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
            required
          />
        </>
      )}

      <button type="submit">{isIncome ? "Add Balance" : "Add Expense"}</button>
    </form>
  );
}

export default ExpenseForm;
