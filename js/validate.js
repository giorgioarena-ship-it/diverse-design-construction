/* 
   js/validate.js
   Part 4: Contact Form Validation

   Validates the contact form fully on the client side:
     - name: required, can't be blank
     - email: required, must look like a real email address
     - message: required, at least 20 characters

   Errors show up as a small red line under the field. If the
   whole form is valid, the form is swapped out for a success
   message. */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return; // not on the contact page

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + "-error");
    field.closest(".form-group").classList.add("invalid");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + "-error");
    field.closest(".form-group").classList.remove("invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    } else {
      clearError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email address.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "That doesn't look like a valid email address.");
      isValid = false;
    } else {
      clearError("email");
    }

    if (message.length < 20) {
      showError("message", "Your message needs to be at least 20 characters long (currently " + message.length + ").");
      isValid = false;
    } else {
      clearError("message");
    }

    if (isValid) {
      form.innerHTML = `
        <div class="success-box">
          <h3>Thanks, ${name.split(" ")[0]}!</h3>
          <p>Your message has been received. We'll get back to you at ${email} within one business day.</p>
        </div>
      `;
    }
  });

  // Clear a field's error as soon as the user starts fixing it
  ["name", "email", "message"].forEach(function (id) {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", function () {
        clearError(id);
      });
    }
  });
});
