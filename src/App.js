import React, { useState } from "react";
import {
  ChakraProvider,
  Grid,
  Box,
  Container,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";

const config = {
  apiUrl: "https://type.fit/api/quotes",
};

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");

  const Quote = ({ text, author }) => {
    return (
      <Box w="100%" h="100%" bg="blue.500" textAlign="center">
        {text} <br />
        <br /> {author}
      </Box>
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

  const getDailyQuote = () => {
    getQuotes();
    if (quotes.length > 0) {
      let randomNum = Math.floor(Math.random() * quotes.length);
      let dailyQuote = quotes[randomNum].text;
      setQuoteOfTheDay(dailyQuote);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Text size="xl">Loading...</Text>;

  return (
    <ChakraProvider>
      <Container padding="5vh" maxWidth="100vm">
        <Flex>
          <Button onClick={() => getDailyQuote()} disabled={isLoading}>
            Quote of the Day
          </Button>
          <Box w="100%" h="100%" bg="blue.500" textAlign="center">
            {quoteOfTheDay}
          </Box>
        </Flex>
        <div>
          <button
            onClick={() => getQuotes()}
            type="primary"
            disabled={isLoading}
            size="large"
          >
            Show All Quotes
          </button>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {quotes.map((quote) => (
              <Quote text={quote.text} author={quote.author}></Quote>
            ))}
          </Grid>
        </div>
      </Container>
    </ChakraProvider>
  );
}

export default App;
