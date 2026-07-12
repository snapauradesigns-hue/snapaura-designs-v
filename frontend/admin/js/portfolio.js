const API = window.API;
let editProjectId = null;

const table = document.getElementById("portfolioTable");

async function loadPortfolio() {
  table.innerHTML = `<tr><td colspan="6"><div class="loader"></div></td></tr>`;

  try {
    const response = await fetch(`${API}/portfolio`);

    const result = await response.json();

    if (!result.success) {
      throw new Error("API Error");
    }

    table.innerHTML = "";

    if (result.data.length === 0) {
      table.innerHTML = `<tr>

            <td colspan="6">

            No Projects Found

            </td>

            </tr>`;

      return;
    }

    result.data.forEach((project) => {
      table.innerHTML += `

            <tr>

            <td>

            <img
            src="${project.image}"
            width="60"
            height="60"
            style="border-radius:8px">

            </td>

            <td>${project.title}</td>

            <td>${project.brand}</td>

            <td>${project.category}</td>

            <td>

            ${project.featured ? "⭐" : "-"}

            </td>


<td>

<button
class="btn btn-primary"
onclick="editProject('${project._id}')">
Edit
</button>

<button
class="btn btn-danger"
onclick="deleteProject('${project._id}')">
Delete
</button>

</td>

            </tr>

            `;
    });
  } catch (error) {
    console.error(error);

    table.innerHTML = `<tr>

        <td colspan="6">

        Failed to Load Portfolio

        </td>

        </tr>`;
  }
}

async function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  const response = await fetch(`${API}/portfolio/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (result.success) {
    loadPortfolio();
  }
}

document.getElementById("refreshBtn").onclick = loadPortfolio;

loadPortfolio();
const modal = document.getElementById("projectModal");

document.getElementById("addBtn").onclick = () => {
  editProjectId = null;

  document.getElementById("saveProject").textContent = "Upload Project";

  document.getElementById("title").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("category").selectedIndex = 0;
  document.getElementById("description").value = "";
  document.getElementById("featured").checked = false;
  document.getElementById("image").value = "";

  modal.style.display = "flex";
};
function closeModal() {
  modal.style.display = "none";
}
async function editProject(id) {
  const response = await fetch(`${API}/portfolio`);

  const result = await response.json();

  const project = result.data.find((p) => p._id === id);

  if (!project) return;

  editProjectId = id;

  document.getElementById("title").value = project.title;
  document.getElementById("brand").value = project.brand;
  document.getElementById("category").value = project.category;
  document.getElementById("description").value = project.description;
  document.getElementById("featured").checked = project.featured;

  document.getElementById("saveProject").textContent = "Update Project";

  modal.style.display = "flex";
}
async function uploadProject() {
  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("brand", document.getElementById("brand").value);
  formData.append("category", document.getElementById("category").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("featured", document.getElementById("featured").checked);

  const image = document.getElementById("image").files[0];

  if (image) {
    formData.append("image", image);
  }

  const url = editProjectId
    ? `${API}/portfolio/${editProjectId}`
    : `${API}/portfolio`;

  const method = editProjectId ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    alert(editProjectId ? "Project Updated!" : "Project Uploaded!");

    editProjectId = null;

    document.getElementById("saveProject").textContent = "Upload Project";

    document.getElementById("title").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("category").selectedIndex = 0;
    document.getElementById("description").value = "";
    document.getElementById("featured").checked = false;
    document.getElementById("image").value = "";

    closeModal();

    loadPortfolio();
  } else {
    alert(result.message);
  }
}
document.getElementById("saveProject").onclick = uploadProject;
