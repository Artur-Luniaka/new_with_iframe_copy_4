// Function to create and insert header
function createHeader(headerData) {
  const header = document.createElement("header");
  header.className = "header";

  // Create logo
  const logo = document.createElement("a");
  logo.href = headerData.logo.url || "./";
  logo.className = "logo";
  logo.textContent = headerData.logo;

  // Create navigation
  const nav = document.createElement("nav");
  nav.className = "nav-menu";

  // Create mobile menu button
  const menuButton = document.createElement("button");
  menuButton.className = "mobile-menu-button";
  menuButton.innerHTML = `
    <span class="menu-icon">
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
    </span>
  `;

  // Create mobile menu overlay
  const mobileOverlay = document.createElement("div");
  mobileOverlay.className = "mobile-menu-overlay";

  // Create navigation items
  headerData.navigation.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.url;
    link.className = "nav-link";
    link.textContent = item.text;

    // Add special handling for How to Play link
    if (item.url === "#how-to-play" || item.url.endsWith("./#how-to-play")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        // Check if we're on the home page
        if (
          window.location.pathname === "/" ||
          window.location.pathname.endsWith("index.html")
        ) {
          // If on home page, smooth scroll to section
          const howToPlaySection = document.querySelector("#how-to-play");
          if (howToPlaySection) {
            howToPlaySection.scrollIntoView({
              behavior: "smooth",
            });
          }
        } else {
          // If not on home page, redirect to home page with hash
          window.location.href = "./#how-to-play";
        }
      });
    }

    nav.appendChild(link);
  });

  // Append elements to header
  header.appendChild(logo);
  header.appendChild(nav);
  header.appendChild(menuButton);
  header.appendChild(mobileOverlay);

  // Insert header into the page
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.appendChild(header);
  }

  // Mobile menu functionality
  let isMenuOpen = false;

  function toggleMenu(open) {
    isMenuOpen = open;
    document.body.style.overflow = open ? "hidden" : "";
    header.classList.toggle("menu-open", open);
    mobileOverlay.classList.toggle("active", open);

    // Animate menu button
    menuButton.classList.toggle("active", open);

    // Animate nav links
    const links = nav.querySelectorAll(".nav-link");
    links.forEach((link, index) => {
      link.style.transitionDelay = open ? `${index * 0.1}s` : "0s";
      link.classList.toggle("visible", open);
    });
  }

  // Menu button click handler
  menuButton.addEventListener("click", () => {
    toggleMenu(!isMenuOpen);
  });

  // Close menu when clicking outside
  mobileOverlay.addEventListener("click", (e) => {
    if (e.target === mobileOverlay) {
      toggleMenu(false);
    }
  });

  // Close menu when clicking on a link
  nav.addEventListener("click", () => {
    if (isMenuOpen) {
      toggleMenu(false);
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      toggleMenu(false);
    }
  });
}

// Function to create and insert footer
function createFooter(footerData) {
  const footerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Legal</h3>
                    <div class="footer-links">
                        ${footerData.legal.links
                          .map(
                            (link) =>
                              `<a href="${link.url}" class="footer-link">${link.text}</a>`
                          )
                          .join("")}
                    </div>
                </div>
                <div class="footer-section">
                    <h3>${footerData.contact.title}</h3>
                    <div class="contact-info">
                        <div class="contact-item">
                            <i>📧</i>
                            <span>${footerData.contact.email}</span>
                        </div>
                        <div class="contact-item">
                            <i>📍</i>
                            <span>${footerData.contact.address}</span>
                        </div>
                        <div class="contact-item">
                            <i>📞</i>
                            <span>${footerData.contact.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                ${footerData.copyright}
            </div>
        </footer>
    `;
  document.getElementById("footer-container").innerHTML = footerHTML;
}

// Function to create star rating
function createStarRating(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

// Function to load content from JSON
async function loadContent() {
  try {
    const response = await fetch("./data/content.json");
    const data = await response.json();

    // Create header and footer
    createHeader(data.header);
    createFooter(data.footer);

    // Populate hero section
    document.querySelector(
      ".hero"
    ).style.backgroundImage = `url(${data.hero.backgroundImage})`;
    document.querySelector(".hero-title").textContent = data.hero.title;
    document.querySelector(".hero-description").textContent =
      data.hero.description;

    // Add hero highlights
    const heroHighlights = document.querySelector(".hero-highlights");
    data.hero.highlights.forEach((highlight) => {
      const highlightElement = document.createElement("div");
      highlightElement.className = "hero-highlight animate-fade-in";
      highlightElement.textContent = highlight;
      heroHighlights.appendChild(highlightElement);
    });

    // Populate features section
    document.querySelector("#features h2").textContent = data.features.title;
    document.querySelector(".features-subtitle").textContent =
      data.features.subtitle;

    const featuresGrid = document.querySelector(".features-grid");
    data.features.cards.forEach((card) => {
      const featureCard = document.createElement("div");
      featureCard.className = "feature-card animate-fade-in";
      featureCard.innerHTML = `
                <img src="${card.image}" alt="${card.title}">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <div class="feature-highlights">
                    ${card.highlights
                      .map(
                        (highlight) =>
                          `<span class="feature-highlight">${highlight}</span>`
                      )
                      .join("")}
                </div>
            `;
      featuresGrid.appendChild(featureCard);
    });

    // Populate how to play section
    document.querySelector("#how-to-play h2").textContent =
      data.howToPlay.title;
    document.querySelector(".how-to-play-subtitle").textContent =
      data.howToPlay.subtitle;

    const stepsContainer = document.querySelector(".steps-container");
    data.howToPlay.steps.forEach((step, index) => {
      const stepCard = document.createElement("div");
      stepCard.className = "step-card animate-fade-in";
      stepCard.style.animationDelay = `${index * 0.2}s`;
      stepCard.innerHTML = `
                <div class="step-icon">${step.icon}</div>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
                <div class="step-tips">
                    ${step.tips
                      .map((tip) => `<div class="step-tip">${tip}</div>`)
                      .join("")}
                </div>
            `;
      stepsContainer.appendChild(stepCard);
    });

    // Populate reviews section
    document.querySelector("#reviews h2").textContent = data.reviews.title;
    document.querySelector(".reviews-subtitle").textContent =
      data.reviews.subtitle;

    // Populate stats
    const statsGrid = document.querySelector(".reviews-stats");
    data.reviews.stats.forEach((stat) => {
      const statCard = document.createElement("div");
      statCard.className = "stat-card animate-fade-in";
      statCard.innerHTML = `
                <div class="stat-number">${stat.number}</div>
                <div class="stat-label">${stat.label}</div>
            `;
      statsGrid.appendChild(statCard);
    });

    // Populate reviews
    const reviewsGrid = document.querySelector(".reviews-grid");
    data.reviews.items.forEach((review, index) => {
      const reviewCard = document.createElement("div");
      reviewCard.className = "review-card animate-fade-in";
      reviewCard.style.animationDelay = `${index * 0.2}s`;
      reviewCard.innerHTML = `
                <div class="review-header">
                    <img src="${review.avatar}" alt="${
        review.author
      }" class="review-avatar">
                    <div class="review-author">
                        <div class="author-name">
                            ${review.author}
                            ${
                              review.verified
                                ? '<span class="verified-badge">✓</span>'
                                : ""
                            }
                        </div>
                        <div class="author-role">${review.role}</div>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="star">${createStarRating(review.rating)}</div>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-date">${review.date}</div>
            `;
      reviewsGrid.appendChild(reviewCard);
    });

    // Populate business expansion section
    document.querySelector("#expansion h2").textContent =
      data.businessExpansion.title;
    document.querySelector(".expansion-subtitle").textContent =
      data.businessExpansion.subtitle;

    const expansionFeatures = document.querySelector(".expansion-features");
    data.businessExpansion.features.forEach((feature) => {
      const featureElement = document.createElement("div");
      featureElement.className = "expansion-feature animate-fade-in";
      featureElement.innerHTML = `
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
                <div class="expansion-requirements">
                    ${feature.requirements
                      .map(
                        (req) => `<div class="requirement-item">${req}</div>`
                      )
                      .join("")}
                </div>
            `;
      expansionFeatures.appendChild(featureElement);
    });
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

// Handle smooth scrolling for navigation links
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    const href = e.target.getAttribute("href");

    // Handle home page link
    if (href === "./") {
      e.preventDefault();
      window.location.href = href;
      return;
    }

    // Handle hash links (e.g. ./#how-to-play)
    if (href.includes("#")) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // If we're on the same page, smooth scroll
        if (
          window.location.pathname === "/" ||
          window.location.pathname.endsWith("index.html")
        ) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        } else {
          // If we're on a different page, navigate to home page with hash
          window.location.href = "./#" + targetId;
        }
      }
    }
  }
});

// Initialize content when DOM is loaded
document.addEventListener("DOMContentLoaded", loadContent);
