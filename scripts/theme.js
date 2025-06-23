  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Detect system preference
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  // Apply saved or system theme on load
  root.setAttribute("data-theme", currentTheme);
  updateIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    themeToggle.classList.toggle("fa-moon", theme === "light");
    themeToggle.classList.toggle("fa-sun", theme === "dark");
  }