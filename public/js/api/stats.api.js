async function getStats() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    return await response.json();
  } catch (error) {
    console.error("Stats API Error:", error);

    return [];
  }
}
