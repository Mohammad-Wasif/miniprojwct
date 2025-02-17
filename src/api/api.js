const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

const fetchProductResults = async (userMessage="earphone") => {
  console.log('Fetching product results for:', userMessage);
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data.results; // Ensure this is the correct path to the array of products
  } catch (error) {
    console.error("Error fetching product results:", error);
    throw error; // Throw error to handle it in the component
  }
};

export { fetchProductResults };
