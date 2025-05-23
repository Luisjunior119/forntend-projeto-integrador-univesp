document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.querySelector(".cards-container");
  const ongs = await window.api.fetchONGs();

  // Clear existing content
  cardsContainer.innerHTML = "";

  // Generate cards dynamically
  ongs.forEach((ong) => {
    const card = createONGCard(ong);
    cardsContainer.appendChild(card);
  });

  // Setup search functionality
  setupSearch(ongs);
});

function createONGCard(ong) {
  const card = document.createElement("div");
  card.className = "card";

  // Extract city from address
  const city = ong.endereco.cidade || "";

  card.innerHTML = `
    <img src="${ong.imagens.filter((img) => img.includes("main"))[0]}" alt="${
    ong.nome
  }" class="card-img" />
    <div class="card-content">
      <h3>${ong.nome}<br><span>${city}</span></h3>
      <p>${ong.enderecoCompleto}</p>
      <a href="/telas-ongs/detalhes.html?id=${
        ong._id
      }" class="card-button">Conheça mais sobre a ONG</a>
    </div>
  `;

  return card;
}

// Search functionality
function setupSearch(ongs) {
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-button");

  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cardsContainer = document.querySelector(".cards-container");

    // Clear existing content
    cardsContainer.innerHTML = "";

    // Filter ONGs based on search term
    const filteredONGs = ongs.filter(
      (ong) =>
        ong.nome.toLowerCase().includes(searchTerm) ||
        ong.endereco.cidade.toLowerCase().includes(searchTerm)
    );

    // Generate cards for filtered ONGs
    filteredONGs.forEach((ong) => {
      const card = createONGCard(ong);
      cardsContainer.appendChild(card);
    });
  };

  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}
