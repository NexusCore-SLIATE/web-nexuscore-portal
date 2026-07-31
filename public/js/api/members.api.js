async function getMembers() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/members`);

    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    return await response.json();
  } catch (error) {
    console.error("Members API Error:", error);

    return [];
  }
}
