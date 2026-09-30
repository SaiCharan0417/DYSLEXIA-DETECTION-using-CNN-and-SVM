# DyslexiaLens — Standalone Frontend (no backend connection)

This version is intentionally **frontend-only**. It does not call FastAPI. All sign-in, sign-up, upload, analysis, reports and theme interactions work locally in the browser.

## Project flow
Landing → Sign In → Sign Up → Dashboard → Upload → Demo Analysis → Final Report

## Included
- Emerald Ink `#064E3B` + Champagne `#F8E7C9`
- Modern landing page
- Sign in / Sign up / Google UI placeholder
- Dashboard greeting
- Total analyses
- Reports and recent screening activity bar graph
- Upload + drag/drop + preview
- Demo analysis without backend
- Final report with prediction, confidence and class probabilities
- What the model looked at
- Attention / Grad-CAM placeholder
- Recommended Activities
- Important Notice
- Print / Save Report
- Settings: Appearance only (Light/Dark) + Account
- No History page
- No Notifications section in Settings
- No Backend Connection section in Settings

## Backend handoff contract
`script.js` contains `BACKEND_CONTRACT` with the endpoints/fields expected from the uploaded FastAPI project. It is documentation only in this version.

Later, your teammate can replace the demo block in `runDemoAnalysis()` with a `fetch()` call to `/predict`, and use `/register`, `/login`, and `/history` as needed.

## Run
Use VS Code Live Server, or:

```bash
python -m http.server 5500
```

Then open `http://127.0.0.1:5500`.
