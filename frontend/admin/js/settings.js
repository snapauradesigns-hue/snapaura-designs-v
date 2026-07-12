const saveBtn = document.getElementById("saveBtn");

saveBtn.onclick = () => {
  const data = {
    siteName: document.getElementById("siteName").value,

    adminEmail: document.getElementById("adminEmail").value,

    instagram: document.getElementById("instagram").value,

    facebook: document.getElementById("facebook").value,

    linkedin: document.getElementById("linkedin").value,
  };

  localStorage.setItem("snapAuraSettings", JSON.stringify(data));

  alert("Settings Saved Successfully!");
};

window.onload = () => {
  const settings = JSON.parse(localStorage.getItem("snapAuraSettings"));

  if (!settings) return;

  document.getElementById("siteName").value = settings.siteName || "";

  document.getElementById("adminEmail").value = settings.adminEmail || "";

  document.getElementById("instagram").value = settings.instagram || "";

  document.getElementById("facebook").value = settings.facebook || "";

  document.getElementById("linkedin").value = settings.linkedin || "";
};
