const token = localStorage.getItem("token");

if (!token) {
  window.location = "login.html";
}

const API = "https://snap-aura-backend.onrender.com";
const modal = document.getElementById("projectModal");

const addBtn = document.getElementById("newProjectBtn");

const close = document.getElementById("closeModal");

const table = document.getElementById("portfolioTable");
const search = document.getElementById("search");
const filter = document.getElementById("filterCategory");

const form = document.getElementById("projectForm");

const imageInput = document.getElementById("imageInput");

const preview = document.getElementById("preview");

let editProjectId = null;

// ==============================
// Open Add Project Modal
// ==============================

addBtn.onclick = () => {
  // Switch back to Add mode
  editProjectId = null;

  // Clear all form fields
  form.reset();

  // Hide previous image preview
  preview.src = "";
  preview.style.display = "none";

  // Make image required for new projects
  imageInput.required = true;

  // Change button text
  form.querySelector('button[type="submit"]').textContent = "Upload Project";

  // Open modal
  modal.style.display = "flex";
};
close.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// ==============================
// Image Preview
// ==============================

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (!file) return;

  preview.src = URL.createObjectURL(file);

  preview.style.display = "block";
});

let projects = [];
let filteredProjects = [];

// ==============================
// Load Projects
// ==============================

async function loadProjects() {
  try {
    const response = await fetch(`${API}/portfolio`);
    const result = await response.json();

    if (!result.success) {
      alert("Unable to load projects.");
      return;
    }

    projects = result.data;
    filteredProjects = [...projects];

    renderProjects();
  } catch (err) {
    console.error(err);
    alert("Backend not running.");
  }
}

// ==============================
// Render Table
// ==============================

function renderProjects() {
  table.innerHTML = "";

  if (filteredProjects.length === 0) {
    table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No Projects Found
                </td>
            </tr>
        `;

    return;
  }

  filteredProjects.forEach((project) => {
    table.innerHTML += `

        <tr>

            <td>

                <img
                src="${project.image}"
                width="80">

            </td>

            <td>${project.title}</td>

            <td>${project.brand}</td>

            <td>${project.category}</td>

            <td>

                ${project.featured ? "⭐" : "-"}

            </td>

            <td>

                <button
                class="action-btn edit"
                onclick="editProject('${project._id}')">

                Edit

                </button>

                <button
                class="action-btn delete"
                onclick="deleteProject('${project._id}')">

                Delete

                </button>

            </td>

        </tr>

        `;
  });
}

// ==============================
// Search
// ==============================

search.addEventListener("keyup", filterProjects);

// ==============================
// Category Filter
// ==============================

filter.addEventListener("change", filterProjects);

// ==============================
// Filter Logic
// ==============================

function filterProjects() {
  const keyword = search.value.toLowerCase();

  const category = filter.value;

  filteredProjects = projects.filter((project) => {
    const matchName =
      project.title.toLowerCase().includes(keyword) ||
      project.brand.toLowerCase().includes(keyword);

    const matchCategory = category === "" || project.category === category;

    return matchName && matchCategory;
  });

  renderProjects();
}

// ==============================
// Delete
// ==============================

async function deleteProject(id) {
  const ok = confirm("Delete this project?");

  if (!ok) return;

  const response = await fetch(`${API}/portfolio/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await response.json();

  if (result.success) {
    loadProjects();
  } else {
    alert(result.message);
  }
}

// ==============================
// Edit (Next Step)
// ==============================

async function editProject(id) {
  const project = projects.find((p) => p._id === id);

  if (!project) return;

  editProjectId = id;

  modal.style.display = "flex";

  form.title.value = project.title;
  form.brand.value = project.brand;
  form.category.value = project.category;
  form.description.value = project.description;
  form.featured.checked = project.featured;

  preview.src = project.image;
  preview.style.display = "block";

  form.querySelector("button").textContent = "Update Project";

  imageInput.required = false;
}
// ==============================
// ==============================
// Upload Project
// ==============================

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  formData.set("featured", form.featured.checked ? "true" : "false");

  try {
    const url = editProjectId
      ? `${API}/portfolio/${editProjectId}`
      : `${API}/portfolio`;

    const method = editProjectId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert("✅ Project Uploaded");

      form.reset();

      editProjectId = null;

      form.querySelector("button").textContent = "Upload Project";

      preview.style.display = "none";

      modal.style.display = "none";

      loadProjects();
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);

    alert("Upload Failed");
  }
});
loadProjects();
