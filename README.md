# Personal site

## Photo structure

`photos.html` is the main photo index and is organized by year.

Current layout:

```text
photos/

2026/
  grand bend/
  toronto autoshow v2/

2024/
  toronto autoshow v1/
```

The AutoShow headings and preview photos link to `photos/cars.html`.

`photos/cars.html` is one large car-photography page. It can hold sections such as:

```text
cars/

toronto autoshow/
  many photos

cars n coffee london on/
  many photos

misc/
  many photos
```

The car section headings are not links. The photos open in the lightbox.

## Adding images

Actual photo files live in `images/`.

Examples:

```text
images/2026/autoshow/01.jpg
images/2026/grand-bend/01.jpg
images/2024/autoshow/01.jpg
```

Edit `photos-data.js` to change:
- the three preview photos shown on the main photos page
- captions
- the full list of photos shown on the cars page
