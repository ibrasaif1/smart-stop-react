import React from 'react';

function ResultsList({ results }) {
  return (
    <div>
      <h2>Results</h2>
      {results.length === 0 ? (
        <p>No results to display.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              Address: {result.address}, Total Time: {result.totalTime} minutes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResultsList;