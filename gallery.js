(() => {
  function getByPath(path) {
    const parts = (path || "").split(".").filter(Boolean);
    let value = window.PHOTO_DATA;
    for (const part of parts) value = value?.[part];
    return value;
  }

  function renderPreview(container, collection) {
    if (!container || !collection) return;
    const title = collection.link
      ? `<a class="section-title-link" href="${collection.link}">${collection.title}</a>`
      : `<span>${collection.title}</span>`;

    const photos = collection.preview.map(photo => {
      const figure = `<figure>
          <img src="${photo.src}" alt="${photo.alt || ""}" loading="lazy">
          ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ""}
        </figure>`;
      return collection.link
        ? `<a class="preview-photo-link" href="${collection.link}">${figure}</a>`
        : figure;
    }).join("");

    container.innerHTML = `<h2>${title}</h2><div class="collection-preview-grid">${photos}</div>`;
  }

  document.querySelectorAll("[data-preview]").forEach(container => {
    renderPreview(container, window.PHOTO_DATA?.[container.dataset.preview]);
  });

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  let activeItems = [];
  let activePrefix = "";
  let currentPhoto = 0;

  function renderGallery(container, items, prefix) {
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = items.map((photo, index) => `
      <figure>
        <button class="photo-button" data-photo-index="${index}" aria-label="Open ${photo.alt || "photo"}">
          <img src="${prefix}${photo.src}" alt="${photo.alt || ""}" loading="lazy">
        </button>
        ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ""}
      </figure>`).join("");

    container.addEventListener("click", event => {
      const button = event.target.closest(".photo-button");
      if (!button) return;
      activeItems = items;
      activePrefix = prefix;
      openPhoto(Number(button.dataset.photoIndex));
    });
  }

  document.querySelectorAll("[data-gallery], [data-gallery-secondary]").forEach(container => {
    const path = container.dataset.gallery || container.dataset.gallerySecondary;
    renderGallery(container, getByPath(path), container.dataset.pathPrefix || "");
  });

  function openPhoto(index) {
    if (!lightbox || !activeItems.length) return;
    currentPhoto = index;
    const photo = activeItems[index];
    lightboxImage.src = activePrefix + photo.src;
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
    if (!activeItems.length) return;
    currentPhoto = (currentPhoto + direction + activeItems.length) % activeItems.length;
    openPhoto(currentPhoto);
  }

  closeButton?.addEventListener("click", closePhoto);
  prevButton?.addEventListener("click", () => stepPhoto(-1));
  nextButton?.addEventListener("click", () => stepPhoto(1));
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) closePhoto(); });

  document.addEventListener("keydown", event => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") stepPhoto(-1);
    if (event.key === "ArrowRight") stepPhoto(1);
  });
})();
