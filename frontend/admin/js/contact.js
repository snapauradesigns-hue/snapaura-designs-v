const API = window.API;

const table = document.getElementById("contactTable");

let contacts = [];

async function loadContacts() {
  table.innerHTML = `<tr><td colspan="6"><div class="loader"></div></td></tr>`;

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
onclick="viewMessage(this)"
data-name="${encodeURIComponent(contact.name)}"
data-email="${encodeURIComponent(contact.email)}"
data-phone="${encodeURIComponent(contact.phone || "")}"
data-service="${encodeURIComponent(contact.service)}"
data-budget="${encodeURIComponent(contact.budget || "")}"
data-message="${encodeURIComponent(contact.message)}">

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

function viewMessage(button) {
  const name = decodeURIComponent(button.dataset.name);
  const email = decodeURIComponent(button.dataset.email);
  const phone = decodeURIComponent(button.dataset.phone);
  const service = decodeURIComponent(button.dataset.service);
  const budget = decodeURIComponent(button.dataset.budget);
  const message = decodeURIComponent(button.dataset.message);

  alert(
    `Name: ${name}

Email: ${email}

Phone: ${phone}

Service: ${service}

Budget: ${budget}

Message:
${message}`,
  );
}

async function deleteContact(id) {
  if (!confirm("Delete this enquiry?")) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/contact/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Delete failed.");

      return;
    }

    showToast(result.message);

    loadContacts();
  } catch (err) {
    console.error(err);
    showToast("❌ Unable to delete enquiry.", "error");
  }
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
