// Function to format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Function to create news cards
function createNewsCard(news) {
  const card = document.createElement("article");
  card.className = "news-card animate-fade-in";

  card.innerHTML = `
    <img src="${news.image}" alt="${news.title}" class="news-card-image">
    <div class="news-card-content">
      <h2 class="news-card-title">${news.title}</h2>
      <div class="news-card-date">${formatDate(news.date)}</div>
      <p class="news-card-summary">${news.summary}</p>
      <div class="news-card-highlights">
        ${news.highlights
          .map(
            (highlight) => `<span class="news-highlight">${highlight}</span>`
          )
          .join("")}
      </div>
    </div>
  `;

  return card;
}

// Function to create featured article section
function createFeaturedArticle(article) {
  // Set header content
  document.querySelector(".featured-title").textContent = article.title;
  document.querySelector(".featured-subtitle").textContent = article.subtitle;

  // Set featured image
  const featuredImage = document.querySelector(".featured-image");
  featuredImage.style.backgroundImage = `url(${article.image})`;

  // Create sections
  const sectionsContainer = document.querySelector(".featured-sections");
  article.sections.forEach((section) => {
    const sectionElement = document.createElement("div");
    sectionElement.className = "featured-section animate-fade-in";
    sectionElement.innerHTML = `
      <div class="section-icon">${section.icon}</div>
      <div class="section-content">
        <h3 class="section-title">${section.title}</h3>
        <p class="section-text">${section.content}</p>
      </div>
    `;
    sectionsContainer.appendChild(sectionElement);
  });

  // Set conclusion
  const conclusionElement = document.querySelector(".featured-conclusion");
  conclusionElement.textContent = article.conclusion;
}

// Load news content
async function loadNewsContent() {
  try {
    const response = await fetch("./data/content.json");
    const data = await response.json();
    window.newsData = data.airTrafficNews;

    // Set page title and description
    document.querySelector(".news-title").textContent = newsData.pageTitle;
    document.querySelector(".news-description").textContent =
      newsData.description;

    // Load news cards
    const newsGrid = document.querySelector(".news-grid");
    newsData.news.forEach((news) => {
      newsGrid.appendChild(createNewsCard(news));
    });

    // Load featured article
    createFeaturedArticle(newsData.featuredArticle);
  } catch (error) {
    console.error("Error loading news content:", error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", loadNewsContent);
