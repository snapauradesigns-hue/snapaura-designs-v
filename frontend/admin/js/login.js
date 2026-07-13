const API = window.API;

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
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      showToast(result.message || "Login Failed", "error");
      btn.disabled = false;
      btn.textContent = "Login";
      return;
    }

    // Save JWT Token
    localStorage.setItem("token", result.token);

    // Save Admin Details
    localStorage.setItem("admin", JSON.stringify(result.user));

    // Redirect
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);

    showToast("Unable to connect to server.", "error");

    btn.disabled = false;
    btn.textContent = "Login";
  }
});
