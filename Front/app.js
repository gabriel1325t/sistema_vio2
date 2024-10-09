const connect = require("../db/connect");
module.exports = class organizadorController {
  static async createOrganizador(req, res) {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido." });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res
        .status(400)
        .json({
          error: "Número inválido. Deve conter exatamente 11 dígitos numéricos",
        });
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO usuario (cpf, password, email, name) VALUES('${cpf}', '${password}', '${email}', '${name}')`;
      // Executando a query criada
      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O Email já está vinculado a outro usuário" });
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }
          }else{
            return res.status(201).json({message: "Organizador criado com sucesso"});
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({error:"Erro interno do servidor"})
      }

    }
  }

  static async getAllOrganizador(req, res) {
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", organizadores });
  }

  static async updateOrganizador(req, res) {
    //Desestrutura e recupera os dados enviados via corpo da requisição
    const { nome, email, senha, telefone } = req.body;

    //Validar se todos os campos foram preenchidos
    if (!nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    //Procurar index do organizador no Array 'users' pelo email
    const organizadorIndex = organizadores.findIndex(
      (organizadores) => organizadores.email === email
    );
    //Se usuario não for encontrado organizadorIndex equivale a -1
    if (organizadorIndex == -1) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }

    //Atualiza os dados do usuário no Array 'organizadores'
    organizadores[organizadorIndex] = { nome, email, senha, telefone };

    return res
      .status(200)
      .json({
        message: "Usuario atualizado",
        organizador: organizadores[organizadorIndex],
      });
  }

  static async deleteOrganizador(req, res) {
    //Obtém o parametro 'id' da requisição, que é o email do orgaizador a ser deletado
    const OrganizadorId = req.params.OrganizadorId;
    //params vai na minha url

    //Procurar index do usuario no Array 'organizadores' pelo email
    const organizadorIndex = organizadores.findIndex(
      (organizador) => organizador.OrganizadorId === OrganizadorId
    );

    //Se usuario não for encontrado organizadorIndex equivale a -1
    if (organizadorIndex == -1) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }

    //Removendo o organizador do Array 'organizadores'
    organizadores.splice(organizadorIndex, 1);

    return res.status(200).json({ message: "Usuario Apagado" });
  }
};
