const API_URL = window.API || "https://snap-aura-backend.onrender.com/api";
const featuredGrid = document.getElementById("featuredPortfolio");

console.log("home.js loaded");

async function loadFeaturedProjects() {
  console.log("Loading projects...");

  if (!featuredGrid) {
    console.log("Grid not found");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/portfolio`);

    console.log("Response:", response.status);

    const result = await response.json();

    console.log(result);

    featuredGrid.innerHTML = "";

    result.data
      .filter((project) => project.featured)
      .slice(0, 6)
      .forEach((project) => {
        featuredGrid.innerHTML += `
                <div class="portfolio-card">
                    <img src="${project.image}" alt="${project.title}">
                    <h3>${project.title}</h3>
                </div>
                `;
      });
  } catch (err) {
    console.error(err);

    featuredGrid.innerHTML = "<h2>ERROR LOADING PROJECTS</h2>";
  }
}

loadFeaturedProjects();
