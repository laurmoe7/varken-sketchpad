# Changelog

What changed in the sketchpad, newest first. The history before this repo existed is in the pet-shopper changelog (the sketchpad lines under Build 235 and later).

## Build 8
- Normal eraser: a cut right through a line is now exact, so tidy straight lines keep their straight sides. Only a graze along an edge, or a small eraser inside a shape, is traced.

## Build 7
- Eraser list (Draw panel, replaces the Hard cuts tick): Normal rubs out exactly what it touches, from lines, shapes, brush lines and fills, holes and all; Clean cut bites along a line; Lines only is the old line eraser.

## Build 6
- Hard cuts: the cut edge now has the eraser's own shape (a round bite, or a straight line with the ruler) instead of a flat face at an angle.

## Build 5
- Eraser: Hard cuts (Draw panel, on): a cut line ends in a flat edge where the eraser cut it, and can be cut again. Pressure and brush lines are cut along their middle line too. Cut lines no longer shift. Ribbon shapes (pressure, brush and hard-cut lines) are saved exactly, not refitted.

## Build 4
- Eraser: hold Ctrl and drag for a straight edge, like a ruler (a dashed guide shows it). Cut ends now land exactly on the eraser's edge.
- Tidy works on brush lines and pressure lines too.

## Build 3
- Brushes (Draw panel, the Brush list): G-pen, Mapping pen, Brush pen, Calligraphy, Marker, Pencil, Rough pen, Bristle brush, Watercolour, Spray, Sparkles, Hearts and Bubbles, after the well-known Clip Studio Paint brushes. A brush line is saved as one filled shape.

## Build 2
- Settings (Edit menu) has two tabs: Preferences and About Varken Sketchpad, with the version, game files copied, saved data size, copy details, check for updates and links.
- Help > About Varken Sketchpad.

## Windows program
- An installer (Releases) that puts the sketchpad on your computer as its own program, with automatic updates and a "restart now?" question when one is ready.

## Works on its own
- The game files it needs are copied into `game/`, with a script to refresh them (`node tools/sync-from-game.js`).

## Moved into its own repo
- The sketchpad now lives here and loads the game files from the game site.
