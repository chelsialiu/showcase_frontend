import React, { useState } from "react";

const config = {
  apiUrl: "https://type.fit/api/quotes",
};

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Quote = ({ text, author }) => {
    return (
      <span>
        <strong>{text}</strong> &nbsp; <span>{author}</span>
      </span>
    );
  };

  const getQuotes = () => {
    setQuotes([]);
    setIsLoading(true);
    fetch(config.apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setQuotes(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <button
        onClick={() => getQuotes()}
        type="primary"
        disabled={isLoading}
        size="large"
      >
        Fetch Quotes
      </button>
      <ul>
        {quotes.map((quote) => (
          <Quote text={quote.text} author={quote.author}></Quote>
        ))}
      </ul>
    </div>
  );
}

export default App;
