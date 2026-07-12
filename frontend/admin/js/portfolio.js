const API = window.API;

const table = document.getElementById("portfolioTable");

async function loadPortfolio() {
  table.innerHTML = `<tr><td colspan="6">Loading...</td></tr>`;

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
  modal.style.display = "flex";
};

function closeModal() {
  modal.style.display = "none";
}
async function uploadProject() {
  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);

  formData.append("brand", document.getElementById("brand").value);

  formData.append("category", document.getElementById("category").value);

  formData.append("description", document.getElementById("description").value);

  formData.append("featured", document.getElementById("featured").checked);

  formData.append("image", document.getElementById("image").files[0]);

  const response = await fetch(`${API}/portfolio`, {
    method: "POST",

    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    alert("Project Uploaded!");

    closeModal();

    loadPortfolio();
  } else {
    alert(result.message);
  }
}
document.getElementById("saveProject").onclick = uploadProject;
