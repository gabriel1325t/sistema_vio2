//Acessa o objeto "document" que representa a pagina html.

//const { json } = require("body-parser");
//const { application } = require("express");

//Seleciona o elemento com o id indicado do formulario.
document
  .getElementById("formulario-registro")

//Adiciona o ouvinte de evento (submite) para capturar o envio do formulário.
  addEventListener("submit", function (event) {
  //previne o comportamento padão do formulário, ou seja, impede que seja enviado e recarregue a página.
  event.preventDefault();

  //captura os valores dos campos dos formulário.
  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  //requisição HTTP para o endpoint de cadastro de usuario.

  fetch("http://localhost:5000/api/v1/user", {
    //Realiza uma chamada HTTP para o servidor (neste caso a rota definida).
    method: "POST",
    headers: {
      //A requisição será em formato JSON.
      "Content-type": "application/json",
    },
    //Transforma os dados do formulário em uma string json par serem enviados no corpo  da requisição.
    body: JSON.stringify({ name, cpf, password, email }),
  })
    .then((response) => {
      //tratamento da resposta do servidor / API.
      if (response.ok) {
        //Verifica se a resposta foi bem sucedida (status 2xx).
        return response.json();
      }
      //convertendo o error em formato json.
      return response.json().then((err) => {
        //mensagem retornada do servidor, acessada pela chave "error".
        throw new Error(err.error);
      });
    }) //Fechamento da then(response).
    .then((data) => {
      //Executa a resposta de sucesso - retona ao usuario final.
      //Exibe um alerta com o nome do usuário que acabou de ser cadastrado.
      alert("Usuário cadastrado com sucesso!" + data.user.name);

      //Exibe o log no terminal
      console.log("Usuario criado:", data.user);

      //Reseta os campos do formulario após o sucesso do cadastro
      document.getElementById("formulario-registro").reset();
    })
    .catch((error) => {
      //captura qualquer erro que ocorra durante o processo da requisição / resposta

      //Exibe alerta (front) com o erro processado
      alert("Erro no cadastro: " + error.message);

      console.error("Error:", error.message);
    })


});
