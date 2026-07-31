function renderTimeline(timeline) {
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
