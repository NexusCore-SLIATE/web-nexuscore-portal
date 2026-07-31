 
async function getEvents() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/events`);

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return await response.json();
  } catch (error) {
    console.error("events API Error:", error);

    return [];
  }
}
