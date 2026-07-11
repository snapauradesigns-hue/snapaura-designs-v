/* ==========================================
   SNAP AURA DESIGNS
   Dynamic Portfolio
========================================== */

const API_URL = "https://snap-aura-backend.onrender.com";

const grid = document.getElementById("portfolioGrid");
const filterButtons = document.querySelectorAll(".portfolio-filters button");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

const projectsPerPage = 30;

let portfolioProjects = [];
let currentPage = 1;
let currentFilter = "all";
let currentSearch = "";

/* ================================
   LOAD FROM BACKEND
================================ */

async function loadPortfolio() {
  try {
    const response = await fetch(`${API_URL}/portfolio`);
    const result = await response.json();

    portfolioProjects = result.data;

    renderPortfolio();
  } catch (err) {
    console.error(err);

    grid.innerHTML = `
      <h2>Unable to load portfolio.</h2>
    `;
  }
}

/* ================================
   FILTER
================================ */

function getFilteredProjects() {
  return portfolioProjects.filter((project) => {
    const matchCategory =
      currentFilter === "all" ||
      project.category.toLowerCase() === currentFilter;

    const matchSearch = project.title
      .toLowerCase()
      .includes(currentSearch.toLowerCase());

    return matchCategory && matchSearch;
  });
}

/* ================================
   RENDER
================================ */

function renderPortfolio() {
  const filtered = getFilteredProjects();

  const start = (currentPage - 1) * projectsPerPage;
  const end = start + projectsPerPage;

  const visible = filtered.slice(start, end);

  grid.innerHTML = "";

  visible.forEach((project) => {
    grid.innerHTML += `

      <article class="portfolio-card"
               data-id="${project._id}">

          <img
              src="${project.image}"
              alt="${project.title}"
              loading="lazy">

          <div class="portfolio-overlay">

              <span class="project-category">

                  ${project.category}

              </span>

              <h3 class="project-title">

                  ${project.title}

              </h3>

          </div>

      </article>

    `;
  });

  renderPagination(filtered.length);

  if (typeof attachLightbox === "function") {
    attachLightbox();
  }
}

/* ================================
   PAGINATION
================================ */

function renderPagination(total) {
  const pages = Math.ceil(total / projectsPerPage);

  pagination.innerHTML = "";

  if (pages <= 1) return;

  for (let i = 1; i <= pages; i++) {
    pagination.innerHTML += `

      <button
      class="${i === currentPage ? "active" : ""}"
      onclick="goPage(${i})">

      ${i}

      </button>

    `;
  }
}

function goPage(page) {
  currentPage = page;

  renderPortfolio();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* ================================
   SEARCH
================================ */

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;

  currentPage = 1;

  renderPortfolio();
});

/* ================================
   FILTER BUTTONS
================================ */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    currentPage = 1;

    renderPortfolio();
  });
});

/* ================================
   START
================================ */

loadPortfolio();
