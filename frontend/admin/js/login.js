const form = document.getElementById("loginForm");

const API = window.API || "https://snap-aura-backend.onrender.com/api";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const response = await fetch(`${API}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,

      password,
    }),
  });

  const result = await response.json();

  if (result.success) {
    localStorage.setItem("token", result.token);

    localStorage.setItem("user", JSON.stringify(result.user));

    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginMessage").textContent = result.message;
  }
});
