function renderBlogs(blogPosts) {
  const container = document.getElementById('blog-articles');
  if (!container) return;

  const hasRealPosts = blogPosts.length > 0 && blogPosts.some(post => post.title && post.title !== '##' && !post.title.startsWith('#'));
  if (!hasRealPosts) return;

  container.innerHTML = blogPosts.map(post => `
    <article class="card blog-card">
      <div class="project-banner-fallback" style="height: 140px;" aria-hidden="true">
        <img src="${post.thumbnail}" alt="${post.title} Banner" class="project-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" loading="lazy" />
        <div class="image-placeholder-fallback" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:0;">
          ${post.title}
        </div>
      </div>
      <div class="card-content-block">
        <span class="card-badge">${post.category}</span>
        <h4 class="card-main-title" style="margin-top: 0.2rem; font-size: 1.1rem; line-height: 1.3;">${post.title}</h4>
        <div class="card-subtext" style="color: var(--text-muted); font-weight: 500; font-size: 0.75rem; margin-bottom: var(--space-xs);">
          By ${post.authorName} &bull; ${post.readingTime}
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
