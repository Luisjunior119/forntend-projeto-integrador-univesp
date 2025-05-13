async function fetchONGs() {
  try {
    const response = await fetch("http://localhost:3000/ongs");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ONGs:", error);
    return [];
  }
}

async function fetchONGById(id) {
  try {
    const ongs = await fetchONGs();
    return ongs.find((ong) => ong._id === id);
  } catch (error) {
    console.error("Error fetching ONG by ID:", error);
    return null;
  }
}

window.api = {
  fetchONGs,
  fetchONGById,
};
