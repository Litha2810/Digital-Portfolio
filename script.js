
// =====================================
// BOOK SWAP SA AGILE PORTFOLIO
// NAVIGATION AND EVIDENCE GALLERIES
// =====================================

// Navigation still works as normal anchors
// if JavaScript is unavailable.

const pages = [
  "home",
  "team-charter",
  "user-stories",
  "product-backlog",
  "sprint-backlog",
  "agile-logbook"
];

// =====================================
// DISPLAY SELECTED PAGE
// =====================================

function displayPage() {

  const requested = decodeURIComponent(
    location.hash.slice(1)
  );

  const selected = pages.includes(requested)
    ? requested
    : "home";

  // Show the selected page
  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle(
      "active",
      section.id === selected
    );
  });

  // Highlight the navigation link
  document.querySelectorAll(".nav-link").forEach(link => {

    const active =
      link.getAttribute("href") === `#${selected}`;

    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Update page title
  const labels = {
    home: "Home",
    "team-charter": "Agile Team Charter",
    "user-stories": "User Stories and Tasks",
    "product-backlog": "Product Backlog",
    "sprint-backlog": "Sprint Backlog",
    "agile-logbook": "Agile Logbook"
  };

  document.title = `${labels[selected]} | Book Swap SA`;

  // Scroll to top after navigation
  window.scrollTo(0, 0);
}

// =====================================
// EVIDENCE SCREENSHOTS
// =====================================

const evidenceFiles = {

  // Add original user story images here
  "user-stories": [],

  // Existing Product Backlog screenshots
  "product-backlog": Array.from(
    { length: 19 },
    (_, i) => `product-backlog-${i + 1}.jpeg`
  ),

  // Add original Sprint Backlog images here
  "sprint-backlog": [],

  // Existing Agile Logbook screenshots
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

// =====================================
// CREATE SCREENSHOT GALLERY
// =====================================

function fillGallery(elementId, folder, names) {

  const gallery = document.getElementById(elementId);

  if (!gallery) return;

  gallery.replaceChildren();

  // Show a message if no screenshots exist
  if (names.length === 0) {

    const note = document.createElement("p");

    note.className = "gallery-message";

    note.textContent =
      "Original evidence screenshots can be " +
      "added here when available.";

    gallery.appendChild(note);

    return;
  }

  // Create each screenshot card
  names.forEach((name, i) => {

    const path =
      `evidence/${folder}/${encodeURIComponent(name)}`;

    // Screenshot container
    const figure = document.createElement("figure");

    // Full-size image link
    const link = document.createElement("a");

    link.href = path;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Screenshot image
    const img = document.createElement("img");

    img.src = path;
    img.loading = "lazy";

    img.alt =
      `${folder.replaceAll("-", " ")} evidence ${i + 1}`;

    // Caption
    const caption = document.createElement("figcaption");

    caption.textContent =
      `Figure ${i + 1}: ` +
      name
        .replace(/\.[^.]+$/, "")
        .replaceAll("_", " ");

    // Handle missing image files
    img.addEventListener("error", () => {

      figure.textContent =
        `Image unavailable: ${name}. ` +
        "Check the exact filename and folder.";

      figure.classList.add("gallery-message");
    });

    // Assemble screenshot card
    link.appendChild(img);

    figure.append(link, caption);

    gallery.appendChild(figure);
  });
}

// =====================================
// INITIALISE WEBSITE
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // Enable individual-page navigation
  document.documentElement.classList.add("js-enabled");

  // Load all evidence galleries
  fillGallery(
    "user-stories-gallery",
    "user-stories",
    evidenceFiles["user-stories"]
  );

  fillGallery(
    "product-gallery",
    "product-backlog",
    evidenceFiles["product-backlog"]
  );

  fillGallery(
    "sprint-gallery",
    "sprint-backlog",
    evidenceFiles["sprint-backlog"]
  );

  fillGallery(
    "logbook-gallery",
    "agile-logbook",
    evidenceFiles["agile-logbook"]
  );

  // Show Home or the requested section
  displayPage();

  // Navigate when the URL hash changes
  window.addEventListener("hashchange", displayPage);

  // Reopen the current page when its link
  // is clicked again
  document.addEventListener("click", event => {

    const link = event.target.closest('a[href^="#"]');

    if (
      link &&
      link.getAttribute("href") === location.hash
    ) {
      displayPage();
    }

  });

});

