import React, { useState, useEffect } from "react";
import { fetchProductResults } from "./api/api"; // Import API helper
import ProductList from './components/ProductList';

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);

  const sendMessage = async () => {
    // if (!query.trim()) return;

    // Add user message to chat
    const userMessage = { text: query, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Call API and get response
    try {
      const response = await fetchProductResults(query); // Send query to backend
      console.log('Fetched products:', response); // Log the results to check their structure
      // const botMessage = { text: response || "No relevant products found.", sender: "bot" };
      // setMessages((prev) => [...prev, botMessage]); // Update chat with bot response
      setProducts(response); // Ensure this is an array of product objects
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setQuery(""); // Clear input field
  };

  return (
    <></>
  );
}

export default App;
