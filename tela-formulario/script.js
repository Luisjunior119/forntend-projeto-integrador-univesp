document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário tradicional

    // Coleta dos valores dos campos
    const formData = {
        nome: document.getElementById("nome").value,
        cnpj: document.getElementById("cnpj").value,
        contato: document.getElementById("contato").value,
        setor: document.getElementById("setor").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        endereco: document.getElementById("endereco").value,
        redes: document.getElementById("redes").value,
        descricao: document.getElementById("descricao").value
    };

    // Enviando os dados para o backend
    fetch("URL_DA_SUA_API", {
        method: "POST",  // Método de envio
        headers: {
            "Content-Type": "application/json"  // Tipo de conteúdo
        },
        body: JSON.stringify(formData)  // Enviando os dados como JSON
    })
    .then(response => response.json())  // Convertendo a resposta da API para JSON
    .then(data => {
        console.log("Resposta da API:", data);
        alert("Sua ONG foi inscrita com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro. Tente novamente.");
    });
});
