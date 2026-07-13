const API = window.API;

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  btn.disabled = true;
  btn.textContent = "Signing In...";

  try {
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

    if (!response.ok || !result.success) {
      showToast(result.message || "Login Failed", "error");

      btn.disabled = false;
      btn.textContent = "Login";

      return;
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("admin", JSON.stringify(result.user));

    showToast("✅ Login Successful");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  } catch (err) {
    console.error(err);

    showToast("Unable to connect to server.", "error");

    btn.disabled = false;
    btn.textContent = "Login";
  }
});
