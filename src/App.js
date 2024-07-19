import './App.css';
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';


function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (searchParams) => {
    setResults(searchParams);
  };

  return (
    <div className="App">
      <h1>Smart Stop</h1>
      <SearchForm onSearch={handleSearch} />
      <ResultsList results={results} />
    </div>
  );
}

export default App;
