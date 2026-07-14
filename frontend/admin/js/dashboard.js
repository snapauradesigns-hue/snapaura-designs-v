async function loadDashboard() {
  try {
    const result = await api.get("/dashboard/stats");

    document.getElementById("projects").textContent = result.data.totalProjects;

    document.getElementById("contacts").textContent = result.data.totalContacts;

    document.getElementById("featured").textContent =
      result.data.featuredProjects;

    document.getElementById("categories").textContent =
      result.data.totalCategories;

    document.getElementById("backendStatus").textContent = "🟢 Backend Online";

    document.getElementById("databaseStatus").textContent =
      "🟢 MongoDB Connected";
  } catch (err) {
    document.getElementById("backendStatus").textContent = "🔴 Backend Offline";

    document.getElementById("databaseStatus").textContent = "🔴 Database Error";

    showToast(err.message, "error");
  }
}

loadDashboard();
document.querySelector(".admin-name").textContent = JSON.parse(
  localStorage.getItem("admin"),
).name;
