/* 
   js/components.js
   Part 2: Dynamic Header & Footer

   Fetches components/header.html and components/footer.html
   and injects them into the placeholder divs that every page
   has. The nav/footer markup only has to be
   maintained in one place instead of copy-pasted on six pages.

   This only works when the site is opened over HTTP. Opening the
   HTML files directly from disk won't work because
   fetch() blocks local file access for security reasons. */

function loadComponent(selector, filePath) {
  const target = document.querySelector(selector);
  if (!target) return; // page doesn't have this placeholder

  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(html => {
      target.innerHTML = html; // matches starter: document.querySelector(selector).innerHTML = html;

      
      if (selector === "#header-placeholder") {
        if (window.setupThemeToggle) window.setupThemeToggle();
        highlightActiveLink(); 
      }

      // fill in the footer's "current year" span once the footer markup exists.
      if (selector === "#footer-placeholder") {
        const yearSpan = document.getElementById("year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
      }
    })
    .catch(error => console.error(error));
}

//  highlights the nav link for the current page so visitors can see where they are in the site.
function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const currentKey = currentPage.replace(".html", "");
  document.querySelectorAll(".main-nav a[data-page]").forEach(link => {
    if (link.getAttribute("data-page") === currentKey) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("#header-placeholder", "components/header.html");
  loadComponent("#footer-placeholder", "components/footer.html");
});
