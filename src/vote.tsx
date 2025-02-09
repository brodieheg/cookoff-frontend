import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Entry {
  id: number;
  category: string;
  name: string;
  namevotes: number;
  votes: number;
}

export default function Vote() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedMeat, setSelectedMeat] = useState<number | string>("");
  const [selectedNonMeat, setSelectedNonMeat] = useState<number | string>("");
  const [selectedAccompaniment, setSelectedAccompaniment] = useState<number | string>("");
  const [selectedDessert, setSelectedDessert] = useState<number | string>("");
  const [selectedName, setSelectedName] = useState<number | string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/entries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Entry[] = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categories = {
    meat: entries.filter(entry => entry.category === "meat"),
    nonMeat: entries.filter(entry => entry.category === "non-meat"),
    accompaniment: entries.filter(entry => entry.category === "accompaniment"),
    dessert: entries.filter(entry => entry.category === "dessert"),
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const voteData = {
      meat: selectedMeat,
      "non-meat": selectedNonMeat,
      accompaniment: selectedAccompaniment,
      dessert: selectedDessert,
      name: selectedName,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/vote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit vote");
      }

      console.log("Vote submitted successfully!");
      navigate('/')
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
      <h1>Entries</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="meat-vote">Meat Vote:</label>
          <select
            id="meat-vote"
            value={selectedMeat}
            onChange={(e) => setSelectedMeat(Number(e.target.value))}
          >
            <option value="">None</option>
            {categories.meat.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="non-meat-vote">Non-Meat Vote:</label>
          <select
            id="non-meat-vote"
            value={selectedNonMeat}
            onChange={(e) => setSelectedNonMeat(Number(e.target.value))}
          >
            <option value="">None</option>
            {categories.nonMeat.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="accompaniment-vote">Accompaniment:</label>
          <select
            id="accompaniment-vote"
            value={selectedAccompaniment}
            onChange={(e) => setSelectedAccompaniment(Number(e.target.value))}
          >
            <option value="">None</option>
            {categories.accompaniment.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="dessert-vote">Dessert:</label>
          <select
            id="dessert-vote"
            value={selectedDessert}
            onChange={(e) => setSelectedDessert(Number(e.target.value))}
          >
            <option value="">None</option>
            {categories.dessert.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="name-vote">Name:</label>
          <select
            id="name-vote"
            value={selectedName}
            onChange={(e) => setSelectedName(Number(e.target.value))}
          >
            <option value="">None</option>
            {entries.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
}
