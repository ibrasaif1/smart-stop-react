import React from 'react';

function ResultsList({ results }) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        {results.length === 0 ? (
          <p className="text-gray-600">No results to display.</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">Time without stops: {results[0].timeWithoutStops} minutes</p>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li key={index} className="bg-gray-50 rounded-lg p-4 shadow">
                  <p className="font-medium text-gray-800">{result.businessName}</p>
                  <p className="text-gray-600">{result.address}</p>
                  <p className="text-gray-600">Total Time: {result.totalTime} minutes</p>
                  <p className="text-gray-600">Added Time: {result.totalTime - result.timeWithoutStops} minutes</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

export default ResultsList;