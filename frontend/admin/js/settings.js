const API = window.API || "https://snap-aura-backend.onrender.com/api";

const token = localStorage.getItem("token");

if (!token) {
  window.location = "login.html";
}

function logout() {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.location = "login.html";
}

document.getElementById("saveSettingsBtn").addEventListener("click", () => {
  alert("Settings saved successfully.");
});

document.getElementById("changePasswordBtn").addEventListener("click", () => {
  const newPassword = document.getElementById("newPassword").value;

  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");

    return;
  }

  alert("Password update feature will be connected to the backend next.");
});
