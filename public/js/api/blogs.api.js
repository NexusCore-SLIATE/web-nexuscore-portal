async function getBlogs() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/blogs`);

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return await response.json();
  } catch (error) {
    console.error("Blogs API Error:", error);

    return [];
  }
}
