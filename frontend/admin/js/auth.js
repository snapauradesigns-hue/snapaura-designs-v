const token = localStorage.getItem("token");

if (!token) {
  location.href = "login.html";
}

window.addEventListener("storage", () => {
  if (!localStorage.getItem("token")) {
    location.href = "login.html";
  }
});
