# Ghost Neon Bestie Slideshow

A responsive friendship photo slideshow with a dark background, glowing neon-pink accents, and the signature MADE BY GHOST.

## Run it
1. Extract the ZIP.
2. Open the folder and double-click `index.html`.
3. Add an MP3 you are allowed to use to the `audio` folder and name it `background.mp3`.
4. Click **Open our memories**. The page starts the slideshow and attempts to start music on that click.

**Browser note:** browsers usually block sound autoplay until the visitor interacts with the page. Clicking the Enter button is the interaction that allows the script to attempt playback. If the song does not start, check that `audio/background.mp3` exists and click the music button.

## Add your photos
Put your photos in the `photos` folder. Open `script.js` and update the `slides` array at the top with matching image filenames, titles, and captions. JPG, PNG, and WebP are fine. Keep each filename exactly matched.

## Personalize
Edit welcome and friendship text in `index.html`; change colors in `style.css`; update slide titles and captions in `script.js`.

Files: `index.html` (structure), `style.css` (design), `script.js` (slideshow and music), `photos/` (placeholders), `audio/` (put `background.mp3` here).
