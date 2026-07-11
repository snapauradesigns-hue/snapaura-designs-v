const token = localStorage.getItem("token");

if (!token) {
  window.location = "login.html";
}

const API = "http://localhost:5000/api";

async function loadDashboardStats() {
  try {
    const response = await fetch(`${API}/dashboard/stats`);

    const result = await response.json();

    if (!result.success) return;

    document.getElementById("totalProjects").textContent =
      result.data.totalProjects;

    document.getElementById("featuredProjects").textContent =
      result.data.featuredProjects;

    document.getElementById("categories").textContent =
      result.data.totalCategories;

    document.getElementById("messages").textContent = result.data.totalContacts;
  } catch (err) {
    console.error(err);
  }
}

loadDashboardStats();
