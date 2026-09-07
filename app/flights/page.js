"use client";

import { useState } from "react";

export default function FlightsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  function handleSearch(e) {
    e.preventDefault();

    const query = new URLSearchParams({
      from,
      to,
      date,
      passengers,
    });

    window.location.href = `/flights/results?${query.toString()}`;
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>Авіаквитки</h1>
      <p>Знайдіть зручні та вигідні авіаквитки.</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Звідки"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Куди"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          style={inputStyle}
        >
          <option value="1">1 пасажир</option>
          <option value="2">2 пасажири</option>
          <option value="3">3 пасажири</option>
          <option value="4">4 пасажири</option>
          <option value="5">5 пасажирів</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Знайти квитки
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  fontSize: "16px",
  boxSizing: "border-box",
};
