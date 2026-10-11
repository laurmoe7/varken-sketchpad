# Changelog

What changed in the sketchpad, newest first. The history before this repo existed is in the pet-shopper changelog (the sketchpad lines under Build 235 and later).

## Build 2
- Settings (Edit menu) has two tabs: Preferences and About Varken Sketchpad, with the version, game files copied, saved data size, copy details, check for updates and links.
- Help > About Varken Sketchpad.

## Windows program
- An installer (Releases) that puts the sketchpad on your computer as its own program, with automatic updates and a "restart now?" question when one is ready.

## Works on its own
- The game files it needs are copied into `game/`, with a script to refresh them (`node tools/sync-from-game.js`).

## Moved into its own repo
- The sketchpad now lives here and loads the game files from the game site.
