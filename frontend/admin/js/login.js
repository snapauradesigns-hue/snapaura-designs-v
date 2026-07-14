const form = document.getElementById("loginForm");

const btn = document.querySelector(".login-btn");

const eye = document.getElementById("togglePassword");

eye.onclick = () => {
  password.type = password.type === "password" ? "text" : "password";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.disabled = true;

  btn.innerHTML = "Signing In...";

  try {
    const response = await api.post(
      "/auth/login",

      JSON.stringify({
        email: email.value.trim(),

        password: password.value,
      }),
    );

    localStorage.setItem(
      "token",

      response.token,
    );

    localStorage.setItem(
      "admin",

      JSON.stringify(response.user),
    );

    showToast("Login Successful");

    setTimeout(() => {
      location.href = "dashboard.html";
    }, 800);
  } catch (err) {
    showToast(err.message, "error");

    btn.disabled = false;

    btn.innerHTML = "Login";
  }
});
