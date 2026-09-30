# Personal site

A deliberately simple personal website built with plain HTML, CSS, and JavaScript.

## Adding photos

You no longer need to edit gallery HTML.

### 1. Upload the photo

For example:

```text
images/2026/autoshow/05.jpg
```

### 2. Add one entry to `photos-data.js`

```js
{
  src: "images/2026/autoshow/05.jpg",
  caption: "Canadian International AutoShow — 2026",
  alt: "A red sports car at the auto show"
}
```

Put that entry inside the collection you want, such as `autoshow2026`.

That's it. The site automatically creates:
- the gallery tile
- the caption
- the clickable lightbox
- left/right keyboard navigation
- Esc-to-close

## Main photos page

`featured2026` controls the small curated selection shown on `photos/`.

So if the AutoShow has 30 photos, you can put all 30 in `autoshow2026`, but only copy your best 2–3 entries into `featured2026`.

## Photo quality

The site displays the same image file in the grid and lightbox, so it does not intentionally reduce image quality.

For now, upload high-quality JPEG/WebP files directly. If the archive gets large later, thumbnail generation can be automated without changing this photo-data workflow.
