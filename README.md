# Varken Sketchpad

A drawing page for making game art for **Fumufumu** ([pet-shopper](https://github.com/laurmoe7/pet-shopper)): skins, hats, clothes, toys, backgrounds and furniture, drawn as vector lines over a copy of the pet. Installable from Chrome as an app.

Live page: https://laurmoe7.github.io/varken-sketchpad/ (add `?owner=1` once on your own computer to turn on the upload buttons).

## How it fits with the game

The sketchpad has no copies of the game's files. It loads them live from the game's site, `https://laurmoe7.github.io/pet-shopper/` (set once in `index.html` as `window.SK_GAME`):

- `logic.js`, `wardrobe.js`, `skins.js`, `decor.js`, `backdrops.js`, `app-select.js` and `styles.css`
- the pet and toy drawings, read out of the game's `index.html` when the page opens

So new hats, skins, backgrounds and furniture in the game show up here by themselves, and this page only works while the game's site is up.

Uploads still go to the **`drawings` branch of `laurmoe7/pet-shopper`** (File > Send to Claude), because that is where they are read from.

## Files

- `index.html`, `sketch.js`, `sketch.css`: the page
- `manifest.webmanifest`, `sketch-icon*.{svg,png}`: the installable app
- `docs/notes.md`: detailed notes on every tool and menu

No build step. To run it locally: `python3 -m http.server`, then open http://localhost:8000/.

## Publishing

GitHub Pages serves the `main` branch (Settings > Pages > Deploy from a branch > `main`, `/ (root)`).

(Live page: https://laurmoe7.github.io/varken-sketchpad/.)
