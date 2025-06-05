// Use environment variable or fallback to the actual API URL
const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

async function convertToJson(res) {
  try {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}: ${res.statusText}`);
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error(`Failed to parse JSON response: ${error.message}`);
  }
}

export default class ExternalServices {

  /**
   * Fetches products from the API based on category
   * @param {string} category - The product category to fetch
   * @returns {Promise<Array>} Array of products
   */
  async getData(category) {
    const url = `${baseURL}products/search/${category}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = await convertToJson(response);

      if (!data || !data.Result) {
        throw new Error("Invalid response format: missing Result field");
      }

      return data.Result;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(`Failed to fetch products for category "${category}": ${error.message}`);
    }
  }

  /**
   * Finds a product by its ID
   * @param {string} id - The product ID to find
   * @returns {Promise<Object>} The product object if found
   */
  async findProductById(id) {
    const url = `${baseURL}product/${id}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = await convertToJson(response);

      if (!data || !data.Result) {
        throw new Error("Invalid response format: missing Result field");
      }

      return data.Result;
    } catch (error) {
      throw new Error(`Failed to fetch product with ID "${id}": ${error.message}`);
    }
  }

  /**
   * Submit order to the checkout endpoint
   * @param {Object} order - The order object to submit
   * @returns {Promise<Object>} The server response
   */
  async checkout(order) {
    const url = `${baseURL}checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

    try {
      const response = await fetch(url, options);
      const data = await convertToJson(response);
      return data;
    } catch (error) {
      console.error("Checkout error:", error);
      throw new Error(`Failed to submit order: ${error.message}`);
    }
  }
}
