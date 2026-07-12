const API = window.API;

const table = document.getElementById("contactTable");

let contacts = [];

async function loadContacts() {
  table.innerHTML = `<tr><td colspan="6">Loading...</td></tr>`;

  try {
    const response = await fetch(`${API}/contact`);

    const result = await response.json();

    contacts = result.data || [];

    renderContacts(contacts);
  } catch (err) {
    console.error(err);

    table.innerHTML = `<tr><td colspan="6">Unable to load contacts</td></tr>`;
  }
}

function renderContacts(data) {
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="6">No enquiries found</td></tr>`;

    return;
  }

  data.forEach((contact) => {
    table.innerHTML += `

<tr>

<td>${contact.name}</td>

<td>${contact.email}</td>

<td>${contact.phone}</td>

<td>${contact.service}</td>

<td>${contact.status}</td>

<td>

<button
class="btn"
onclick="viewMessage('${contact.message}')">

View

</button>

<button
class="btn"
onclick="markCompleted('${contact._id}')">

Complete

</button>

<button
class="btn btn-danger"
onclick="deleteContact('${contact._id}')">

Delete

</button>

</td>

</tr>

`;
  });
}

function viewMessage(message) {
  alert(message);
}

async function deleteContact(id) {
  if (!confirm("Delete enquiry?")) return;

  await fetch(`${API}/contact/${id}`, {
    method: "DELETE",
  });

  loadContacts();
}

async function markCompleted(id) {
  await fetch(`${API}/contact/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      status: "Completed",
    }),
  });

  loadContacts();
}

document.getElementById("refreshBtn").onclick = loadContacts;

document.getElementById("searchInput").onkeyup = (e) => {
  const keyword = e.target.value.toLowerCase();

  renderContacts(
    contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(keyword) ||
        c.email.toLowerCase().includes(keyword) ||
        c.service.toLowerCase().includes(keyword),
    ),
  );
};

loadContacts();
