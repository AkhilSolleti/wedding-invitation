# 🪷 Traditional Hindu Wedding Invitation Template

A rich, mobile-first Indian/Hindu wedding invitation designed for GitHub Pages.

The visual direction uses:

- Temple maroon and antique gold
- Ivory parchment styling
- Floral / ornamental borders
- Om / Sanskrit elements
- Telugu typography
- Mandala animation
- Falling petals
- Parallax photography
- Animated scroll reveals
- Cinematic opening screen
- Background music with fade-in
- Music visualizer
- Wedding countdown
- Add-to-calendar `.ics` download
- Google Maps buttons
- Address copy button
- Story timeline
- Event cards
- Family section
- Telugu invitation panel
- RSVP section

## Folder structure

```text
hindu-wedding-invitation-template/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── hero.jpg
    ├── couple.jpg
    ├── story-1.jpg
    ├── story-2.jpg
    ├── story-3.jpg
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    ├── gallery-4.jpg
    ├── venue.jpg
    ├── pattern.svg
    └── wedding-music.mp3
```

## 1. Replace the placeholders

Open `index.html` and search for square brackets:

```text
[GROOM_NAME]
[BRIDE_NAME]
[WEDDING_DATE]
[WEDDING_CITY]
[VENUE_1]
[VENUE_ADDRESS_1]
[MAPS_URL_1]
...
```

Replace them with your own details.

You can search the whole file for:

```text
[
```

to find the placeholders quickly.

## 2. Set the wedding countdown

Open `script.js`.

Find:

```js
const COUNTDOWN_DATE = "2027-01-01T10:00:00";
```

Replace it with your actual wedding date and time.

Example:

```js
const COUNTDOWN_DATE = "2027-08-15T10:30:00";
```

The time should use 24-hour format.

## 3. Add your photographs

Replace the files in `assets/` with your own images.

Keep these filenames:

```text
hero.jpg
couple.jpg
story-1.jpg
story-2.jpg
story-3.jpg
gallery-1.jpg
gallery-2.jpg
gallery-3.jpg
gallery-4.jpg
venue.jpg
```

Recommended:

- Hero: 1600px+ wide
- Couple: portrait image
- Story: 4:3-ish images
- Gallery: any high-quality images
- Venue: landscape image

## 4. Add your music

Put your MP3 here:

```text
assets/wedding-music.mp3
```

Use audio that you are allowed to publish/share.

The website starts music after the visitor taps **Enter Invitation**. This is intentional because mobile browsers generally restrict autoplay with sound.

## 5. Google Maps

For each event, replace:

```text
[MAPS_URL_1]
[MAPS_URL_2]
[MAPS_URL_3]
```

with the Google Maps URL for that venue.

Also replace:

```text
[MAIN_MAPS_URL]
```

for the main venue.

## 6. RSVP

Replace:

```text
[RSVP_URL]
```

with a WhatsApp link, Google Form, form service, or another RSVP destination.

For a WhatsApp link, for example, use the appropriate WhatsApp click-to-chat URL for your number.

## 7. GitHub Pages

1. Create a new GitHub repository.
2. Upload everything inside this folder.
3. Open the repository's **Settings → Pages**.
4. Select the `main` branch and `/ (root)`.
5. Save.
6. GitHub will provide the public invitation URL.

## Design customization

The easiest colours to change are at the top of `style.css`:

```css
--maroon: #6d0f19;
--gold: #c79b3b;
--gold-light: #e5c66d;
--ivory: #fff8e9;
--cream: #f4e5c7;
--green: #365b35;
```

For a South Indian temple aesthetic, the current palette is intentionally warm and ceremonial.

## Notes

The template is deliberately built without a database or backend. Everything can be hosted as static files on GitHub Pages.
