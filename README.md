# 🚀 web-nexuscore-portal (NexusCore-SLIATE)

Welcome to the official public gateway, student showcasing directory, and active engineering ecosystem portal for **NexusCore-SLIATE** (Advanced Technological Institute Badulla).

This portal acts as our primary institutional gateway to recruiters, sponsors, and incoming HNDIT (Higher National Diploma in Information Technology) students. 

To maintain high responsiveness, modern developer ergonomics, and long-term maintainability across academic batches, the codebase is constructed entirely using **semantic Vanilla web platforms (HTML5, CSS3, and standard ES6+ JavaScript)**. It relies on absolutely zero heavy dependencies or external rendering frameworks, meaning it is instantly compatible with free, high-performance static hosting platforms like **GitHub Pages**.

---

## 🏛️ Flat Repository Architecture

The repository enforces a decoupled architecture that isolates the semantic layout grids from the underlying JavaScript data stores. Developers can easily manage community members, projects, blog writeups, and calendar timelines inside `script.js` without altering `index.html` structure:

```text
.
├── assets/
│   └── images/
│       ├── avatar/
│       │   ├── 23-24/
│       │   │   └── dulmina.jpeg   # Student spotlight avatar graphic
│       │   └── readme.txt
│       ├── blog/
│       │   └── readme.txt         # Writeup and session thumbnail placeholders
│       ├── logo-sliate.png        # Official SLIATE institutional branding logo
│       └── projects/
│           ├── ctf.png            # Active repository banner graphic
│           └── readme.txt
├── index.html                     # Unified semantic layout, SEO, and form framework
├── README.md                      # Portal documentation
├── script.js                      # Dynamic card hydration engine, data arrays, and AJAX contact handler
└── styles.css                     # Design tokens, layout grids, components, and media fallbacks
```

---

## 📩 Formspree Integration

To facilitate secure inbound recruitment queries, the contact section is integrated with **Formspree**. 

### Setup Instructions
1. **Paste your Form ID**: In `index.html`, locate the HTML form element inside the `#contact` section:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_FORM_ID_HERE" method="POST">
   ```
   Replace `YOUR_FORMSPREE_FORM_ID_HERE` with the unique form ID provided by Formspree.
2. **AJAX Intercept**: The central `script.js` intercepts submissions asynchronously. It validates email inputs, disables the submit button during sending states, displays a customized progress indicator, and shows a beautiful "Success! Message Sent" status banner dynamically without forcing page reloads.

---

## 🖼️ Defensive Media Handling & Fallbacks

Because student avatars and project banner graphics may be populated gradually, the portal includes robust media fail-safes:
* **Academic Branding Logo**: Instantly hides itself and presents a CSS logo fallback block if `logo-sliate.png` is absent.
* **Student Avatars**: If a student's profile graphic fails to load, the image is hidden, and a circular gradient displaying the student's name initials (e.g. `DH`) is rendered dynamically via CSS `attr(data-initials)`.
* **Projects & Blogs**: If a banner graphic fails to load, `script.js` hides the image and displays a stylized `.image-placeholder-fallback` box showing the exact project title inside a dashed gold trim.

---

## 🎨 Design System Tokens (ATI Badulla Aesthetic)

The portal implements custom design parameters defined inside `styles.css` using CSS custom properties:
* **Primary Deep Blue (`#14213D`)**: The institutional weight and authority background color.
* **Tech Blue Accent (`#2563EB`)**: Highlights key interactable nodes, hover glow parameters, and CTAs.
* **Accent Gold (`#FBBF24`)**: Highlights SLIATE banners, borders, timelines, and focus rings.
* **Soft Light Canvas (`#F8FAFC`)**: Establishes a clean, modern, and readable background.
* **Crisp Card Surface (`#FFFFFF`)**: Standard surface color for high-contrast slate typography.

---

## 🛠️ Local Development

To run this project locally, simply clone the repository and launch a local web server inside the root directory. 

For example, using **Node/npx**:
```bash
npx live-server ./
```

Or using **Python**:
```bash
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---
*Released under the MIT License. Contributions and security audits from HNDIT students are encouraged.*
