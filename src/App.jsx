import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://dummyjson.com/quotes');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      setQuote(data.quotes[randomIndex]);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <h1>🌟 Inspirational Quotes 🌟</h1>
      {quote ? (
        <div>
          <p>"{quote.quote}"</p>
          <p>- {quote.author}</p>
          <button onClick={fetchQuote}> Get New Quote</button>
          <p>Crafted with ❤️</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
