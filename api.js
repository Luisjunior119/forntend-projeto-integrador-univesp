function showLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  if (loadingContainer) {
    loadingContainer.style.display = "flex";
  }
}

function hideLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  if (loadingContainer) {
    loadingContainer.style.display = "none";
  }
}

async function fetchONGs() {
  try {
    showLoading();
    const response = await fetch("http://localhost:3000/ongs?status=ativo");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ONGs:", error);
    return [];
  } finally {
    hideLoading();
  }
}

async function fetchONGById(id) {
  try {
    showLoading();
    const ongs = await fetchONGs();
    return ongs.find((ong) => ong._id === id);
  } catch (error) {
    console.error("Error fetching ONG by ID:", error);
    return null;
  } finally {
    hideLoading();
  }
}

window.api = {
  fetchONGs,
  fetchONGById,
};
