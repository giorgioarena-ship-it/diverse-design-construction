/* 
   js/theme.js
   Part 1: Theme Switcher with Persistent Preference

   The toggleBtn and click-listener portion of the starter is pulled out into a
   named function, setupThemeToggle(), instead of being inline
   inside the single DOMContentLoaded callback shown in the
   handout. */

document.addEventListener("DOMContentLoaded", function () {

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);

    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }

    // Save the selected theme to localStorage so it survives reloads
    localStorage.setItem("theme", theme);
  }

  function loadSavedTheme() {
    // Read the saved theme from localStorage
    const saved = localStorage.getItem("theme");
    // If a value exists, apply it; if not, fall back to "light"
    applyTheme(saved ? saved : "light");
  }

  /* This is the part of the starter that takes toggleBtn and attaches
   the click listener. It's wrapped in its own function (instead of
   sitting directly in this DOMContentLoaded callback) because components.js needs to
   be able to call this again once the header has actually been
   injected into the page. */

  function setupThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return; // header hasn't been injected yet

    // Make sure the label matches whatever theme is already active
    const current = document.body.getAttribute("data-theme") || "light";
    toggleBtn.textContent = current === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

    toggleBtn.addEventListener("click", function () {
      // Determine the current theme and toggle to the opposite one
      const activeTheme = document.body.getAttribute("data-theme") || "light";
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  loadSavedTheme(); // Run on every page load
  setupThemeToggle(); // Wire up the button if it's already in the DOM

  window.setupThemeToggle = setupThemeToggle;
});

/* 
   Anti-flash note: To ensure the wrong theme is not flashed, each
   HTML page has a small inline script in its <head> (before
   the stylesheet loads) that reads localStorage and sets
   data-theme on <html> right away. That inline script is separate
   from this file and is what actually stops the flash; the code
   above still runs after, on <body>, to handle the toggle button once it exists. */
