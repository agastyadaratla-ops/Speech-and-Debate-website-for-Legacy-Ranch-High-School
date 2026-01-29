# Legacy Ranch High School Debate – GitHub Pages Site

Official-style website for the **Legacy Ranch High School Debate Team** in **Liberty Hill, Texas**, built for GitHub Pages using Jekyll.

## Deployment

1. Create a new GitHub repository (for example: `legacy-ranch-debate-site`).
2. Copy all files and folders from this archive into the repository.
3. Commit and push to GitHub.
4. In your repository settings:
   - Go to **Pages**.
   - Set **Source** to `Deploy from a branch`.
   - Choose the `main` (or `master`) branch and the root (`/`) folder.
5. Wait a few minutes for GitHub Pages to build the site.
6. Visit the published URL shown in the Pages settings.

No additional configuration changes are required for GitHub Pages.

## Files you are expected to edit

To keep maintenance simple, you only need to edit these:

1. **Announcements (blog posts)**  
   - Folder: `_posts/`  
   - Files: `YYYY-MM-DD-title-of-post.md`  
   - Each file has YAML front matter and Markdown content.  
   - You can paste rich content from Google Docs (headings, bold, colors using inline HTML, etc.).

2. **Leaderboard data**  
   - File: `assets/data/leaderboard.csv`  
   - Columns: `Name,School,Points`  
   - The site automatically:
     - Reads this CSV on the client side
     - Sorts by `Points` (highest first)
     - Calculates rank numbers
   - Just update or add rows; no code changes needed.

3. **Google Calendar embed URL**  
   - File: `calendar.html`  
   - Find the `<iframe>` inside `.calendar-embed-wrapper`.  
   - Replace the `src` value with your Google Calendar embed URL.  
   - Do not change any other attributes or styles.

## Files you do **not** need to edit

- `_layouts/default.html`
- `_includes/nav.html`
- `index.html`
- `announcements.html`
- `officers.html`
- `leaderboard.html`
- `assets/css/style.css`
- `assets/js/main.js`
- `_config.yml`

These are already wired to work with GitHub Pages and the structure above.

## Images

Place your own images in:

- Logo: `assets/images/logo/`
- Officer headshots: `assets/images/officers/`
- Team photos / gallery: `assets/images/gallery/`

Update the filenames in `officers.html` if you change the officer image names.

---

Built with a modern navy/blue academic theme, card-based dashboard, smooth animations, and a CSV-driven leaderboard tailored for the Legacy Ranch High School Debate Team.