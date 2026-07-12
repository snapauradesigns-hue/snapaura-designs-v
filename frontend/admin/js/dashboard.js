const API = window.API;

async function loadDashboard() {
  try {
    const response = await fetch(`${API}/dashboard/stats`);

    const result = await response.json();

    console.log(result);

    if (!result.success) {
      throw new Error("API Error");
    }

    document.getElementById("totalProjects").textContent =
      result.data.totalProjects;

    document.getElementById("featuredProjects").textContent =
      result.data.featuredProjects;

    document.getElementById("totalCategories").textContent =
      result.data.totalCategories;

    document.getElementById("totalMessages").textContent =
      result.data.totalContacts;

    document.getElementById("backendStatus").textContent = "✅ Online";

    document.getElementById("databaseStatus").textContent = "✅ Connected";
  } catch (error) {
    console.error(error);

    document.getElementById("backendStatus").textContent = "❌ Offline";

    document.getElementById("databaseStatus").textContent = "❌ Error";
  }
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("token");

  location.href = "login.html";
};

loadDashboard();
