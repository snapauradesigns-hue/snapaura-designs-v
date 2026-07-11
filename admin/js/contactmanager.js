const token = localStorage.getItem("token");

if (!token) {
  window.location = "login.html";
}

const API = "https://snap-aura-backend.onrender.com";

const table = document.getElementById("contactTable");

async function loadContacts() {
  const response = await fetch(`${API}/contact`);

  const result = await response.json();

  table.innerHTML = "";

  result.data.forEach((contact) => {
    table.innerHTML += `

        <tr>

        <td>${contact.name}</td>

        <td>${contact.email}</td>

        <td>${contact.phone || "-"}</td>

        <td>${contact.service}</td>

        <td>${contact.budget}</td>

        <td>${new Date(contact.createdAt).toLocaleDateString()}</td>

        <td>

        <button
        class="delete"
        onclick="deleteContact('${contact._id}')">

        Delete

        </button>

        </td>

        </tr>

        `;
  });
}

async function deleteContact(id) {
  if (!confirm("Delete this inquiry?")) return;

  const response = await fetch(`${API}/contact/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await response.json();

  if (result.success) {
    loadContacts();
  }
}

loadContacts();
