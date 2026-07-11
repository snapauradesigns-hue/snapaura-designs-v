const API_URL = "https://snap-aura-backend.onrender.com";

async function getPortfolio() {
  const response = await fetch(`${API_URL}/portfolio`);
  const result = await response.json();

  return result.data;
}
