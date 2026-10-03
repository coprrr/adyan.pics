# Personal site — v13

## Main photos page
Every main `photos/` entry has exactly 3 preview slots.

2026/
- grand bend canada/ -> `/photos/places#grand-bend`
- toronto autoshow v2/ -> `/photos/cars#toronto-autoshow`

2025/
- vct/ -> `/photos/events#vct`

2024/
- tobermory canada/ -> `/photos/places#tobermory`
- toronto autoshow v1/ -> `/photos/cars#toronto-autoshow`

2022/
- agra india/ -> `/photos/places#agra`

This anchor-link pattern is the blueprint for future entries:
`/photos/<compendium>#<section-id>`

## Mega-pages
Each section currently has 9 photo slots.

### cars/
- toronto autoshow/
- misc/

Cars & Coffee is NOT its own section anymore.
Put those one-off photos directly into `cars.misc` in `photos-data.js`.

### places/
- tobermory/
- grand bend/
- agra/

### events/
- vct/

## Replacing a placeholder with a real image
Change:

```js
{ src: "", caption: "caption 1", alt: "..." }
```

to:

```js
{ src: "/images/2026/example/01.jpg", caption: "your caption", alt: "..." }
```
