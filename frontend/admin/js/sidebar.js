const links = document.querySelectorAll(".sidebar a");

links.forEach((link) => {
  if (location.pathname.endsWith(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});
