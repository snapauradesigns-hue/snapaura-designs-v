console.log("LOGIN JS STARTED");

const form = document.getElementById("loginForm");

console.log("FORM:", form);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("FORM SUBMITTED");

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  console.log(email, password);
});
