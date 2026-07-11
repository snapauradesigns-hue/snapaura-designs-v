const API_URL = "http://localhost:5000/api";

async function getPortfolio() {
  const response = await fetch(`${API_URL}/portfolio`);
  const result = await response.json();

  return result.data;
}
