/*=========================================
LIGHTBOX
=========================================*/

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("lightboxClose");

const prevBtn = document.getElementById("lightboxPrev");

const nextBtn = document.getElementById("lightboxNext");

let currentIndex = 0;

function attachLightbox() {
  const cards = document.querySelectorAll(".portfolio-card");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      currentIndex = index;

      openLightbox();
    });
  });
}

function openLightbox() {
  const filtered = getFilteredProjects();

  const project = filtered[currentIndex];

  lightbox.classList.add("active");

  lightboxImg.src = `../assets/images/portfolio/${project.image}`;

  lightboxTitle.textContent = project.title;

  lightboxCategory.textContent = project.category;
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

closeBtn.onclick = closeLightbox;

document.querySelector(".lightbox-overlay").onclick = closeLightbox;
nextBtn.onclick = () => {
  const filtered = getFilteredProjects();

  currentIndex++;

  if (currentIndex >= filtered.length) {
    currentIndex = 0;
  }

  openLightbox();
};

prevBtn.onclick = () => {
  const filtered = getFilteredProjects();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = filtered.length - 1;
  }

  openLightbox();
};

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    nextBtn.click();
  }

  if (e.key === "ArrowLeft") {
    prevBtn.click();
  }
});
