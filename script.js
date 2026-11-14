
const evidenceFiles = {

  "product-backlog": [
    "product-backlog-1.jpeg",
    "product-backlog-2.jpeg",
    "product-backlog-3.jpeg",
    "product-backlog-4.jpeg",
    "product-backlog-5.jpeg",
    "product-backlog-6.jpeg",
    "product-backlog-7.jpeg",
    "product-backlog-8.jpeg",
    "product-backlog-9.jpeg",
    "product-backlog-10.jpeg",
    "product-backlog-11.jpeg",
    "product-backlog-12.jpeg",
    "product-backlog-13.jpeg",
    "product-backlog-14.jpeg",
    "product-backlog-15.jpeg",
    "product-backlog-16.jpeg",
    "product-backlog-17.jpeg",
    "product-backlog-18.jpeg",
    "product-backlog-19.jpeg"
  ],

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

// Create screenshot galleries

function showGallery(id, folder, files) {
  const root = document.getElementById(id);

  if (!root) return;

  files.forEach((name, i) => {

    const path =
      `evidence/${folder}/${encodeURIComponent(name)}`;

    const figure = document.createElement("figure");

    const link = document.createElement("a");
    link.href = path;
    link.target = "_blank";
    link.rel = "noopener";

    const image = document.createElement("img");
    image.src = path;
    image.loading = "lazy";
    image.alt =
      `${folder.replace(/-/g, " ")} evidence ${i + 1}`;

    const caption = document.createElement("figcaption");

    caption.textContent =
      `Figure ${i + 1}: ` +
      name
        .replace(/\.[^.]+$/, "")
        .replace(/_/g, " ");

    link.appendChild(image);
    figure.append(link, caption);

    root.appendChild(figure);
  });
}

// Product Backlog screenshots

showGallery(
  "product-gallery",
  "product-backlog",
  evidenceFiles["product-backlog"]
);

// Agile Logbook screenshots

showGallery(
  "logbook-gallery",
  "agile-logbook",
  evidenceFiles["agile-logbook"]
);
