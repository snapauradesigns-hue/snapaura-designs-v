const API = window.API;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");

    btn.disabled = true;
    btn.textContent = "Signing In...";

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: document.getElementById("email").value.trim(),

          password: document.getElementById("password").value,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Login Failed");

        btn.disabled = false;
        btn.textContent = "Login";

        return;
      }

      localStorage.setItem("token", result.token);

      localStorage.setItem("admin", JSON.stringify(result.user));

      window.location.href = "dashboard.html";
    } catch (err) {
      console.error(err);

      alert("Unable to connect to server.");

      btn.disabled = false;
      btn.textContent = "Login";
    }
  });
});
