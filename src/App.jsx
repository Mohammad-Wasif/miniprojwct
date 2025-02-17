import React, { useState, useEffect } from "react";
import { fetchProductResults } from "./api/api"; // Import API helper
import ProductList from './components/ProductList';

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState( [
    {
      "asin": "B078VZ5QBW",
      "title": "Men's Extreme Motion Crossroad Cargo Short",
      "imgUrl": "https://m.media-amazon.com/images/I/71D3ASDH3OL.AC_UL320.jpg",
      "productURL": "https://www.amazon.com/dp/B078VZ5QBW",
      "stars": 4.6,
      "reviews": 0,
      "price": 19.9,
      "listPrice": 34.9,
      "category_id": 110,
      "isBestSeller": false,
      "boughtInLastMonth": 1000,
      "similarity_score": 0.2251979112625122
    },
    {
      "asin": "B01KA2Y760",
      "title": "Alex - Set of 3 Hard-side Luggages Trolley Suitces Expandable, TSA, (S, M & L), dark blue",
      "imgUrl": "https://m.media-amazon.com/images/I/71sbHxiUBBL.AC_UL320.jpg",
      "productURL": "https://www.amazon.com/dp/B01KA2Y760",
      "stars": 4.3,
      "reviews": 0,
      "price": 417.14,
      "listPrice": 0,
      "category_id": 104,
      "isBestSeller": false,
      "boughtInLastMonth": 0,
      "similarity_score": 0.19634371995925903
    },
    {
      "asin": "B01GQBWBYO",
      "title": "Men's Retro Slim Fit Straight Leg Jean",
      "imgUrl": "https://m.media-amazon.com/images/I/61yQwoRYgrL.AC_UL320.jpg",
      "productURL": "https://www.amazon.com/dp/B01GQBWBYO",
      "stars": 4.4,
      "reviews": 0,
      "price": 49.58,
      "listPrice": 68,
      "category_id": 110,
      "isBestSeller": false,
      "boughtInLastMonth": 50,
      "similarity_score": 0.16008156538009644
    },
    {
      "asin": "B0928CLY2W",
      "title": "Men's 2 Pack Athletic Shorts Comfortable Cotton Workout Shorts Elastic Waist Running Shorts with Zipper Pockets",
      "imgUrl": "https://m.media-amazon.com/images/I/81ljH4gEZzL.AC_UL320.jpg",
      "productURL": "https://www.amazon.com/dp/B0928CLY2W",
      "stars": 4.3,
      "reviews": 0,
      "price": 34.99,
      "listPrice": 39.99,
      "category_id": 110,
      "isBestSeller": false,
      "boughtInLastMonth": 100,
      "similarity_score": 0.1404895782470703
    },
    {
      "asin": "B0C3MCTVL9",
      "title": "AOLDHYY T Garden Sculpture Outdoor Decoration",
      "imgUrl": "https://m.media-amazon.com/images/I/71GGjQyhkNL.AC_UL320.jpg",
      "productURL": "https://www.amazon.com/dp/B0C3MCTVL9",
      "stars": 4.8,
      "reviews": 0,
      "price": 10.99,
      "listPrice": 0,
      "category_id": 104,
      "isBestSeller": false,
      "boughtInLastMonth": 0,
      "similarity_score": 0.13252663612365723
    }
  ]);

  const sendMessage = async () => {
    // if (!query.trim()) return;

    // Add user message to chat
    const userMessage = { text: query, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Call API and get response
    try {
      const response = await fetchProductResults(query); // Send query to backend
      console.log('Fetched products:', response); // Log the results to check their structure
      setProducts(response); // Ensure this is an array of product objects
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setQuery(""); // Clear input field
  };

  return (
    <>
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">ASKCART AI Chatbot</h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <div className="h-80 overflow-y-auto border-b pb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Ask something..."
            value={query}
            defaultValue={"earphone"}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Send
          </button>
        </div>
      </div>
      <ProductList products={products} />
    </div>
    
    
    
    </>
  );
}

export default App;
