# Jennifer Jaison — Portfolio

A single-page portfolio: dark lavender glass UI, rotating hero word, scroll animations,
floating tech-skill cards and an animated stats panel.

## Structure

```
jennifer-portfolio/
├── index.html      # markup only
├── css/
│   └── style.css   # all styles
└── js/
    └── main.js     # all behaviour (loader, hero, marquees, stats, menu, modal)
```

## Run

Open `index.html` in a browser, or use the VS Code **Live Server** extension
(right-click `index.html` → *Open with Live Server*).

## Notes

- Needs an internet connection for the Onest font (Google Fonts) and the Lenis
  smooth-scroll script (jsDelivr CDN).
- The contact form is a demo: it shows a confirmation but sends nothing.
- Edit page text in `index.html`. Nav, projects, skills rows and stats arrays are near the top of `js/main.js`; the floating skill-card lists are near the bottom.
