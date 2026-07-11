/*=========================================
    SNAP AURA DESIGNS
    Portfolio
=========================================*/

const portfolioGrid = document.querySelector(".portfolio-page-grid");

const API_URL = "http://localhost:5000/api";

if (portfolioGrid) {
  loadPortfolio();
}

/*=========================================
    LOAD PORTFOLIO FROM BACKEND
=========================================*/

async function loadPortfolio() {
  try {
    const response = await fetch(`${API_URL}/portfolio`);

    const result = await response.json();

    if (result.success) {
      renderPortfolio(result.data);
    } else {
      portfolioGrid.innerHTML = `
        <h2>No Portfolio Found</h2>
      `;
    }
  } catch (err) {
    console.error(err);

    portfolioGrid.innerHTML = `
      <h2>Unable to load portfolio.</h2>
    `;
  }
}

/*=========================================
    RENDER PORTFOLIO
=========================================*/

function renderPortfolio(projectList) {
  portfolioGrid.innerHTML = projectList
    .map(
      (project) => `

      <article class="portfolio-card" data-id="${project._id}">

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

  `,
    )
    .join("");

  initPortfolio();
}

/*=========================================
    PORTFOLIO EVENTS
=========================================*/

function initPortfolio() {
  // Hover effects are handled completely by CSS.
}
