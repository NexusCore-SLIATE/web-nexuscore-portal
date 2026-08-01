 

 
async function getProjects() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/projects`);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return await response.json();
  } catch (error) {
    console.error("projects API Error:", error);

    return [];
  }
}
