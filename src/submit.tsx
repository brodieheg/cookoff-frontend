import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Submit() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate(); // 🆕 Added for navigation

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name && category) {
      const entryData = { name, category };

      try {
        const response = await fetch("https://brodiehegin.pythonanywhere.com/entries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entryData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit entry");
        }

        console.log("Entry submitted successfully!");
        setName("");
        setCategory("");
      } catch (error) {
        console.error("Error submitting entry:", error);
      }
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div>
      <h1>Submit Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="meat">Meat</option>
            <option value="non-meat">Non-Meat</option>
            <option value="accompaniment">Accompaniment</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          borderRadius: '6px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}