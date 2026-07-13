const API = window.API;

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  console.log("Submitting login...");
  console.log(API);

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

    console.log("HTTP Status:", response.status);

    const result = await response.json();

    console.log(result);
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
});
