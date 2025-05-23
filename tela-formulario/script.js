// Function to show notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.style.display = "none";
  }, 5000);
}

// Handle adding more image URL inputs
document.getElementById("addImageBtn").addEventListener("click", () => {
  const imageUrls = document.getElementById("imageUrls");
  const newInput = document.createElement("div");
  newInput.className = "image-url-input";
  newInput.innerHTML = `<input type="url" class="image-url" required>`;
  imageUrls.appendChild(newInput);
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect image URLs
  const imageUrls = Array.from(document.getElementsByClassName("image-url"))
    .map((input) => input.value)
    .filter((url) => url.trim() !== "");

  // Validate minimum number of images
  if (imageUrls.length < 4) {
    alert("Por favor, forneça pelo menos 4 imagens.");
    return;
  }

  // Collect address information
  const endereco = {
    logradouro: document.getElementById("logradouro").value,
    numero: document.getElementById("numero").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    cep: document.getElementById("cep").value,
    url: document.getElementById("url").value,
    complemento: document.getElementById("complemento").value,
  };

  // Collect form data
  const formData = {
    nome: document.getElementById("nome").value,
    cnpj: document.getElementById("cnpj").value,
    email: document.getElementById("email").value || null, // If empty, set to null
    descricao: document.getElementById("descricao").value,
    endereco: endereco,
    imagens: imageUrls,
    horarioFuncionamento: document.getElementById("horarioFuncionamento").value,
  };

  // Disable submit button to prevent double submission
  document.getElementById("submitBtn").disabled = true;

  // Send data to API
  fetch("http://localhost:3000/ongs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46MTIzNA==",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(response.status);
      if (response.status > 299) {
        throw new Error("Erro na requisição");
      }
      return;
    })
    .then((data) => {
      showNotification(
        "Solicitação recebida com sucesso! Nossa equipe administrativa irá analisar as informações fornecidas em breve."
      );
      document.getElementById("form").reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar os dados:", error);
      showNotification(
        "Ocorreu um erro ao enviar os dados. Por favor, tente novamente."
      );
    })
    .finally(() => {
      // Re-enable submit button
      document.getElementById("submitBtn").disabled = false;
    });
});
