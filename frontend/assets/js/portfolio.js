/*=========================================
    SNAP AURA DESIGNS
    Portfolio
=========================================*/

const portfolioGrid = document.querySelector(".portfolio-page-grid");

if (portfolioGrid) {
  const projects = [];

  /*==============================
      LOAD PROJECTS
    ==============================*/

  for (let i = 1; i <= 30; i++) {
    projects.push({
      id: i,

      image: `../assets/images/portfolio/project-${i}.png`,

      category: "Branding",

      title: `Snap Aura Project ${i}`,
    });
  }

  /*==============================
      RENDER PORTFOLIO
    ==============================*/

  function renderPortfolio(projectList) {
    portfolioGrid.innerHTML = projectList
      .map(
        (project) => `

            <article class="portfolio-card" data-id="${project.id}">

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

  /*==============================
      PORTFOLIO EVENTS
    ==============================*/

 function initPortfolio(){

    // Hover effects are handled completely by CSS.

 }}