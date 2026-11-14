
/* ========================================
   BOOK SWAP SA AGILE PORTFOLIO
   NAVIGATION AND EVIDENCE
======================================== */

// Portfolio pages
const pageTitles = {
  "home": "Home",
  "team-charter": "Agile Team Charter",
  "user-stories": "User Stories and Tasks",
  "product-backlog": "Product Backlog",
  "sprint-backlog": "Sprint Backlog",
  "agile-logbook": "Agile Logbook"
};

/* ========================================
   UPDATE ACTIVE NAVIGATION
======================================== */

function updateNavigation() {

  const requested = window.location.hash.slice(1);

  const selected = Object.hasOwn(pageTitles, requested)
    ? requested
    : "home";

  // Update browser title
  document.title =
    pageTitles[selected] + " | Book Swap SA";

  // Highlight selected menu item
  document.querySelectorAll(".nav-link")
    .forEach(link => {

      const isActive =
        link.getAttribute("href") === "#" + selected;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

    });

  // Return to top of the selected section
  window.scrollTo(0, 0);
}

/* ========================================
   ORIGINAL TRELLO EVIDENCE
======================================== */

// Reuse the same Trello board across
// User Stories, Product Backlog and Sprint Backlog.

const trelloFolder = "evidence/product-backlog/";

const productBacklog = Array.from(
  { length: 19 },
  (_, i) => "product-backlog-" + (i + 1) + ".jpeg"
);

// Selected User Stories evidence
const userStoryEvidence = [
  {
    file: "product-backlog-7.jpeg",
    caption: "Sprint 3 — User Stories and Requirements",
    note:
      "Shows the planning of user stories and " +
      "system requirements."
  },
  {
    file: "product-backlog-10.jpeg",
    caption: "Sprint 4 — Textbook Interface Planning",
    note:
      "Shows interface design tasks related " +
      "to textbook listings and search."
  },
  {
    file: "product-backlog-13.jpeg",
    caption: "Sprint 5 — Search and Filter Development",
    note:
      "Shows development activities related " +
      "to textbook search and filtering."
  }
];

// Selected Sprint Backlog evidence
const sprintBacklogEvidence = [
  {
    file: "product-backlog-1.jpeg",
    caption: "Sprint 1 — Project Initiation"
  },
  {
    file: "product-backlog-4.jpeg",
    caption: "Sprint 2 — Business Planning"
  },
  {
    file: "product-backlog-7.jpeg",
    caption: "Sprint 3 — System Analysis"
  },
  {
    file: "product-backlog-10.jpeg",
    caption: "Sprint 4 — UI/UX Design"
  },
  {
    file: "product-backlog-13.jpeg",
    caption: "Sprint 5 — Core Development"
  },
  {
    file: "product-backlog-15.jpeg",
    caption: "Sprint 6 — Testing and Quality Assurance"
  },
  {
    file: "product-backlog-18.jpeg",
    caption: "Sprint 7 — Project Finalisation"
  }
];

/* ========================================
   AGILE LOGBOOK EVIDENCE
======================================== */

const logbookFolder = "evidence/agile-logbook/";

const logbook = [
  "01_July_14-17_Logbook_Tuesday.jpeg",
  "02_July_14-17_Logbook_Wednesday_Thrursday.jpeg",
  "03_July_14-17_Logbook_Friday.jpeg",
  "04_July_20-24_Logbook_Monday_Tuesday.jpeg",
  "05_July_20-24_Logbook_Wednesday_Thursday.jpeg",
  "06_July_20-24_Logbook_Friday.jpeg",
  "07_August_10-14_Logbook_Monday_Tuesday_Wednesday.jpeg",
  "08_August_10-14_Logbook_Thursday_Friday.jpeg"
];

/* ========================================
   GENERATE SCREENSHOT GALLERIES
======================================== */

function renderGallery(id, folder, items) {

  const gallery = document.getElementById(id);

  if (!gallery) {
    return;
  }

  gallery.replaceChildren();

  items.forEach((item, index) => {

    const fileName =
      typeof item === "string" ? item : item.file;

    const captionText =
      typeof item === "string"
        ? fileName
            .replace(/\.[^.]+$/, "")
            .replaceAll("_", " ")
        : item.caption;

    const imagePath =
      folder + encodeURIComponent(fileName);

    // Figure
    const figure = document.createElement("figure");

    // Full-size image link
    const link = document.createElement("a");

    link.href = imagePath;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Image
    const img = document.createElement("img");

    img.src = imagePath;
    img.loading = "lazy";
    img.alt = captionText;

    // Handle missing image
    img.addEventListener("error", () => {

      figure.textContent =
        "Image unavailable: " + fileName +
        ". Check the folder and filename.";

      figure.classList.add("gallery-message");

    });

    // Image caption
    const caption = document.createElement("figcaption");

    const title = document.createElement("strong");

    title.textContent =
      "Figure " + (index + 1) + ": " + captionText;

    caption.appendChild(title);

    // Optional evidence explanation
    if (
      typeof item !== "string" &&
      item.note
    ) {

      const explanation = document.createElement("p");

      explanation.textContent = item.note;

      caption.appendChild(explanation);
    }

    // Assemble the card
    link.appendChild(img);

    figure.appendChild(link);
    figure.appendChild(caption);

    gallery.appendChild(figure);

  });
}

/* ========================================
   INITIALISE WEBSITE
======================================== */

function initialiseWebsite() {

  // User Stories evidence
  renderGallery(
    "user-stories-gallery",
    trelloFolder,
    userStoryEvidence
  );

  // Product Backlog evidence
  renderGallery(
    "product-gallery",
    trelloFolder,
    productBacklog
  );

  // Sprint Backlog evidence
  renderGallery(
    "sprint-gallery",
    trelloFolder,
    sprintBacklogEvidence
  );

  // Agile Logbook evidence
  renderGallery(
    "logbook-gallery",
    logbookFolder,
    logbook
  );

  // Highlight the selected page
  updateNavigation();

  // Respond to navigation changes
  window.addEventListener(
    "hashchange",
    updateNavigation
  );

  // Support clicking the current page again
  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", () => {

        if (
          link.getAttribute("href") ===
          window.location.hash
        ) {
          updateNavigation();
        }

      });

    });
}

// Run when HTML is ready
if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initialiseWebsite
  );

} else {

  initialiseWebsite();

}
