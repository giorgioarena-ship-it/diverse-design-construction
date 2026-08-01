/* 
   js/filter.js
   Part 5: Projects / Blog Filter

   The card selector has been changed (.product-card, instead of
   .project-card) to match the HTML of the site.

   This site uses the same filter behavior code twice - on both
   products.html and blog.html. So, The filtering has to run 2 times. Rather than being hardcoded into the one DOMContentLoaded
   callback, I put the filtering code into a function,
   setupFilter(cardSelector). It runs right away on products.html,
   and again (from blog.js) on blog.html. */
   

function setupFilter(cardSelector) {
  const filterInput = document.getElementById("filter-input");
  const noResults = document.getElementById("no-results");
  if (!filterInput) return; // this page doesn't have a filter box

  // Adjust the selector to match your card markup
  const cards = document.querySelectorAll(cardSelector);

  filterInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(function (card) {
      // Read the title and category from the card
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const categoryEl = card.querySelector(".tag");
      const category = categoryEl
        ? categoryEl.textContent.toLowerCase()
        : (card.getAttribute("data-category") || "").toLowerCase();

      // Show the card if the query matches the title or the category,
      // hide it if not
      if (title.includes(query) || category.includes(query)) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Show the "no results" message if nothing matched, hide it if not
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Products / Case Studies page - cards already exist in the HTML, so the filter can be set up right away.
  if (document.querySelector(".product-card")) {
    setupFilter(".product-card");
  }
});


// calling setupFilter(".post-card") earlier would select zero cards.
window.setupBlogFilter = function () {
  setupFilter(".post-card");
};
