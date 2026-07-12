const API = window.API || "https://snap-aura-backend.onrender.com/api";

async function loadDashboard() {
  try {
    const response = await fetch(`${API}/dashboard/stats`);
    const result = await response.json();

    console.log("API:", result);

    console.log(document.getElementById("totalProjects"));
    console.log(document.getElementById("featuredProjects"));
    console.log(document.getElementById("totalCategories"));
    console.log(document.getElementById("totalMessages"));

    document.getElementById("totalProjects").textContent =
      result.data.totalProjects;
    document.getElementById("featuredProjects").textContent =
      result.data.featuredProjects;
    document.getElementById("totalCategories").textContent =
      result.data.totalCategories;
    document.getElementById("totalMessages").textContent =
      result.data.totalContacts;
  } catch (err) {
    console.error("Dashboard Error:", err);
  }
}

loadDashboard();
