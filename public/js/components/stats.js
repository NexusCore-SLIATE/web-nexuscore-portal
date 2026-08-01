function renderStats(stats) {
  const container = document.getElementById('stats-counter-grid');
  if (!container) return;

  container.innerHTML = stats.map(stat => `
    <div class="stat-card" role="group" aria-label="${stat.label} Counter">
      <div class="stat-number" data-target="${stat.target}" data-suffix="${stat.suffix}">0</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}
