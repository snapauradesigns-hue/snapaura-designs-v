function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  location.href = "login.html";
}
