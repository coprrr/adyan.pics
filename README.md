# adyan.pics

A deliberately simple personal website built with plain HTML, CSS, and a tiny bit of JavaScript.

## Files

- `index.html` — homepage
- `about.html` — about page
- `photos.html` — photo archive
- `projects.html` — projects page
- `log.html` — personal/site timeline
- `style.css` — shared styling
- `script.js` — small site scripts
- `images/` — put your photos here

## Run it locally

Just open `index.html` in your browser.

For a nicer local development experience, use VS Code + the Live Server extension.

## Add a real photo

1. Put the image inside `images/`, for example `images/london-night.jpg`.
2. In `photos.html`, replace a placeholder figure with:

```html
<figure>
  <img src="images/london-night.jpg" alt="London at night">
  <figcaption>london, ontario — september 2026</figcaption>
</figure>
```

3. Add this to `style.css` if it isn't already there:

```css
.photo-grid img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
```

## GitHub Pages

Once this is in a GitHub repository, you can enable GitHub Pages from:

Settings → Pages → Deploy from a branch → `main` / root

Then connect `adyan.pics` as a custom domain.

Before changing DNS at Spaceship, follow GitHub's current custom-domain instructions so you use the exact records GitHub gives you.
