//Acessa o objeto "document" que representa a pagina html

const { json } = require("body-parser");
const e = require("express");

//Seleciona o elemento com o id indicado do formulario
document.getElementById("formulario-registro");

//Adiciona o ouvinte de evento (submite) para capturar o envio do formulário
addEventListener("submit", function (event) {
  //previne o comportamento padão do formulário, ou seja, impede que seja enviado e recarregue a página
  event.preventDefault();

  //capturar os valores dos campos dos formulário
  const name = document.getElementById("nome");
  const cpf = document.getElementById("cpf");
  const email = document.getElementById("email");
  const password = document.getElementById("senha");

  //requisição HTTP para o endpoint de cadastro de usuario

  fetch("http://localhost:5000/api/v1/user", {
    //Realiza uma chamada HTTP para o servidor (neste caso a rota definida)
    method: "POST",
    headers: {
        //A requisição será em formato JSON
        "Content-type": application/json
    },
    //Transforma os dados do formulário em uma string json par serem enviados no corpo  da requisição
    body: JSON.stringify({name, cpf, password, email}),
  })
});
