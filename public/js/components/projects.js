function renderProjects(projects) {
  const container = document.getElementById('active-projects');
  if (!container) return;

  container.innerHTML = projects.map(project => `
    <article class="card project-card">
      <div class="project-banner-fallback" aria-hidden="true">
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
