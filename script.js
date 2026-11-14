
/* =====================================
   BOOK SWAP SA AGILE PORTFOLIO
   NAVIGATION AND EVIDENCE GALLERIES
===================================== */

// All portfolio sections

const pageIds = [
  "home",
  "team-charter",
  "user-stories",
  "product-backlog",
  "sprint-backlog",
  "agile-logbook"
];

/* =====================================
   PAGE NAVIGATION
===================================== */

function showPage() {

  const requestedPage =
    window.location.hash.replace("#", "");

  // Open Home for missing or invalid section names
  const currentPage = pageIds.includes(requestedPage)
    ? requestedPage
    : "home";

  // Show the selected section
  document.querySelectorAll(".page-section")
    .forEach(section => {

      section.classList.toggle(
        "active",
        section.id === currentPage
      );

    });

  // Highlight the selected navigation link
  document.querySelectorAll(".nav-link")
    .forEach(link => {

      const linkPage =
        link.getAttribute("href").replace("#", "");

      const isActive = linkPage === currentPage;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

    });

  // Move back to top when opening a section
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  // Update the browser title
  const titles = {
    "home": "Home",
    "team-charter": "Agile Team Charter",
    "user-stories": "User Stories and Tasks",
    "product-backlog": "Product Backlog",
    "sprint-backlog": "Sprint Backlog",
    "agile-logbook": "Agile Logbook"
  };

  document.title =
    `${titles[currentPage]} | Book Swap SA`;
}

// Navigate using the browser hash
window.addEventListener("hashchange", showPage);

/* =====================================
   EVIDENCE FILES
===================================== */

// Files verified in the uploaded portfolio ZIP.
// Add new files to the empty arrays when uploaded.

const evidenceFiles = {

  "user-stories": [],

  "product-backlog": Array.from(
    { length: 19 },
    (_, index) => `product-backlog-${index + 1}.jpeg`
  ),

  "sprint-backlog": [],

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

/* =====================================
   GALLERY CAPTIONS
===================================== */

const galleryCaptions = {

  "product-backlog":
    "Product Backlog Trello Evidence",

  "agile-logbook":
    "Original Agile Logbook Record",

  "user-stories":
    "User Stories and Tasks Evidence",

  "sprint-backlog":
    "Sprint Backlog Evidence"

};

/* =====================================
   IMAGE GALLERY FUNCTION
===================================== */

function createGallery(galleryId, folderName, files) {

  const gallery = document.getElementById(galleryId);

  if (!gallery) {
    return;
  }

  // Avoid adding the same images twice
  gallery.innerHTML = "";

  // Show a message when screenshots haven't been added
  if (files.length === 0) {

    const message = document.createElement("p");

    message.className = "gallery-message";

    message.textContent =
      "Supporting screenshots have not yet been added " +
      "to this section. Original project evidence " +
      "will be displayed here once uploaded.";

    gallery.appendChild(message);

    return;
  }

  // Display each screenshot
  files.forEach((fileName, index) => {

    const imagePath =
      `evidence/${folderName}/` +
      encodeURIComponent(fileName);

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
    image.decoding = "async";

    image.alt =
      `${galleryCaptions[folderName]}, ` +
      `screenshot ${index + 1}`;

    // Caption
    const caption = document.createElement("figcaption");

    caption.textContent =
      `Figure ${index + 1}: ` +
      galleryCaptions[folderName];

    // Show a useful message for a missing image
    image.addEventListener("error", () => {

      figure.innerHTML = "";

      const errorMessage = document.createElement("p");

      errorMessage.className = "gallery-message";

      errorMessage.textContent =
        `Could not load: ${fileName}. ` +
        "Check the image filename and folder.";

      figure.appendChild(errorMessage);

    });

    // Assemble figure
    link.appendChild(image);

    figure.appendChild(link);
    figure.appendChild(caption);

    gallery.appendChild(figure);

  });

}

/* =====================================
   LOAD THE GALLERIES
===================================== */

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

/* =====================================
   START THE WEBSITE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  showPage();

  loadGalleries();

});
