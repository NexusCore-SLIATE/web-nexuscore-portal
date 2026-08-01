async function loadPage() {
  const [members, projects, events, stats, timeline, blogs] = await Promise.all([
    getMembers(),
    getProjects(),
    getEvents(),
    getStats(),
    getTimeline(),
    getBlogs(),
  ]);

  renderMembers(members);
  renderProjects(projects);
  renderEvents(events);
  renderStats(stats);
  renderTimeline(timeline);
  renderBlogs(blogs);
}
