/**
 * NexusCore-SLIATE Portal: Core Application & Dynamic Rendering Engine
 * ---------------------------------------------------------------------
 * Central view controller, data store, and AJAX-driven Formspree
 * asynchronous submission interceptor.
 */

// ==========================================================================
// A. CENTRAL DATA COLLECTIONS & PORTAL STORES
// ==========================================================================

// 1. Dynamic Counter Stats Block
const stats = [
  { label: 'Active Members',      target: 21,  suffix: '+', icon: 'users' },
  { label: 'Projects Hardened',   target: 0,  suffix: '+', icon: 'code' },
  { label: 'Core Contributors',   target: 0,   suffix: '+', icon: 'git-branch' },
  { label: 'Security Writeups',   target: 0,   suffix: '+', icon: 'shield' },
  { label: 'GitHub Repositories', target: 8,   suffix: '+', icon: 'github' }
];

// 2. SECTION 2: MEMBER SPOTLIGHT
const members = [
  {
    id: 'dulmina-hasith',
    name: 'Dulmina Hasith',
    batch: 'HNDIT 23/24 Batch',
    role: 'Founder & Security Lead',
    bio: 'Aspiring cybersecurity engineer focused on penetration testing, CTF exploitation, and security automation. Building custom audit scripts and technical writeups.',
    avatar: './assets/images/avatar/23-24/dulmina.jpeg',
    skills: ['Network Security', 'CTF & War Games', 'Security Tool', 'Linux Security',],
    githubUrl: 'https://github.com/GGdulmina',
    linkedinUrl: 'https://www.linkedin.com/in/dulmina-hasith-346b28357/',
    badge: 'Founder'
  },
];

// 3. Active Projects Ecosystem
const projects = [
  {
    id: 'nexus-ctf-framework',
    title: 'Capture The Flag (CTF)',
    description: 'A structured repository of custom exploit scripts, network privilege escalation workflows, and detailed encoding/decoding chains from Bandit and custom challenges.',
    image: './assets/images/projects/ctf.png',
    technologies: ['Python', 'Bash', 'OverTheWire', 'CTF'],
    repoUrl: 'https://github.com/GGdulmina/ctf-exploit-scripts-writeups',
    status: 'active',
    category: 'cybersecurity'
  },
  {
    id: 'retro_chess',
    title: 'RETRO_♟_CHESS',
    description: 'A fully functional, browser-based chess game — no frameworks, no backend, no dependencies. Built for clean gameplay, responsive design, and professional UI/UX.',
    image: './assets/images/projects/retro_chess.png',
    technologies: ['JavaScript', 'HTML/CSS', 'Minimax AI', 'Alpha-Beta Pruning'],
    repoUrl: 'https://github.com/GGdulmina/retro_chess',
    status: 'active',
    category: 'software-engineering'
  },
  {
    id: 'sentinelx',
    title: 'SentinelX',
    description: 'Linux-based real-time network monitoring tool with a GUI interface. Detects suspicious activities through automated log analysis, anomaly detection, and alerts users to potential threats for immediate action. ',
    image: './assets/images/projects/sentinelx.png',
    technologies: ['Python', 'Linux', 'Systemd', 'Bash', 'Regex'],
    repoUrl: 'https://github.com/GGdulmina/sentinelx',
    status: 'In-Progress',
    category: 'cybersecurity'
  },
];

// 4. Community Milestones Timeline
// *important for icons go to https://tabler.io/icons
const timeline = [
  {
    year: '2026',
    month: 'May',
    title: 'NexusCore Founded',
    description: 'NexusCore-SLIATE was officially founded by a passionate cohort of HNDIT software engineering and cybersecurity students at ATI Badulla.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
  },
  {
    year: '2026',
    month: 'June',
    title: 'First GitHub Projects',
    description: 'Launched our open-source organization on GitHub, pushing the CTF exploit scripts repository and attracting early contributors.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>'
  },
  {
    year: '2026',
    month: 'July',
    title: 'Linux & Server Hardening Bootcamp',
    description: 'Organized a 3-day hands-on bootcamp covering Wireshark packet captures, firewall configurations, and securing user permissions.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  }
];

// 5. Academic Calendar Workshops & Events
const events = [
{
    id: 'git-github-workshop',
    title: 'Git & GitHub Version Control Workshop',
    type: 'Hands-on Technical Session',
    date: '2026-06-15', // Tip: Replace with your actual scheduled date
    time: '09:00 AM - 12:00 PM',
    location: 'Main IT Laboratory, ATI Badulla',
    description: 'An intensive, hands-on workshop introducing student developers to industry-standard Git workflows. Participants will master branching strategies, repository collaboration, and open-source contributions to build a production-ready engineering mindset.',
    registrationUrl: '#home',
    badge: 'workshop'
  },
];

// 6. Technical Blogs & OSINT Writeups
const blogPosts = [
  {
    id: '##-####-##',
    title: '##',
    excerpt: '',
    author: 'NexusCore Sec/Dev Team',
    authorRole: 'Cybersecurity OR Software Unit',
    date: '2026-05-28',
    readingTime: 'read time',
    category: 'cybersecurity/software-engineering',
    tags: ['Privacy', 'Network Security'],
    thumbnail: './assets/images/blog/.jpg',
    url: ''
  },
];


// ==========================================================================
// B. SYSTEM DYNAMIC RENDER LOGIC
// ==========================================================================

// 1. Visual Metric Counters Count-Up
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(element => {
    const targetVal = parseInt(element.getAttribute('data-target'), 10) || 0;
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1800; 
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo function for premium feedback
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(ease * targetVal);
      
      element.textContent = currentVal + suffix;
      
      if (currentVal > 1) {
        element.classList.add('stat-number-color');
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = targetVal + suffix;
      }
    }
    requestAnimationFrame(update);
  });
}

function initStatsCounter() {
  const container = document.getElementById('stats-counter-grid');
  if (!container) return;

  container.innerHTML = stats.map(stat => `
    <div class="stat-card" role="group" aria-label="${stat.label} Counter">
      <div class="stat-number" data-target="${stat.target}" data-suffix="${stat.suffix}">0</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(container);
}

// 2. Member Directory Spotlight Render
function renderMembersList(searchQuery = '', batchFilter = 'all') {
  const container = document.getElementById('member-directory');
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  
  const filtered = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(query) || 
                          member.role.toLowerCase().includes(query) ||
                          member.skills.some(skill => skill.toLowerCase().includes(query));
    
    const matchesBatch = batchFilter === 'all' || member.batch.includes(batchFilter);
    return matchesSearch && matchesBatch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: var(--space-xl) 0;">
        <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">🔍</div>
        <h3 style="color: var(--primary-dark-blue); margin-bottom: var(--space-xs); font-family: var(--font-headings);">No matching members found</h3>
        <p style="color: var(--text-muted); margin-bottom: var(--space-md);">Try adjusting your search query or choosing another batch filter.</p>
        <button class="btn btn-primary btn-md" id="reset-member-action">Reset Search</button>
      </div>
    `;
    
    document.getElementById('reset-member-action')?.addEventListener('click', () => {
      const searchInput = document.getElementById('member-search-input');
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('#member-batch-filters .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
      });
      renderMembersList('', 'all');
    });
    return;
  }

  container.innerHTML = filtered.map(member => {
    const initials = member.name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return `
      <article class="card member-card">
        <div class="card-content-block">
          <div class="member-avatar-container" data-initials="${initials}" aria-hidden="true">
            <img src="${member.avatar}" alt="${member.name} Avatar" class="member-avatar-img" onerror="this.style.display='none';" loading="lazy" />
          </div>
          
          <span class="card-badge" style="margin: 0 auto var(--space-xs) auto; display: block; text-align: center;">
            ${member.badge}
          </span>
          
          <h3 class="card-main-title" style="text-align: center; font-size: 1.15rem; color: var(--primary-dark-blue);">${member.name}</h3>
          
          <div class="card-subtext" style="text-align: center; font-weight: 600; color: var(--tech-blue); margin-bottom: var(--space-sm);">
            ${member.batch}
          </div>
          
          <p class="member-bio">${member.bio}</p>
          
          <div class="tags-list" style="justify-content: center; margin-bottom: var(--space-md);">
            ${member.skills.map(skill => `<span class="tag-item">${skill}</span>`).join('')}
          </div>
          
          <div class="member-socials" style="margin-top: auto; padding-top: var(--space-sm); border-top: 1px solid rgba(20, 33, 61, 0.08);">
            <a href="${member.githubUrl}" target="_blank" rel="noopener noreferrer" class="member-social-link" title="Visit GitHub" aria-label="${member.name} GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="${member.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="member-social-link" title="Connect on LinkedIn" aria-label="${member.name} LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function initMemberFilters() {
  const searchInput = document.getElementById('member-search-input');
  const batchFilterGroup = document.getElementById('member-batch-filters');

  let query = '';
  let activeBatch = 'all';

  function triggerFilteredMembers() {
    const list = document.getElementById('member-directory');
    if (!list) return;

    list.style.opacity = '0.3';
    list.style.transform = 'translateY(8px)';
    list.style.transition = 'all 0.15s ease-out';
    
    setTimeout(() => {
      renderMembersList(query, activeBatch);
      list.style.opacity = '1';
      list.style.transform = 'translateY(0)';
    }, 120);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value;
      triggerFilteredMembers();
    });
  }

  if (batchFilterGroup) {
    batchFilterGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      batchFilterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeBatch = btn.getAttribute('data-filter');
      triggerFilteredMembers();
    });
  }
}

// 3. Project Grid Render
function renderProjectsList(filterCategory = 'all') {
  const container = document.getElementById('active-projects');
  if (!container) return;

  const filtered = filterCategory === 'all'
    ? projects
    : projects.filter(project => project.category === filterCategory);

  container.innerHTML = filtered.map(project => `
    <article class="card project-card">
      <div class="project-banner-fallback" aria-hidden="true">
        <!-- Defensive Media Implementation: hides image and triggers customized fallback style on fail -->
        <img src="${project.image}" alt="${project.title} Banner" class="project-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" loading="lazy" />
        <div class="image-placeholder-fallback" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:0;">
          ${project.title}
        </div>
      </div>
      <div class="card-content-block">
        <span class="card-badge card-badge-accent">
          ${project.status}
        </span>
        <h3 class="card-main-title">${project.title}</h3>
        <p class="card-body-description">${project.description}</p>
        <div class="tags-list">
          ${project.technologies.map(tech => `<span class="tag-item">${tech}</span>`).join('')}
        </div>
        <div class="card-action-footer">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="card-link-btn" aria-label="Explore ${project.title} code">
            View Repository <span>&rarr;</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

function initProjectFilters() {
  const filterGroup = document.getElementById('project-filters');
  if (!filterGroup) return;

  filterGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterCategory = btn.getAttribute('data-filter');
    const list = document.getElementById('active-projects');
    
    if (list) {
      list.style.opacity = '0.3';
      list.style.transform = 'translateY(8px)';
      list.style.transition = 'all 0.15s ease-out';
      
      setTimeout(() => {
        renderProjectsList(filterCategory);
        list.style.opacity = '1';
        list.style.transform = 'translateY(0)';
      }, 120);
    }
  });
}

// 4. Milestone Timeline Render
function renderTimeline() {
  const container = document.getElementById('community-timeline');
  if (!container) return;

  container.innerHTML = timeline.map(node => `
    <div class="timeline-node">
      <div class="timeline-dot" aria-hidden="true">
        ${node.icon}
      </div>
      <div class="timeline-card">
        <span class="timeline-date-marker">${node.month} ${node.year}</span>
        <h3 class="timeline-card-title">${node.title}</h3>
        <p class="timeline-card-desc">${node.description}</p>
      </div>
    </div>
  `).join('');
}

// 5. Events Calendar & Workshops Render
function renderEvents() {
  const container = document.getElementById('upcoming-events');
  if (!container) return;

  container.innerHTML = events.map(event => `
    <article class="event-card">
      <span class="card-badge card-badge-accent" style="margin-bottom: var(--space-xs); align-self: flex-start;">
        ${event.type}
      </span>
      <h3 class="event-title">${event.title}</h3>
      <div class="event-metadata">
        <div style="margin-bottom: 3px;">📅 <strong>${event.date}</strong> | 🕒 <strong>${event.time}</strong></div>
        <div>📍 <strong>${event.location}</strong></div>
      </div>
      <p class="event-desc">${event.description}</p>
      <div style="margin-top: auto; padding-top: var(--space-sm); border-top: 1px solid rgba(20,33,61,0.06);">
        <a href="${event.registrationUrl}" class="btn btn-sm btn-accent" style="width: 100%; text-align: center; text-transform: uppercase;">
          Register / RSVP
        </a>
      </div>
    </article>
  `).join('');
}

// 6. Blog Writeups Render
function renderBlogs() {
  const container = document.getElementById('blog-articles');
  if (!container) return;

  // Gracefully handle empty or placeholder posts (e.g. title starts with '#' or is '##')
  const hasRealPosts = blogPosts.length > 0 && blogPosts.some(post => post.title && post.title !== '##' && !post.title.startsWith('#'));
  if (!hasRealPosts) return;

  container.innerHTML = blogPosts.map(post => `
    <article class="card blog-card">
      <div class="project-banner-fallback" style="height: 140px;" aria-hidden="true">
        <!-- Defensive Media Implementation for Blog -->
        <img src="${post.thumbnail}" alt="${post.title} Banner" class="project-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" loading="lazy" />
        <div class="image-placeholder-fallback" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:0;">
          ${post.title}
        </div>
      </div>
      <div class="card-content-block">
        <span class="card-badge">${post.category}</span>
        <h4 class="card-main-title" style="margin-top: 0.2rem; font-size: 1.1rem; line-height: 1.3;">${post.title}</h4>
        <div class="card-subtext" style="color: var(--text-muted); font-weight: 500; font-size: 0.75rem; margin-bottom: var(--space-xs);">
          By ${post.author} • ${post.readingTime}
        </div>
        <p class="card-body-description" style="font-size: 0.85rem; height: 3.8rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
          ${post.excerpt}
        </p>
        <div class="tags-list">
          ${post.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('')}
        </div>
        <div class="card-action-footer">
          <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="card-link-btn" style="font-size: 0.75rem;">
            Read writeup <span>&rarr;</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}


// ==========================================================================
// C. SCROLL INTERACTIONS & RESPONSIVE DRAWER
// ==========================================================================

function initHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

function initScrollProgress() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPos = window.scrollY;
    const percentage = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
    indicator.style.width = `${percentage}%`;
  });
}

function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-hamburger-btn');
  const drawer = document.getElementById('mobile-navigation');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link, .mobile-drawer-btn');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.classList.toggle('open', !isExpanded);
    drawer.setAttribute('aria-hidden', isExpanded);
  }

  toggleBtn.addEventListener('click', toggleMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
}

function initScrollspy() {
  const desktopLinks = document.querySelectorAll('.primary-nav .nav-link');
  const sections = document.querySelectorAll('main > section');

  if (desktopLinks.length === 0 || sections.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentActiveSectionId = '';
    const scrollPosOffset = window.scrollY + 120; 

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosOffset >= top && scrollPosOffset < top + height) {
        currentActiveSectionId = section.getAttribute('id') || '';
      }
    });

    if (currentActiveSectionId) {
      desktopLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function initCurrentYear() {
  const span = document.getElementById('footer-year');
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
}


// ==========================================================================
// D. CONTACT FORM CONTROLLER (FORMSPREE INTEGRATION ENGINE)
// ==========================================================================
function initContactForm() {
  const contactForm = document.querySelector('#contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusContainer = document.querySelector('#form-status');

  if (!contactForm || !statusContainer) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset status classes
    statusContainer.className = 'form-status';
    statusContainer.setAttribute('hidden', '');
    
    // Basic Form validation
    const data = new FormData(contactForm);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const message = data.get('message').trim();

    if (!name || !email || !message) {
      statusContainer.textContent = "⚠️ Please complete all required inputs (Name, Email, and Message).";
      statusContainer.className = "form-status error";
      statusContainer.removeAttribute('hidden');
      return;
    }

    // Disable submission interaction
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Message...";
    
    statusContainer.textContent = "🚀 Submitting form secure handshake...";
    statusContainer.className = "form-status info";
    statusContainer.removeAttribute('hidden');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        statusContainer.textContent = "[id43@id43] Thanks! Your message has been sent successfully. We will get back to you soon.";
        statusContainer.className = "form-status success";
        contactForm.reset();
      } else {
        const result = await response.json();
        statusContainer.textContent = `❌ Submission Error: ${result.errors ? result.errors.map(err => err.message).join(', ') : 'Verification failure.'}`;
        statusContainer.className = "form-status error";
      }
    } catch (error) {
      console.error('Submission handshaking error:', error);
      statusContainer.textContent = "❌ Network Error: Unable to reach mail server. Check connection or mail us directly.";
      statusContainer.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Secure Message";
      statusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}


// ==========================================================================
// E. CORE INITIALIZATION ROUTINE ON DOM LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Scroller binds
  initHeaderScrollEffect();
  initScrollProgress();
  initMobileNavigation();
  initScrollspy();
  initCurrentYear();

  // Cards Hydration loops
  initStatsCounter();
  renderMembersList();
  initMemberFilters();
  renderProjectsList();
  initProjectFilters();
  renderTimeline();
  renderEvents();
  renderBlogs();

  // Secure Formspree controller
  initContactForm();

  // Animation triggers
  initScrollReveal();
});
