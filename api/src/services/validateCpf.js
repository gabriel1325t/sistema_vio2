const connect = require("../db/connect");

module.exports = async function validateCpf(cpf, userId) {
  //precisa pegar a resposta do banco de dados

  const query = "SELECT id_usuario FROM usuario WHERE cpf=?";
  const values = [cpf];

  connect.query(query, values, (err, results) => {
    if (err) {
      //Fazer algo
    } else if (results.length > 0) {
      const IdDocpfCadastrado = results[0].id_usuario;

      if (userId && IdDocpfCadastrado !== userId) {
        return { error: "Cpf já cadastrado para outro usuário" };
      } else if (!userId) {
        return { error: "Cpf já cadastrado" };
      }
    }
    else{
        return null;
    }
  });
};
