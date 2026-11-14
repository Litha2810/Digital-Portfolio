
/* =========================================
   BOOK SWAP SA AGILE DIGITAL PORTFOLIO
   NAVIGATION + SHARED TRELLO EVIDENCE
========================================= */

// All portfolio pages
const pages = [
  "home",
  "team-charter",
  "user-stories",
  "product-backlog",
  "sprint-backlog",
  "agile-logbook"
];

const pageTitles = {
  "home": "Home",
  "team-charter": "Agile Team Charter",
  "user-stories": "User Stories and Tasks",
  "product-backlog": "Product Backlog",
  "sprint-backlog": "Sprint Backlog",
  "agile-logbook": "Agile Logbook"
};

/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage() {

  const requested = location.hash.slice(1);

  const selected = pages.includes(requested)
    ? requested
    : "home";

  // Show selected page
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle(
      "active",
      page.id === selected
    );
  });

  // Highlight active navigation link
  document.querySelectorAll(".nav-link").forEach(link => {
    const isActive =
      link.getAttribute("href") === "#" + selected;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Change the browser tab title
  document.title =
    pageTitles[selected] + " | Book Swap SA";

  // Return to top of selected page
  window.scrollTo(0, 0);
}

/* =========================================
   ORIGINAL TRELLO SCREENSHOTS
========================================= */

// One original source folder.
// Different portfolio sections reuse
// selected images from this same folder.

const trelloFolder = "evidence/product-backlog/";

const allTrelloScreenshots = Array.from(
  { length: 19 },
  (_, i) => `product-backlog-${i + 1}.jpeg`
);

/* =========================================
   USER STORIES EVIDENCE
========================================= */

// Selected screenshots from the original board.
// These show requirements-related activities,
// user stories, interface planning and development.

const userStoryEvidence = [
  {
    file: "product-backlog-7.jpeg",
    caption:
      "Sprint 3: Requirements and User Story Planning",
    explanation:
      "Shows the Create User Stories task and nearby system analysis activities."
  },
  {
    file: "product-backlog-8.jpeg",
    caption:
      "Sprint 3: Database and System Design",
    explanation:
      "Shows supporting tasks associated with planning the system."
  },
  {
    file: "product-backlog-10.jpeg",
    caption:
      "Sprint 4: Textbook Listings and Search Interface",
    explanation:
      "Shows interface design tasks related to the planned textbook features."
  },
  {
    file: "product-backlog-13.jpeg",
    caption:
      "Sprint 5: Textbook Listings and Search Functionality",
    explanation:
      "Shows development cards including Day 37: Search and Filter Functionality."
  }
];

/* =========================================
   SPRINT BACKLOG EVIDENCE
========================================= */

// The same Trello board provides
// evidence of planned sprint activities.

const sprintEvidence = [
  {
    file: "product-backlog-1.jpeg",
    caption:
      "Sprint 1: Project Initiation",
    explanation:
      "Shows early planning tasks, including problem statement and stakeholders."
  },
  {
    file: "product-backlog-4.jpeg",
    caption:
      "Sprint 2: Business Planning",
    explanation:
      "Shows planned business goals, business model and marketing activities."
  },
  {
    file: "product-backlog-7.jpeg",
    caption:
      "Sprint 3: System Analysis",
    explanation:
      "Shows requirements and user story planning."
  },
  {
    file: "product-backlog-10.jpeg",
    caption:
      "Sprint 4: UI/UX Design",
    explanation:
      "Shows prototype and interface design tasks."
  },
  {
    file: "product-backlog-13.jpeg",
    caption:
      "Sprint 5: Core Development",
    explanation:
      "Shows textbook listing, search and filtering development tasks."
  },
  {
    file: "product-backlog-15.jpeg",
    caption:
      "Sprint 6: Testing and Quality Assurance",
    explanation:
      "Shows testing activities including registration, login and textbook listings."
  },
  {
    file: "product-backlog-18.jpeg",
    caption:
      "Sprint 7: Project Finalisation",
    explanation:
      "Shows user manual, system review and final presentation tasks."
  }
];

/* =========================================
   AGILE LOGBOOK SCREENSHOTS
========================================= */

const logbookFolder = "evidence/agile-logbook/";

const logbookEvidence = [
  "01_July_14-17_Logbook_Tuesday.jpeg",
  "02_July_14-17_Logbook_Wednesday_Thrursday.jpeg",
  "03_July_14-17_Logbook_Friday.jpeg",
  "04_July_20-24_Logbook_Monday_Tuesday.jpeg",
  "05_July_20-24_Logbook_Wednesday_Thursday.jpeg",
  "06_July_20-24_Logbook_Friday.jpeg",
  "07_August_10-14_Logbook_Monday_Tuesday_Wednesday.jpeg",
  "08_August_10-14_Logbook_Thursday_Friday.jpeg"
];

/* =========================================
   CREATE IMAGE GALLERY
========================================= */

function createGallery(
  elementId,
  folder,
  items
) {

  const gallery = document.getElementById(elementId);

  if (!gallery) return;

  gallery.replaceChildren();

  if (items.length === 0) {
    const message = document.createElement("p");

    message.className = "gallery-message";
    message.textContent =
      "Original supporting evidence is not available.";

    gallery.appendChild(message);
    return;
  }

  items.forEach((item, index) => {

    // Accept either a filename or an
    // object containing file and caption.
    const fileName =
      typeof item === "string"
        ? item
        : item.file;

    const captionText =
      typeof item === "string"
        ? fileName
            .replace(/\.[^.]+$/, "")
            .replace(/_/g, " ")
        : item.caption;

    const explanation =
      typeof item === "string"
        ? ""
        : item.explanation || "";

    const imagePath =
      folder + encodeURIComponent(fileName);

    // Figure container
    const figure = document.createElement("figure");

    // Full-size image link
    const link = document.createElement("a");
    link.href = imagePath;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Image
    const image = document.createElement("img");
    image.src = imagePath;
    image.loading = "lazy";
    image.alt = captionText;

    // Caption
    const caption = document.createElement("figcaption");

    const heading = document.createElement("strong");
    heading.textContent =
      `Figure ${index + 1}: ${captionText}`;

    caption.appendChild(heading);

    if (explanation) {
      const detail = document.createElement("p");
      detail.textContent = explanation;
      caption.appendChild(detail);
    }

    // Missing image handling
    image.addEventListener("error", () => {
      figure.replaceChildren();
      figure.classList.add("gallery-message");
      figure.textContent =
        "Could not load " + fileName +
        ". Check the filename and folder.";
    });

    // Assemble image card
    link.appendChild(image);
    figure.append(link, caption);

    gallery.appendChild(figure);
  });
}

/* =========================================
   LOAD ALL EVIDENCE GALLERIES
========================================= */

function loadGalleries() {

  // User Stories: selected original Trello images
  createGallery(
    "user-stories-gallery",
    trelloFolder,
    userStoryEvidence
  );

  // Product Backlog: all 19 Trello images
  createGallery(
    "product-gallery",
    trelloFolder,
    allTrelloScreenshots
  );

  // Sprint Backlog: seven sprint examples
  createGallery(
    "sprint-gallery",
    trelloFolder,
    sprintEvidence
  );

  // Agile Logbook: eight dated records
  createGallery(
    "logbook-gallery",
    logbookFolder,
    logbookEvidence
  );
}

/* =========================================
   INITIALISE WEBSITE
========================================= */

function startWebsite() {

  // Display screenshot evidence
  loadGalleries();

  // Enable one-page-at-a-time navigation
  document.documentElement.classList.add("js-enabled");

  // Open Home or the selected page
  showPage();

  // Navigation changes
  window.addEventListener("hashchange", showPage);

  // Handle clicking the current page's link
  document.addEventListener("click", event => {

    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const target = link.getAttribute("href");

    if (
      pages.includes(target.slice(1)) &&
      target === location.hash
    ) {
      showPage();
    }
  });
}

// Start once HTML is loaded
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    startWebsite
  );
} else {
  startWebsite();
}
