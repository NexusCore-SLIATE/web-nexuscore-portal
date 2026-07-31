function renderEvents(events) {
  const container = document.getElementById('upcoming-events');
  if (!container) return;

  container.innerHTML = events.map(event => `
    <article class="event-card">
      <span class="card-badge card-badge-accent" style="margin-bottom: var(--space-xs); align-self: flex-start;">
        ${event.type}
      </span>
      <h3 class="event-title">${event.title}</h3>
      <div class="event-metadata">
        <div style="margin-bottom: 3px;">📅 <strong>${new Date(event.date).toLocaleDateString()}</strong> | 🕒 <strong>${event.time}</strong></div>
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
