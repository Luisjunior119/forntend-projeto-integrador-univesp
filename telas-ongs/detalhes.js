document.addEventListener("DOMContentLoaded", async () => {
  // Get ONG ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const ongId = urlParams.get("id");

  if (!ongId) {
    showError("ONG não encontrada");
    return;
  }

  // Fetch ONG data
  const ong = await window.api.fetchONGById(ongId);

  if (!ong) {
    showError("ONG não encontrada");
    return;
  }

  // Update page title
  document.title = ong.nome;

  // Load content
  const contentContainer = document.getElementById("ong-content");
  contentContainer.innerHTML = generateONGDetailHTML(ong);

  // Initialize carousel
  window.initializeCarousel();
});

// Helper function to get the map iframe for each ONG
function getONGMapIframe(ongName) {
  const mapIframes = {
    "Cidadão Pró-Mundo": `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.74960225553!2d-47.07118162384111!3d-22.88570647926996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8abb6e034c5%3A0x4e8c1c6872a841b0!2zQ2lkYWTDo28gUHLDsy1NdW5kbw!5e0!3m2!1spt-BR!2sbr!4v1743689963947!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    "Hamburgada do Bem": `  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.8487020878474!2d-46.51900092382744!3d-23.465921378865453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef5bb57c4d701%3A0x6be6edb338ad061a!2sHamburgada%20do%20Bem!5e0!3m2!1spt-BR!2sbr!4v1743685572217!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    "Instituto Empreeduca": `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14623.120112693194!2d-46.66806470804477!3d-23.61222071686363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a0a2a5ebccb%3A0xa92988de48c204ad!2sAv.%20dos%20Carin%C3%A1s%2C%20170%20-%20Indian%C3%B3polis%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004086-010!5e0!3m2!1spt-BR!2sbr!4v1744018916440!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    "Instituto Ser+": `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.786409264798!2d-46.59355648423889!3d-23.56161908462109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce594dfb9e725d%3A0x58b86f55e551f64b!2sRua%20Taquari%2C%20546%20-%201%C2%BA%20Andar%2C%20Bloco%20C%20-%20Mooca%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003166-000!5e0!3m2!1spt-BR!2sbr!4v1631557914408!5m2!1spt-BR!2sbr" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
  };
  return mapIframes[ongName] || "";
}

function generateONGDetailHTML(ong) {
  // Extract ONG folder name for images
  const ongFolder = getONGImagePath(ong.nome);

  return `
    <div class="carousel-info-container">
      <!-- Carrossel -->
      <div class="carousel-container">
       <div class="carousel-main">
          <img id="mainImage" src="../assets/${ongFolder}/carousel-main.jpg" alt="Imagem principal do carrossel">
        </div>
        <div class="carousel-thumbnails">
          <button class="prev" onclick="window.moveSlide(-1)">&#10094;</button>
          <div class="thumbnails">
            <img class="thumbnail" src="../assets/${ongFolder}/carousel1.jpg" alt="Imagem 1" onclick="window.selectImage(0)">
            <img class="thumbnail" src="../assets/${ongFolder}/carousel2.jpg" alt="Imagem 2" onclick="window.selectImage(1)">
            <img class="thumbnail" src="../assets/${ongFolder}/carousel3.jpg" alt="Imagem 3" onclick="window.selectImage(2)">
            <img class="thumbnail" src="../assets/${ongFolder}/carousel4.jpg" alt="Imagem 4" onclick="window.selectImage(3)">
          </div>
          <button class="next" onclick="window.moveSlide(1)">&#10095;</button>
        </div>
      </div>

      <!-- Caixas ao lado do carrossel -->
      <div class="info-boxes">
        <div class="info-box">
          <h3>Horário de Funcionamento</h3>
          <p>${ong.horarioFuncionamento || "Não informado"}</p>
        </div>
        <div class="info-box">
          <h3>Endereço</h3>
          <p>${ong.enderecoCompleto}</p>
        </div>
        <div class="info-box">
          <h3>Conheça a ONG ${ong.nome}</h3>
          <a href="${
            ong.endereco.url || "#"
          }" target="_blank" class="button">Acesse o Site oficial</a>
        </div>
        <!-- Iframe do Google Maps -->
        <div class="map-container">
          ${getONGMapIframe(ong.nome)}
        </div>
      </div>
    </div>

    <section class="content">
      ${
        ong.conteudoDetalhes ||
        `
        <h2>Sobre a ${ong.nome}</h2>
        <p>${ong.descricao}</p>
        ${
          ong.sejaVoluntario
            ? `
            <h2>Seja Voluntário</h2>
            <p>Email para contato: ${ong.sejaVoluntario.email}</p>
            ${
              ong.sejaVoluntario.formulario
                ? `<p><a href="${ong.sejaVoluntario.formulario}" target="_blank" class="button">Formulário de Voluntariado</a></p>`
                : ""
            }
            `
            : ""
        }
        ${
          ong.formasDeDoacão && ong.formasDeDoacão.length > 0
            ? `
            <h2>Formas de Doação</h2>
            <ul>
              ${ong.formasDeDoacão.map((forma) => `<li>${forma}</li>`).join("")}
            </ul>
            `
            : ""
        }
        `
      }
    </section>
  `;
}

function showError(message) {
  const contentContainer = document.getElementById("ong-content");
  contentContainer.innerHTML = `
    <div class="error-message">
      <h2>${message}</h2>
      <a href="../index.html">Voltar para a página inicial</a>
    </div>
  `;
}

// Helper function to map ONG names to image paths
function getONGImagePath(name) {
  const nameMap = {
    "Instituto Ser+": "institutosermais",
    "Hamburgada do Bem": "hamburgada do bem",
    "Instituto Empreeduca": "empreeduca",
    "Cidadão Pró-Mundo": "cidadaopromundo",
  };

  return nameMap[name] || name.toLowerCase().replace(/\s+/g, "");
}
