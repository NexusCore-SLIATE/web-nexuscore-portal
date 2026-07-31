async function getTimeline() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/timeline`);

    if (!response.ok) {
      throw new Error("Failed to fetch timeline");
    }

    return await response.json();
  } catch (error) {
    console.error("Timeline API Error:", error);

    return [];
  }
}
