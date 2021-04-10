import React, { useState } from "react";
import {
  ChakraProvider,
  Grid,
  Box,
  Container,
  Flex,
  Button,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/react";

const config = {
  apiUrl: "https://type.fit/api/quotes",
};

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState({});
  const [today, setToday] = useState("");

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
    getDate();
    if (quotes.length > 0) {
      let randomNum = Math.floor(Math.random() * quotes.length);
      let dailyQuote = quotes[randomNum];
      if (dailyQuote.author == "") {
        dailyQuote.author = "Anonymous";
      }
      setQuoteOfTheDay(dailyQuote);
      setIsLoading(false);
    }
  };

  const getDate = () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let today = cMonth + "/" + cDay + "/" + cYear;
    setToday(today);
  };

  if (isLoading) return <Text size="xl">Loading...</Text>;

  return (
    <ChakraProvider>
      <Container maxWidth="100vm" backgroundColor="turquoise">
        <Heading
          as="h1"
          size="4xl"
          textAlign="center"
          padding="4vh"
          color="white"
          backgroundColor="blue.700"
          w="100%"
        >
          Quote of the Day
        </Heading>
        <Container minW="100vh" minH="50vh" centerContent padding="2vh">
          <Heading as="h3" color="white" padding="3vh">
            {today}
          </Heading>
          <Divider />
          <Text
            fontSize="4xl"
            textAlign="center"
            color="gray.600"
            paddingTop="2vh"
          >
            {quoteOfTheDay.text}
          </Text>
          <Text
            fontSize="2xl"
            textAlign="center"
            color="gray.600"
            paddingTop="2vh"
            paddingBottom="2vh"
          >
            {quoteOfTheDay.author}
          </Text>
          <Button onClick={() => getDailyQuote()} disabled={isLoading}>
            See Another Quote
          </Button>
        </Container>
        {/* <Flex backgroundColor="black">
          <Button onClick={() => getQuotes()} disabled={isLoading}>
            All Quotes
          </Button>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {quotes.map((quote) => (
              <Quote text={quote.text} author={quote.author}></Quote>
            ))}
          </Grid>
        </Flex> */}
      </Container>
    </ChakraProvider>
  );
}

export default App;
