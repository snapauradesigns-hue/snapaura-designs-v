let projects = [];

let editing = null;

const grid = document.getElementById("portfolioGrid");

const modal = document.getElementById("projectModal");

document.getElementById("refreshBtn").onclick = loadProjects;

document.getElementById("addBtn").onclick = () => {
  editing = null;

  modal.style.display = "flex";
};

function closeModal() {
  modal.style.display = "none";
}
async function loadProjects() {
  grid.innerHTML = `
    <div class="loader"></div>
    `;

  try {
    const result = await api.get("/portfolio");

    projects = result.data;

    renderProjects(projects);
  } catch (err) {
    grid.innerHTML = `

        <div class="empty">

        Unable to load projects

        </div>

        `;

    showToast(err.message, "error");
  }
}

loadProjects();
function renderProjects(data) {
  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = `

        <div class="empty-state">

        <h2>📂</h2>

        <h3>No Projects Yet</h3>

        <p>Add your first project.</p>

        </div>

        `;

    return;
  }

  data.forEach((project) => {
    grid.innerHTML += `

        <div class="project-card">

        <img src="${project.image}">

        <div class="project-info">

        <h3>${project.title}</h3>

        <p>${project.brand}</p>

        <small>${project.category}</small>

        ${project.featured ? '<span class="badge">⭐ Featured</span>' : ""}

        <div class="project-actions">

        <button
        onclick="editProject('${project._id}')">

        Edit

        </button>

        <button
        class="danger"

        onclick="deleteProject('${project._id}')">

        Delete

        </button>

        </div>

        </div>

        </div>

        `;
  });
}
searchInput.onkeyup = () => {
  const keyword = searchInput.value.toLowerCase();

  renderProjects(
    projects.filter(
      (project) =>
        project.title.toLowerCase().includes(keyword) ||
        project.brand.toLowerCase().includes(keyword) ||
        project.category.toLowerCase().includes(keyword),
    ),
  );
};
refreshBtn.onclick = () => {
  loadProjects();

  showToast("Portfolio refreshed");
};
function editProject(id) {
  const project = projects.find((p) => p._id === id);

  if (!project) return;

  editing = id;

  modal.style.display = "flex";

  modalTitle.innerHTML = "Edit Project";

  title.value = project.title;

  brand.value = project.brand;

  category.value = project.category;

  description.value = project.description;

  featured.checked = project.featured;
}
async function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  try {
    await api.delete("/portfolio/" + id);

    showToast("Project Deleted");

    loadProjects();
  } catch (err) {
    showToast(
      err.message,

      "error",
    );
  }
}
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", saveProject);

async function saveProject() {
  if (!title.value.trim()) {
    return showToast("Title is required", "error");
  }

  if (!brand.value.trim()) {
    return showToast("Brand is required", "error");
  }

  saveBtn.disabled = true;
  saveBtn.innerHTML = "Saving...";

  try {
    const formData = new FormData();

    formData.append("title", title.value.trim());
    formData.append("brand", brand.value.trim());
    formData.append("category", category.value);
    formData.append("description", description.value.trim());
    formData.append("featured", featured.checked);

    if (image.files.length) {
      formData.append("image", image.files[0]);
    }

    if (editing) {
      await request(`/portfolio/${editing}`, {
        method: "PUT",
        body: formData,
      });

      showToast("Project Updated");
    } else {
      await request("/portfolio", {
        method: "POST",
        body: formData,
      });

      showToast("Project Created");
    }

    closeModal();

    clearForm();

    loadProjects();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = "Save";
  }
}
function clearForm() {
  editing = null;

  title.value = "";

  brand.value = "";

  category.selectedIndex = 0;

  description.value = "";

  featured.checked = false;

  image.value = "";

  modalTitle.innerHTML = "Add Project";
}
function closeModal() {
  modal.style.display = "none";

  clearForm();
}
window.onclick = function (e) {
  if (e.target === modal) {
    closeModal();
  }
};
const preview = document.createElement("img");

preview.className = "image-preview";

image.parentNode.insertBefore(preview, image.nextSibling);

image.onchange = () => {
  if (!image.files.length) {
    preview.style.display = "none";

    return;
  }

  preview.src = URL.createObjectURL(image.files[0]);

  preview.style.display = "block";
};
