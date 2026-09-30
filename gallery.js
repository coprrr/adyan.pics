(() => {
  const allCollections = window.PHOTO_COLLECTIONS || {};

  function resolvePath(path, prefix = "") {
    return prefix + path;
  }

  document.querySelectorAll("[data-collection-list]").forEach((container) => {
    const mode = container.dataset.collectionList;
    const prefix = container.dataset.pathPrefix || "";
    let collections = Object.entries(allCollections);

    if (mode !== "all") {
      collections = collections.filter(([, collection]) => collection.category === mode);
    }

    container.innerHTML = collections.map(([id, collection]) => {
      const previews = collection.preview.slice(0, 3).map((photo) => `
        <a class="collection-preview-photo" href="${prefix}${collection.href}">
          <img src="${resolvePath(photo.src, prefix)}" alt="${photo.alt || ""}" loading="lazy">
          ${photo.caption ? `<span>${photo.caption}</span>` : ""}
        </a>
      `).join("");

      return `
        <section class="collection-block">
          <h2><a href="${prefix}${collection.href}">${collection.title}</a></h2>
          <div class="collection-preview-grid">${previews}</div>
        </section>
      `;
    }).join("");
  });

  const gallery = document.querySelector("[data-gallery-collection]");
  const collectionId = gallery?.dataset.galleryCollection;
  const prefix = gallery?.dataset.pathPrefix || "";
  const collection = allCollections[collectionId];
  const items = collection?.images || [];

  if (gallery && collection) {
    gallery.innerHTML = items.map((photo, index) => `
      <figure>
        <button class="photo-button" data-photo-index="${index}" aria-label="Open ${photo.alt || "photo"}">
          <img src="${resolvePath(photo.src, prefix)}" alt="${photo.alt || ""}" loading="lazy">
        </button>
        ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ""}
      </figure>
    `).join("");
  }

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  let currentPhoto = 0;

  function openPhoto(index) {
    if (!lightbox || !items.length) return;
    currentPhoto = index;
    const photo = items[index];
    lightboxImage.src = resolvePath(photo.src, prefix);
    lightboxImage.alt = photo.alt || "";
    lightboxCaption.textContent = photo.caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePhoto() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";
  }

  function stepPhoto(direction) {
    if (!items.length) return;
    currentPhoto = (currentPhoto + direction + items.length) % items.length;
    openPhoto(currentPhoto);
  }

  gallery?.addEventListener("click", (event) => {
    const button = event.target.closest(".photo-button");
    if (!button) return;
    openPhoto(Number(button.dataset.photoIndex));
  });

  closeButton?.addEventListener("click", closePhoto);
  prevButton?.addEventListener("click", () => stepPhoto(-1));
  nextButton?.addEventListener("click", () => stepPhoto(1));

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closePhoto();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") stepPhoto(-1);
    if (event.key === "ArrowRight") stepPhoto(1);
  });
})();
