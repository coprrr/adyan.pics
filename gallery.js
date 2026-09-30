(() => {
  function renderPreview(container, collection) {
    if (!container || !collection) return;

    const linkStart = collection.link ? `<a class="section-title-link" href="${collection.link}">` : "";
    const linkEnd = collection.link ? `</a>` : "";

    const title = collection.link
      ? `${linkStart}${collection.title}${linkEnd}`
      : `<span>${collection.title}</span>`;

    const photos = collection.preview.map(photo => {
      const image = `
        <figure>
          <img src="${photo.src}" alt="${photo.alt || ""}" loading="lazy">
          ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ""}
        </figure>`;

      return collection.link
        ? `<a class="preview-photo-link" href="${collection.link}">${image}</a>`
        : image;
    }).join("");

    container.innerHTML = `
      <h2>${title}</h2>
      <div class="collection-preview-grid">${photos}</div>
    `;
  }

  document.querySelectorAll("[data-preview]").forEach(container => {
    const key = container.dataset.preview;
    renderPreview(container, window.PHOTO_DATA?.[key]);
  });

  const gallery = document.querySelector("[data-gallery]");
  const pathPrefix = gallery?.dataset.pathPrefix || "";
  const galleryPath = gallery?.dataset.gallery?.split(".") || [];

  let items = window.PHOTO_DATA;
  for (const key of galleryPath) {
    items = items?.[key];
  }
  items = Array.isArray(items) ? items : [];

  if (gallery) {
    gallery.innerHTML = items.map((photo, index) => `
      <figure>
        <button class="photo-button" data-photo-index="${index}" aria-label="Open ${photo.alt || "photo"}">
          <img src="${pathPrefix}${photo.src}" alt="${photo.alt || ""}" loading="lazy">
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
    lightboxImage.src = pathPrefix + photo.src;
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

  gallery?.addEventListener("click", event => {
    const button = event.target.closest(".photo-button");
    if (!button) return;
    openPhoto(Number(button.dataset.photoIndex));
  });

  closeButton?.addEventListener("click", closePhoto);
  prevButton?.addEventListener("click", () => stepPhoto(-1));
  nextButton?.addEventListener("click", () => stepPhoto(1));

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closePhoto();
  });

  document.addEventListener("keydown", event => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") stepPhoto(-1);
    if (event.key === "ArrowRight") stepPhoto(1);
  });
})();
