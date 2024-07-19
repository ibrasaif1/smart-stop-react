import React, { useState } from 'react';
import { FaHome, FaStore, FaMapMarkerAlt } from 'react-icons/fa';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin"
          className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="relative">
        <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={stop}
          onChange={(e) => setStop(e.target.value)}
          placeholder="Stop (Brand)"
          className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Search
      </button>
    </form>
  );
}

export default SearchForm;