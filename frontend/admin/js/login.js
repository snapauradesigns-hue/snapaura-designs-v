const API = window.API;

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

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

    console.log("Status:", response.status);

    const result = await response.json();

    console.log(result);

    if (result.success) {
      localStorage.setItem("token", result.token);

      localStorage.setItem("user", JSON.stringify(result.user));

      window.location.href = "dashboard.html";
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);

    alert(err.message);
  }
});
