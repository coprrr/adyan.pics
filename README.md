# Personal site

## Adding photos

The site is organized around **collections**.

Examples:
- Toronto AutoShow 2026
- Grand Bend
- Toronto AutoShow 2024

Actual image files go inside `images/`.

Example:

```text
images/
├── 2026/
│   ├── autoshow/
│   │   ├── 01.jpg
│   │   ├── 02.jpg
│   │   └── ...
│   └── grand-bend/
│       ├── 01.jpg
│       └── ...
└── 2024/
    └── autoshow/
        ├── 01.jpg
        └── ...
```

`photos-data.js` is the master list of collections and images.

Each collection has:
- a title
- category (`cars`, `places`, etc.)
- year
- 3 preview photos
- all gallery photos

The **photos/** landing page can show whichever collections you want to feature.

The **cars/** page automatically groups all collections whose category is `cars`, so a 2024 AutoShow and a 2026 AutoShow can live together there.

Gallery pages use a 3-column grid on desktop and a lightbox when a photo is clicked.
