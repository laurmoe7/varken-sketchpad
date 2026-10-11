# Varken Sketchpad (repo: varken-sketchpad)

A standalone drawing page for Lauren (GitHub laurmoe7, Europe) to draw game art for Fumufumu (repo `laurmoe7/pet-shopper`). Plain web page, no build step, no dependencies. Notes on every tool and menu: `docs/notes.md` (read it before changing a feature).

- Files: `index.html`, `sketch.js`, `sketch.css`, `manifest.webmanifest`, icons.
- **The game's files are loaded live**, not copied: `logic.js`, `wardrobe.js`, `skins.js`, `decor.js`, `backdrops.js`, `app-select.js`, `styles.css` and the pet/toy drawings in `index.html` all come from `window.SK_GAME` (`https://laurmoe7.github.io/pet-shopper/`). Never copy them in. If the game renames or changes something this page uses (`PetLogic` functions such as `L.sketchSvg`, `L.fitCurve`, `L.traceLoops`, `L.offsetMask`, `Wardrobe`, `BACKDROPS`, the `#pet` and `#toy` elements), fix it here, or ask for it to be kept.
- Uploads go to the **`drawings` branch of `laurmoe7/pet-shopper`** (not this repo), as `drawings/<kind>-<mode>-<time>.svg` (plus `.strokes.json`, and `.item.js` for wardrobe items), with a token kept in her browser. When she says she uploaded something: read it with `get_file_contents` on `drawings/` at ref `drawings` of pet-shopper, redraw it cleanly as game-style SVG (not the raw strokes), compare it over the pet, and for an item check the `.item.js`, add real hover lines and paste it into `wardrobe.js` in pet-shopper.
- Tests: the sketchpad's logic tests live in pet-shopper (`tests/sketch.test.js`, run by `npm test` there) because they test `logic.js`. Check `node --check sketch.js` here, and try the page with Playwright (`/opt/node22/lib/node_modules/playwright`, `python3 -m http.server`).
- Work on the session branch; changes go live only when she says "big push": push to `main` (no pull request). She wants honest feedback, simple words, short replies.
- Keep a changelog line per change in `CHANGELOG.md` (a few words each).
- No scroll bars anywhere (she dislikes them); keep the kawaii night look; the pig mascot in the header stays.
