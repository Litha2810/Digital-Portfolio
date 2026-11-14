
// ===============================================
// BOOK SWAP SA — AGILE DIGITAL PORTFOLIO
// Navigation and Screenshot Error Checking
// ===============================================

// Page titles
const pageTitles = {
  home: "Home",
  "team-charter": "Agile Team Charter",
  "user-stories": "User Stories and Tasks",
  "product-backlog": "Product Backlog",
  "sprint-backlog": "Sprint Backlog",
  "agile-logbook": "Agile Logbook",
  documentation: "Project Documentation"
};

// Update selected navigation link
function updateNavigation() {
  const hash = decodeURIComponent(
    window.location.hash.substring(1)
  );

  const selectedPage =
    Object.prototype.hasOwnProperty.call(pageTitles, hash)
      ? hash
      : "home";

  document.title =
    `${pageTitles[selectedPage]} | Book Swap SA`;

  document.querySelectorAll(".nav-link").forEach(link => {
    const isActive =
      link.getAttribute("href") === `#${selectedPage}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// Check whether screenshot files are loading
function checkScreenshots() {
  const images =
    document.querySelectorAll(".evidence-card img");

  images.forEach(image => {
    const handleError = () => {
      const figure = image.closest("figure");

      if (!figure || figure.classList.contains("broken-image")) {
        return;
      }

      figure.classList.add("broken-image");

      const message = document.createElement("p");

      message.className = "image-error";

      message.textContent =
        "Screenshot could not load: " +
        decodeURIComponent(image.getAttribute("src")) +
        ". Check that the image is uploaded to " +
        "the correct GitHub folder and that its " +
        "filename matches exactly.";

      figure.appendChild(message);
    };

    image.addEventListener("error", handleError);

    // Detect images that failed before this event listener ran
    if (image.complete && image.naturalWidth === 0) {
      handleError();
    }
  });
}

// Initialise the website
function initialisePortfolio() {
  updateNavigation();
  checkScreenshots();

  window.addEventListener("hashchange", () => {
    updateNavigation();

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  });
}

// Start when the document is ready
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialisePortfolio
  );
} else {
  initialisePortfolio();
}
