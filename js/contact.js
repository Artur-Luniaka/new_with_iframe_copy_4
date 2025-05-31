document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const notification = document.getElementById("notification");

  // Function to show notification
  const showNotification = (message, type) => {
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    // Hide notification after 5 seconds
    setTimeout(() => {
      notification.className = "notification";
    }, 5000);
  };

  // Function to validate form
  const validateForm = () => {
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name) {
      showNotification("Please enter your name", "error");
      return false;
    }

    if (!email) {
      showNotification("Please enter your email", "error");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return false;
    }

    if (!message) {
      showNotification("Please enter your message", "error");
      return false;
    }

    return true;
  };

  // Handle form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Get form data
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };

    try {
      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      showNotification("Message successfully sent", "success");

      // Reset form
      contactForm.reset();
    } catch (error) {
      // Show error message
      showNotification("Failed to send. Try again later.", "error");
    }
  });

  // Add input validation
  const inputs = contactForm.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      input.classList.add("invalid");

      // Show validation message based on input type
      let message = "This field is required";
      if (input.type === "email" && input.value) {
        message = "Please enter a valid email address";
      }
      showNotification(message, "error");
    });

    input.addEventListener("input", () => {
      if (input.validity.valid) {
        input.classList.remove("invalid");
      }
    });
  });
});
