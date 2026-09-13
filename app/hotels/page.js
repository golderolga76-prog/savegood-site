"use client";

import { useState } from "react";

export default function HotelsPage() {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSearch(e) {
    e.preventDefault();

    const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
      city
    )}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${guests}`;

    window.open(url, "_blank", "noopener,noreferrer");
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
      <h1>Готелі</h1>
      <p>Знайдіть зручний готель за містом і датами.</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Місто"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          style={inputStyle}
        >
          <option value="1">1 гість</option>
          <option value="2">2 гості</option>
          <option value="3">3 гості</option>
          <option value="4">4 гості</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "14px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Знайти готель
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  fontSize: "16px",
  boxSizing: "border-box",
};
