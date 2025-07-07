# Haven Woodworks - Static Frontend Website

This project is a static, responsive website for "Haven Woodworks," a fictional woodworking business. It is built using only HTML, CSS, and vanilla JavaScript, with no external libraries or backend dependencies. The site is designed to be hosted on platforms like GitHub Pages.

## Live Demo (Example)

*(Once deployed, a link to the live GitHub Pages site would go here, e.g., `https://<your-username>.github.io/<repository-name>/`)*

## Core Features

*   **Hero Section:**
    *   Image carousel with 5 slides.
    *   Manual navigation (previous/next arrows, clickable dots).
    *   Auto-rotation every 5 seconds, pausing on hover.
    *   Smooth fade transition effect.
    *   Keyboard accessible (arrow keys for navigation).
*   **Product Gallery:**
    *   Responsive grid of product cards (3 columns on desktop, adjusting down to 1 on mobile).
    *   Hover effects on cards (zoom and shadow).
    *   Filter buttons ("All", "Furniture", "Custom Work", "Decor") using JavaScript and `data-*` attributes.
    *   Images use the `<picture>` element for `.webp` format with `.jpg` fallbacks.
    *   Lazy loading (`loading="lazy"`) implemented for gallery images.
*   **Contact Form:**
    *   Client-side validation for required fields (name, email, message) and valid email format.
    *   Submission handled via Formspree (requires user to set their own Formspree endpoint in `index.html`).
    *   User feedback on submission status (success/error).
*   **Mobile Navigation:**
    *   Hamburger toggle button for mobile devices.
    *   Smooth dropdown animation for the navigation menu.
    *   Menu closes on link click or when clicking outside the menu area.
*   **Responsive Design:**
    *   Layouts adapt to various screen sizes using Flexbox, CSS Grid, and media queries.
    *   Typography uses `rem` units for scalability.

## Bonus Features

*   **Dark Mode Toggle:**
    *   User-selectable dark and light themes.
    *   Preference saved to `localStorage`.
    *   Detects and applies system theme preference (`prefers-color-scheme`) if no user preference is set.
    *   Smooth transition between themes.
*   **Scroll-triggered Animations:**
    *   Sections (like Product Gallery and Contact Form) fade in as they are scrolled into view.
    *   Implemented using `IntersectionObserver` for performance.

## Technical Details

*   **No Dependencies:** Built entirely with vanilla HTML, CSS, and JavaScript (ES6+).
*   **Performance:**
    *   Optimized image strategy using `<picture>` and `.webp`.
    *   Lazy loading for offscreen images.
*   **Accessibility (A11y):**
    *   Semantic HTML elements (`<nav>`, `<section>`, appropriate heading levels).
    *   ARIA labels and attributes for carousel controls, mobile menu toggle, form validation, and dark mode toggle.
    *   Keyboard navigable interactive elements.
*   **Code Standards:**
    *   CSS: BEM-like naming convention (though not strictly enforced), CSS variables for theming and reusability.
    *   JavaScript: Modular functions, ES6 classes (for Carousel), event delegation where appropriate. Comments explain key logic.

## Project Structure

```
/haven-woodworks
├── index.html                # Main HTML file
├── README.md                 # This file
├── /assets
│   ├── /css
│   │   └── styles.css        # Main stylesheet with CSS variables
│   ├── /js
│   │   └── main.js           # Main JavaScript file (modular functions, Carousel class)
│   └── /images               # Optimized .webp + .jpg fallback images
│       ├── hero-1.jpg
│       ├── hero-1.webp
│       ├── ... (other hero images)
│       ├── product-1.jpg
│       ├── product-1.webp
│       └── ... (other product images)
```
*(Note: Actual image files are placeholders and need to be provided by the user for a real deployment. The image directory `assets/images` should be populated with these.)*

## Deployment Instructions for GitHub Pages

1.  **Ensure your repository is public.** GitHub Pages for free accounts requires the repository to be public.
2.  **Update Formspree Endpoint:** In `index.html`, find the line `action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"` (around line 217) and replace `YOUR_FORMSPREE_ENDPOINT` with your actual Formspree form ID.
3.  **Populate Images:** Add your desired images to the `assets/images/` directory. Ensure the filenames match those referenced in `index.html` for the carousel and product gallery (e.g., `hero-1.webp`, `hero-1.jpg`, `product-1.webp`, `product-1.jpg`, etc.).
4.  **Go to your repository settings.** Click on the "Settings" tab of your repository on GitHub.
5.  **Navigate to the "Pages" section.** In the left sidebar, click on "Pages" (under "Code and automation").
6.  **Configure the source.**
    *   Under "Build and deployment", for "Source", select "Deploy from a branch".
    *   Under "Branch", select your main branch (e.g., `main` or `master`).
    *   For the folder, select `/ (root)`.
7.  **Save changes.** Click "Save".
8.  **Wait for deployment.** GitHub Actions will build and deploy your site. This might take a few minutes.
9.  **Access your site.** Once deployed, the URL for your site will be displayed in the "Pages" settings (e.g., `https://<your-username>.github.io/<repository-name>/`).

## Future Enhancements (Ideas)

*   More detailed "About Us" or "Services" pages/sections.
*   Individual product detail modals or pages.
*   More sophisticated animations or micro-interactions.
*   Integration with a headless CMS for easier content management (would move beyond "static only").
```
