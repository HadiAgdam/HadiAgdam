# Hadi Agdam — portfolio

A lightweight, dependency-free personal portfolio built with plain HTML, CSS, and JavaScript. It can be opened directly, served by VS Code Live Server, or published from the repository root on GitHub Pages.

## Local development

No installation or build step is required. Open `index.html` directly or use VS Code Live Server. A simple static server also works:

```bash
python -m http.server
```

The browser loads `styles.css`, `main.js`, and the images using relative paths, so the project works under the GitHub Pages project URL `/HadiAgdam/` without a Vite base-path configuration.

## GitHub Pages

In the repository’s **Settings → Pages**, choose the `main` branch and the `/ (root)` folder as the deployment source. No GitHub Actions workflow or build command is needed. Do not deploy the old `dist` folder or open a React/Vite source entry; this repository is now a static site.

GitHub Pages cannot run the old PHP mail endpoint, so contact is provided through the verified email, Telegram, GitHub, and LinkedIn links.

## Content

The portfolio preserves the verified information from the original site and profile: Hadi Agdam’s software engineering focus, Tabriz location, education, competition recognitions, skills, services, and public contact links. The source did not contain named projects or professional employment history, so those gaps are represented honestly in the interface rather than filled with invented claims.
