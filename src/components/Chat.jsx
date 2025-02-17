import React, { useState } from 'react';
import { fetchProductResults } from '../api';  // Import the API function
import '../styles/Chat.css';  // Import the CSS

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage,
      isText: true  // Add this flag to indicate it's a text message
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const results = await fetchProductResults(inputMessage);
      
      // Create a formatted message for the bot response
      const botMessage = {
        type: 'bot',
        content: results,
        isText: false  // Add this flag to indicate it's not a text message
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, I encountered an error while searching for products.',
        isText: true  // Add this flag for error messages
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
    setInputMessage("");
  };

  const renderMessage = (message) => {
    if (message.isText) {
      return <p>{message.content}</p>;
    }

    // Handle product results
    return (
      <div className="product-results">
        {Array.isArray(message.content) ? (
          message.content.map((product, index) => (
            <div key={index} className="product-card">
              {product.imgUrl && (
                <img src={product.imgUrl} alt={product.title || 'Product'} />
              )}
              <h3>{product.title || 'No title available'}</h3>
              <p>Price: {product.price || 'N/A'}</p>
              {product.stars && (
                <p>Rating: {product.stars} ⭐ ({product.reviews || '0'} reviews)</p>
              )}
              {product.productURL && (
                <a href={product.productURL} target="_blank" rel="noopener noreferrer">
                  View on Amazon
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="error-message">No products found</p>
        )}
      </div>
    );
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {renderMessage(message)}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about products..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chat; 