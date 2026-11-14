
/* ======================================
   BOOK SWAP SA AGILE DIGITAL PORTFOLIO
   COMPLETE JAVASCRIPT
====================================== */

// Portfolio section IDs
const pageIds = [
  "home",
  "team-charter",
  "user-stories",
  "product-backlog",
  "sprint-backlog",
  "agile-logbook"
];

/* ======================================
   NAVIGATION
====================================== */

function showPage() {

  const hash = window.location.hash.slice(1);

  // Default to Home if the section is invalid
  const currentPage = pageIds.includes(hash)
    ? hash
    : "home";

  // Show the selected section
  document.querySelectorAll(".page-section")
    .forEach(section => {

      if (section.id === currentPage) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }

    });

  // Highlight the active navigation link
  document.querySelectorAll(".nav-link")
    .forEach(link => {

      const target = link.getAttribute("href");

      if (target === "#" + currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }

    });

  // Update title
  const titles = {
    home: "Home",
    "team-charter": "Agile Team Charter",
    "user-stories": "User Stories and Tasks",
    "product-backlog": "Product Backlog",
    "sprint-backlog": "Sprint Backlog",
    "agile-logbook": "Agile Logbook"
  };

  document.title =
    titles[currentPage] + " | Book Swap SA";

  // Scroll to top of the new page
  window.scrollTo(0, 0);
}

/* ======================================
   CLICKABLE LINKS
====================================== */

function setupNavigation() {

  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href").slice(1);

        // Only handle valid portfolio links
        if (!pageIds.includes(targetId)) {
          return;
        }

        event.preventDefault();

        // If already on the selected page,
        // reload that page's view
        if (window.location.hash === "#" + targetId) {
          showPage();
        } else {
          window.location.hash = targetId;
        }

      });

    });

  // Support browser Back and Forward buttons
  window.addEventListener("hashchange", showPage);
}

/* ======================================
   EVIDENCE SCREENSHOT FILENAMES
====================================== */

const evidenceFiles = {

  // Add actual user story screenshots here
  "user-stories": [],

  // Existing 19 Product Backlog screenshots
  "product-backlog": Array.from(
    { length: 19 },
    (_, i) => "product-backlog-" + (i + 1) + ".jpeg"
  ),

  // Add actual Sprint Backlog screenshots here
  "sprint-backlog": [],

  // Existing 8 Agile Logbook screenshots
  "agile-logbook": [
    "01_July_14-17_Logbook_Tuesday.jpeg",
    "02_July_14-17_Logbook_Wednesday_Thrursday.jpeg",
    "03_July_14-17_Logbook_Friday.jpeg",
    "04_July_20-24_Logbook_Monday_Tuesday.jpeg",
    "05_July_20-24_Logbook_Wednesday_Thursday.jpeg",
    "06_July_20-24_Logbook_Friday.jpeg",
    "07_August_10-14_Logbook_Monday_Tuesday_Wednesday.jpeg",
    "08_August_10-14_Logbook_Thursday_Friday.jpeg"
  ]
};

/* ======================================
   CREATE IMAGE GALLERIES
====================================== */

function createGallery(elementId, folderName, files) {

  const gallery = document.getElementById(elementId);

  if (!gallery) {
    return;
  }

  gallery.innerHTML = "";

  // Show message when no evidence exists
  if (files.length === 0) {

    const message = document.createElement("p");

    message.className = "gallery-message";

    message.textContent =
      "Supporting screenshots have not yet been added " +
      "to this section. Upload original project evidence " +
      "to display it here.";

    gallery.appendChild(message);

    return;
  }

  files.forEach((fileName, index) => {

    const imagePath =
      "evidence/" +
      folderName +
      "/" +
      encodeURIComponent(fileName);

    // Figure
    const figure = document.createElement("figure");

    // Link to original full-size image
    const link = document.createElement("a");

    link.href = imagePath;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Image element
    const img = document.createElement("img");

    img.src = imagePath;
    img.loading = "lazy";

    img.alt =
      folderName.replace(/-/g, " ") +
      " screenshot " +
      (index + 1);

    // Image caption
    const caption = document.createElement("figcaption");

    const readableName = fileName
      .replace(/\.[^.]+$/, "")
      .replace(/_/g, " ");

    caption.textContent =
      "Figure " +
      (index + 1) +
      ": " +
      readableName;

    // Missing file message
    img.addEventListener("error", () => {

      figure.innerHTML = "";

      const error = document.createElement("p");

      error.className = "gallery-message";

      error.textContent =
        "Image not found: " +
        fileName +
        ". Please check its folder and filename.";

      figure.appendChild(error);
    });

    // Assemble the image card
    link.appendChild(img);

    figure.appendChild(link);
    figure.appendChild(caption);

    gallery.appendChild(figure);

  });
}

/* ======================================
   LOAD SCREENSHOT GALLERIES
====================================== */

function loadGalleries() {

  createGallery(
    "user-stories-gallery",
    "user-stories",
    evidenceFiles["user-stories"]
  );

  createGallery(
    "product-gallery",
    "product-backlog",
    evidenceFiles["product-backlog"]
  );

  createGallery(
    "sprint-gallery",
    "sprint-backlog",
    evidenceFiles["sprint-backlog"]
  );

  createGallery(
    "logbook-gallery",
    "agile-logbook",
    evidenceFiles["agile-logbook"]
  );
}

/* ======================================
   INITIALISE WEBSITE
====================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Enable individual page navigation
  document.body.classList.add("js-ready");

  // Make all navigation links work
  setupNavigation();

  // Display selected page
  showPage();

  // Display evidence screenshots
  loadGalleries();

});
