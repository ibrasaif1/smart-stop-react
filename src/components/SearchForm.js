import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [origin, setOrigin] = useState('');
  const [stop, setStop] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.18.111:3001/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origin, stop, destination }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately in UI
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origin"
        required
      />
      <input
        type="text"
        value={stop}
        onChange={(e) => setStop(e.target.value)}
        placeholder="Stop (Brand)"
        required
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;