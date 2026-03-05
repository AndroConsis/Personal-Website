# Resume PDF Export Fix

## File
`/Users/socialprateek/Projects/Personal-Website/public/resume.html`

## Issue
When exporting to PDF (via browser print → Save as PDF, A4 size, margins: None),
there is leftover white space at the bottom of the page.

Previous attempts to fix it:
- Added `min-height: 297mm` to `.resume` in `@media print` → caused top content to get cut
- Added `min-height: 297mm` only to `.sidebar` in `@media print` → still not right

## Resume Layout
Two-column flex layout:
- `.sidebar` — dark navy (#0f172a), width: 248px, contains avatar, contact, skills, education, certs
- `.main` — white background, flex: 1, contains summary, experience, projects

## Current print CSS
```css
@media print {
  body { background: white; padding: 0; display: block; }
  .toolbar { display: none !important; }
  .resume { width: 210mm; box-shadow: none; border-radius: 0; }
  .sidebar { min-height: 297mm; }
  @page { size: A4 portrait; margin: 0; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
```

## Goal
The resume should fill exactly one A4 page (210mm × 297mm) with no white gap at the bottom,
no content cut at the top, and the dark sidebar should extend to the bottom of the page.
Background colors must be preserved (sidebar dark navy, skill bars green).

## What to try
- Scale the content to fit A4 using CSS `zoom` or `transform: scale()` on `.resume` in print
- Or adjust padding/font sizes so content naturally fills 297mm
- Or use `height: 297mm; overflow: hidden` on `.resume` and scale content down to fit

## Notes
- This is a plain static HTML file, no React/Next.js involved
- Export method: Chrome/Edge → Print → Save as PDF → A4 → Margins: None → Background graphics: ON
