# Open Legends GitHub Pages Website

A responsive, single-page website for **Open Legends**, Brisbane Boys’ College’s RoboCupJunior Vision Soccer team.

## 1. Deploy to GitHub Pages

1. Create a GitHub repository, or open your existing website repository.
2. Upload everything in this folder to the repository root. `index.html` must be at the top level.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait a minute or two and open the Pages URL GitHub provides.

A blank `.nojekyll` file is included so GitHub serves the files directly.

## 2. Replace the team photos

The website is already wired for portrait photos with the 500 × 750 size you specified. Export each image as JPG and overwrite these exact files in `assets/`:

| Member | Exact filename |
|---|---|
| Jonathan Su | `jonathan-su.jpg` |
| Angelus An | `angelus-an.jpg` |
| Rupert Gooding | `rupert-gooding.jpg` |
| Thomas Morrison | `thomas-morrison.jpg` |

Keep the filenames and lowercase spelling exactly as shown. The current files are deliberate placeholders, so replacing them will update the website immediately.

## 3. Replace the larger photos

Overwrite these files in `assets/`:

- `team-group.jpg` — landscape team photo
- `competition-action.jpg` — strongest competition action photo
- `campaign-hero.jpg` — campaign/travel/team image
- `school-mark.jpg` — optional approved BBC logo or school mark
- `robot-hero.jpg` — clean robot render or studio photograph

Recommended size: at least 1600 px wide for landscape images.

## 4. Robot graphs, screenshots and renders

The supplied poster has been cropped into usable starter images. For sharper quality, export the original graphs and screenshots and overwrite these exact filenames:

- `robot-exploded.jpg` — exploded assembly render
- `mirror-development.jpg` — mirror profile graph or testing image
- `orbit-logic.jpg` — orbit angle / pixel-distance graphs
- `line-avoidance.jpg` — line cluster algorithm table or diagram
- `light-sensor-pcb.jpg` — circular sensor PCB layout
- `main-pcb-v1.jpg` — first main PCB revision
- `main-pcb-v2.jpg` — second main PCB revision
- `prototype-1.jpg` — Prototype 1 render/photo
- `prototype-2.jpg` — Prototype 2 render/photo
- `open-legends-poster.jpg` — full competition poster

JPG, PNG and WebP all work, but the HTML currently points to the extensions above. Either overwrite the exact file or update the matching `src="assets/..."` path in `index.html`.

## 5. Add the Autodesk Fusion 3D viewer

Autodesk Fusion can generate an embed code for a public model:

1. Open the design in the **Fusion Team Hub** or choose **View Details on Web** from Fusion.
2. Select **Share**.
3. Select **Embed** and choose a size.
4. Copy the generated iframe code.
5. From that code, copy only the URL inside `src="..."`.
6. Open `site-config.js` and paste that URL here:

```js
fusionEmbedUrl: "PASTE_THE_HTTPS_URL_HERE",
```

The website automatically replaces the animated placeholder with the live viewer.

### Important Fusion privacy note

A public Fusion link can expose the design to anyone with the link. Publish a cleaned copy of the robot and disable downloads where appropriate. Remove anything you do not want publicly visible before generating the embed.

## 6. Configure the 2026 campaign

Open `site-config.js` and edit:

```js
campaign: {
  raised: 0,
  target: 25000,
  currency: "AUD",
  donateUrl: "https://your-approved-campaign-page.example",
  contactFormUrl: "https://your-approved-contact-form.example"
}
```

The funding percentage and progress bar calculate automatically.

### Do not publish student emails

GitHub Pages is a static public website. Any email address placed in HTML, JavaScript or comments is visible in the source code, even when it is visually hidden or obfuscated. The provided student emails have therefore **not** been included anywhere in this website.

For public contact, use one of these instead:

- an approved school contact page;
- a Google Form managed by a teacher/team account;
- an approved fundraising platform contact form;
- a role-based address controlled by an adult or the school.

## 7. Change text or links

- Main page content: `index.html`
- Colours, layout and responsive design: `styles.css`
- Interactions and animations: `script.js`
- Fusion viewer, campaign numbers and public links: `site-config.js`

The main green is defined near the top of `styles.css` as `--green: #20e38b;`.

## 8. Recommended image export settings

- Team portraits: 500 × 750, JPG quality 85–92%
- Landscape photos: 1600 × 1000 or larger
- Graphs / PCB screenshots: PNG when text needs to remain sharp
- Robot renders: transparent WebP or PNG can also work after updating the file path
- Keep each file under roughly 1–2 MB when possible so the site loads quickly on mobile

## File structure

```text
open-legends-website/
├── index.html
├── styles.css
├── script.js
├── site-config.js
├── README.md
├── .nojekyll
└── assets/
    ├── jonathan-su.jpg
    ├── angelus-an.jpg
    ├── rupert-gooding.jpg
    ├── thomas-morrison.jpg
    ├── robot-hero.jpg
    ├── robot-exploded.jpg
    ├── mirror-development.jpg
    ├── orbit-logic.jpg
    ├── line-avoidance.jpg
    ├── light-sensor-pcb.jpg
    ├── main-pcb-v1.jpg
    ├── main-pcb-v2.jpg
    ├── prototype-1.jpg
    ├── prototype-2.jpg
    ├── team-group.jpg
    ├── competition-action.jpg
    ├── campaign-hero.jpg
    └── open-legends-poster.jpg
```
