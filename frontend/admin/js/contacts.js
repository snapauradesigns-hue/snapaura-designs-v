let enquiries = [];

const table = document.getElementById("contactTable");

async function loadContacts() {
  table.innerHTML = `

<tr>

<td colspan="5">

Loading...

</td>

</tr>

`;

  try {
    const result = await api.get("/contact");

    enquiries = result.data;

    renderContacts(enquiries);
  } catch (err) {
    showToast(
      err.message,

      "error",
    );
  }
}

loadContacts();
function renderContacts(data) {
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;padding:40px;">
                    📭 No Contact Enquiries
                </td>
            </tr>
        `;

    return;
  }

  data.forEach((contact) => {
    table.innerHTML += `
            <tr>

                <td>${contact.name}</td>

                <td>${contact.email}</td>

                <td>${contact.service || "-"}</td>

                <td>

                    ${new Date(contact.createdAt).toLocaleDateString()}

                </td>

                <td>

                    <button
                        class="danger"
                        onclick="deleteContact('${contact._id}')">

                        Delete

                    </button>

                </td>

            </tr>
        `;
  });
}
searchInput.onkeyup = () => {
  const keyword = searchInput.value.toLowerCase();

  renderContacts(
    enquiries.filter(
      (c) =>
        c.name.toLowerCase().includes(keyword) ||
        c.email.toLowerCase().includes(keyword) ||
        c.service.toLowerCase().includes(keyword),
    ),
  );
};
refreshBtn.onclick = () => {
  loadContacts();

  showToast("Contacts refreshed");
};
async function deleteContact(id) {
  if (!confirm("Delete enquiry?")) return;

  try {
    await api.delete("/contact/" + id);

    showToast("Enquiry deleted");

    loadContacts();
  } catch (err) {
    showToast(
      err.message,

      "error",
    );
  }
}
