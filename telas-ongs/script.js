let currentIndex = 0; // O índice inicial da imagem
const images = document.querySelectorAll('.thumbnail'); // Seleciona as miniaturas
const mainImage = document.getElementById('mainImage'); // Seleciona a imagem principal

// Função para alterar a imagem principal ao clicar em uma miniatura
function selectImage(index) {
  currentIndex = index; // Atualiza o índice da imagem
  updateMainImage(); // Atualiza a imagem principal
}

// Função para mover a imagem com as setas
function moveSlide(step) {
  const totalImages = images.length;
  currentIndex += step; // Atualiza o índice com base na direção (1 para direita, -1 para esquerda)

  if (currentIndex < 0) {
    currentIndex = totalImages - 1; // Vai para a última imagem se estiver antes da primeira
  } else if (currentIndex >= totalImages) {
    currentIndex = 0; // Vai para a primeira imagem se ultrapassar o total
  }

  updateMainImage(); // Atualiza a imagem principal
}

// Função para atualizar a imagem principal com base no índice
function updateMainImage() {
  const selectedImage = images[currentIndex]; // Seleciona a miniatura com base no índice
  mainImage.src = selectedImage.src; // Atualiza a fonte da imagem principal
}
