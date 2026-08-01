/*
   js/blog.js
   Part 3: Dynamic Blog / News Section

   Fetches data/posts.json, sorts the posts newest-first, and
   builds a card for each one. The very first card (the most
   recent post) gets a "Latest Post" badge.

   This only runs on blog.html, since that's the only page with
   a #blog-list element. */

document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return; // not on the blog page

  fetch("data/posts.json")
    .then(response => response.json())
    .then(posts => {
      // Part 3, instruction 10 requires: sort newest-to-oldest before
      // displaying, format the date to be reader-friendly, and add a
      // "Latest Post" badge beside the most recent post.
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-card");
        // data attributes used later by js/filter.js
        postElement.setAttribute("data-title", post.title.toLowerCase());
        postElement.setAttribute("data-category", post.category.toLowerCase());

        const readableDate = formatDate(post.date);

        postElement.innerHTML = `
          ${index === 0 ? '<span class="latest-badge">Latest Post</span>' : ""}
          <h2 class="card-title">${post.title}</h2>
          <p class="post-meta">${readableDate} &middot; ${post.category}</p>
          <p>${post.summary}</p>
          <button class="read-more-btn" type="button">Read more</button>
          <div class="post-content"><p>${post.content}</p></div>
        `;

        // Toggle full content when "Read more" is clicked
        const btn = postElement.querySelector(".read-more-btn");
        const content = postElement.querySelector(".post-content");
        btn.addEventListener("click", function () {
          const isOpen = content.classList.toggle("open");
          btn.textContent = isOpen ? "Show less" : "Read more";
        });

        blogList.appendChild(postElement);
      });

      // Once posts exist in the DOM, the filter script (Part 5) can run.
      if (window.setupBlogFilter) window.setupBlogFilter();
    })
    .catch(error => {
      console.error("Error loading posts:", error);
      blogList.innerHTML = "<p>Sorry, posts could not be loaded right now.</p>";
    });
});

// Turns "2025-06-01" into "June 1, 2025"
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
