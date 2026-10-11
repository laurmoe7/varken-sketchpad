# Varken Sketchpad

A drawing page for making game art for **Fumufumu** ([pet-shopper](https://github.com/laurmoe7/pet-shopper)): skins, hats, clothes, toys, backgrounds and furniture, drawn as vector lines over a copy of the pet. Installable from Chrome as an app.

Live page: https://laurmoe7.github.io/varken-sketchpad/ (add `?owner=1` once on your own computer to turn on the upload buttons).

## How it fits with the game

The sketchpad works on its own: everything it needs is in this repo, in `game/` (a snapshot of the game's files):

- `logic.js`, `wardrobe.js`, `skins.js`, `decor.js`, `backdrops.js`, `app-select.js` and `styles.css`
- `source.html`: just the pet and toy drawings, cut out of the game's `index.html`

When the game gets new hats, skins, backgrounds, furniture or pet changes you want to draw over, refresh the snapshot: `node tools/sync-from-game.js` (downloads from the game's site) or `node tools/sync-from-game.js ../pet-shopper` (from a local checkout), then commit `game/`. Until then the sketchpad keeps showing the game as it was at the last sync.

Uploads still go to the **`drawings` branch of `laurmoe7/pet-shopper`** (File > Send to Claude), because that is where they are read from.

## Install it on your computer (Windows)

Download `Varken-Sketchpad-Setup-….exe` from the repo's **Releases** and double-click it. Windows says "Windows protected your PC" because the program is not signed: **More info**, then **Run anyway**. It installs for you only (no admin) and starts the sketchpad in its own window, with its own icon, no browser around it. Everything is inside the installer, so it works offline (the AI cut-out model still needs the internet the first time, and uploads to GitHub need it).

- It updates itself: every change to the page builds a new release (Actions > "Build the desktop app (Windows)"), and installed copies download it quietly and install it when you close the program.
- It has its own saved data. Your drawings, preferences and GitHub token from the browser version are not in it: use File > Save project in the browser first and File > Open project here, and paste the token again (File > GitHub connection).
- The desktop program is `desktop/main.js` (a small Electron shell that serves the page's own files under `sketch://app/`), with `package.json` (the build settings) and `.github/workflows/desktop.yml`. To try it on a computer with Node: `npm install`, then `npm start`.

## Files

- `index.html`, `sketch.js`, `sketch.css`: the page
- `desktop/main.js`, `package.json`, `build/icon.png`: the Windows program
- `game/`: the copied game files (see above); `tools/sync-from-game.js` refreshes them
- `manifest.webmanifest`, `sketch-icon*.{svg,png}`: the installable app
- `docs/notes.md`: detailed notes on every tool and menu

No build step. To run it locally: `python3 -m http.server`, then open http://localhost:8000/.

## Publishing

GitHub Pages serves the `main` branch (Settings > Pages > Deploy from a branch > `main`, `/ (root)`).

(Live page: https://laurmoe7.github.io/varken-sketchpad/.)
