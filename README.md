# 🚀 web-nexuscore-portal (NexusCore-SLIATE)

Welcome to the official public gateway, student showcasing directory, and active engineering ecosystem portal for **NexusCore-SLIATE** (Advanced Technological Institute Badulla).

This portal acts as our primary institutional gateway to recruiters, sponsors, and incoming HNDIT (Higher National Diploma in Information Technology) students.

To maintain high responsiveness, modern developer ergonomics, and long-term maintainability across academic batches, the codebase is constructed entirely using **semantic Vanilla web platforms (HTML5, CSS3, and standard ES6+ JavaScript)**. It relies on absolutely zero heavy dependencies or external rendering frameworks, meaning it is instantly compatible with free, high-performance static hosting platforms like **GitHub Pages**.

---

## 🏛️ Repository Architecture

The repository enforces a decoupled architecture that isolates the semantic layout grids from the underlying JavaScript data stores and API integration layers. The frontend connects dynamically to backend services via the configuration defined in `config.js`:

```text
.
├── public/
│   ├── admin/                               # Admin panel
│   │   ├── dashboard.html                   # Admin dashboard screen
│   │   ├── login.html                       # Admin login screen
│   │   └── css/style.css
│   ├── assets/
│   │   └── images/
│   │       ├── avatar/
│   │       │   ├── 23-24/
│   │       │   │   └── [student-avatar].jpeg    # Student spotlight avatar graphics
│   │       │   └── readme.txt
│   │       ├── blog/
│   │       │   └── readme.txt                    # Writeup and session thumbnail placeholders
│   │       ├── logo-sliate.png                   # Official SLIATE institutional branding logo
│   │       └── projects/
│   │           ├── ctf.png                       # Project banner graphics
│   │           ├── retro_chess.png
│   │           ├── sentinelx.png
│   │           └── readme.txt
│   ├── css/
│   │   └── styles.css                            # Design tokens, layout grids, components, and media fallbacks
│   ├── index.html                                # Unified semantic layout, SEO, and form framework
│   └── js/
│       ├── api/
│       │   ├── blogs.api.js                      # Blog articles API integration
│       │   ├── events.api.js                     # Events/workshops API integration
│       │   ├── members.api.js                    # Member directory API integration
│       │   ├── projects.api.js                   # Projects ecosystem API integration
│       │   ├── stats.api.js                      # Statistics counter API integration
│       │   └── timeline.api.js                   # Community timeline API integration
│       ├── components/
│       │   ├── blogs.js                          # Blog rendering component
│       │   ├── events.js                         # Events rendering component
│       │   ├── members.js                        # Member cards rendering component
│       │   ├── projects.js                       # Project cards rendering component
│       │   ├── stats.js                          # Stats counter rendering component
│       │   └── timeline.js                       # Timeline rendering component
│       ├── config.js                             # API base URL and application configuration
│       ├── main.js                               # Application entry point and initialization
│       └── script.js                             # Dynamic card hydration engine and AJAX handlers
├── prisma/
│   └── schema.prisma                            # Database schema
└── src/                                         # Express backend (TypeScript)
    ├── config/                                  # Prisma client setup
    ├── controllers/                             # API route handlers
    ├── middleware/                              # Auth middleware
    ├── routes/                                  # Express API routes
    └── utils/                                   # Helpers (e.g. S3 uploads)
```

---

## 📩 Contact Form Integration

To facilitate secure inbound recruitment queries, the contact section is integrated with **Formspree**.

### Setup Instructions
1. **Paste your Form ID**: In `public/index.html`, locate the HTML form element inside the `#contact` section:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_FORM_ID_HERE" method="POST">
   ```
   Replace `YOUR_FORMSPREE_FORM_ID_HERE` with the unique form ID provided by Formspree.
2. **AJAX Intercept**: The central `script.js` intercepts submissions asynchronously. It validates email inputs, disables the submit button during sending states, displays a customized progress indicator, and shows a beautiful "Success! Message Sent" status banner dynamically without forcing page reloads.

---

## 🔌 Backend API Integration

The frontend connects to backend services through the configuration defined in `public/js/config.js`. The `API_BASE_URL` automatically detects the environment:

- **Local Development**: Points to `http://localhost:5000/api`
- **Production**: Dynamically resolves to `${window.location.origin}/api`

The modular API layer in `public/js/api/` handles data fetching for:
- **Members** (`members.api.js`) - Student directory and profiles
- **Projects** (`projects.api.js`) - Active project ecosystem
- **Events** (`events.api.js`) - Workshops and upcoming sessions
- **Blogs** (`blogs.api.js`) - Technical writeups and articles
- **Timeline** (`timeline.api.js`) - Community milestones
- **Stats** (`stats.api.js`) - Counter metrics and analytics

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

### Backend Server (required for API integration)

The Express backend serves both the frontend site and the admin panel.

```bash
npm install
npm run dev
```

The server runs on `http://localhost:5000`:
- Frontend site: `http://localhost:5000/`
- Admin panel: `http://localhost:5000/admin`

### Production Build

```bash
npm run build   # Compiles TypeScript into dist/
npm start       # Runs node dist/index.js
```

---

## 🔐 Database & Environment

Configure the following variables in `.env`:

```bash
DATABASE_URL=...            # PostgreSQL connection string
JWT_SECRET=...              # JWT signing secret for admin auth
S3_ENDPOINT=...             # Object storage endpoint
S3_REGION=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_BUCKET=...
```

Run database migrations and generate the Prisma client:

```bash
npx prisma generate
npx prisma db push
```

---

## 🚀 Deploying on Vercel

This project deploys as a zero-config Express app on Vercel (`src/index.ts` is the serverless entry; the `public/` folder is served automatically by Vercel's CDN).

1. **Environment variables**: Add the same variables from `.env` to your Vercel project (Settings → Environment Variables): `DATABASE_URL`, `JWT_SECRET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`.
2. **Domain**: Add `nexuscore.webredirect.org` in Vercel → Project → Settings → Domains.
3. **Push & deploy**: Connect the repository to Vercel, or run `npx vercel --prod`.

The frontend resolves the API automatically: on your deployed domain it calls the same origin (`https://nexuscore.webredirect.org/api`), and locally it uses `http://localhost:5000/api` — both come from the single `public/js/config.js`.

---

*Released under the MIT License. Contributions and security audits from HNDIT students are encouraged.*
