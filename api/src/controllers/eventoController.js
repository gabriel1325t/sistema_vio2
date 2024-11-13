const e = require("express");
const connect = require("../db/connect");

module.exports = class eventoController {
  //criação de um evento
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    //validação genérica de todos atributos
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `INSERT into evento (nome, descricao, data_hora, local, fk_id_organizador) values (?, ?, ?, ?, ?)`;
    const values = [nome, descricao, data_hora, local, fk_id_organizador];
    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar o evento" });
        }
        return res.status(201).json({ message: "Evento criado com sucesso!" });
      });
    } catch (error) {
      console.log("erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  } //fim do create

  //Vistar todos os eventos cadastrados

  static async getAllEventos(req, res) {
    const query = `SELECT * FROM evento`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }

        return res
          .status(200)
          .json({ message: "Eventos listados com sucesso!", events: results });
      });
    } catch (error) {
      console.error("Erro ao executar a query:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  //update de um evento
  static async updateEvento(req, res) {
    const { id_evento, nome, descricao, data_hora, local, fk_id_organizador } =
      req.body;

    //validação genérica de todos atributos
    if (
      !id_evento ||
      !nome ||
      !descricao ||
      !data_hora ||
      !local ||
      !fk_id_organizador
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `UPDATE evento set nome=?, descricao=?, data_hora=?, local=?, fk_id_organizador=? WHERE id_evento =? `;
    const values = [
      nome,
      descricao,
      data_hora,
      local,
      fk_id_organizador,
      id_evento,
    ];
    try {
      connect.query(query, values, (err, results) => {
        console.log("Resultados:", results);
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao atualizar o evento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Evento atualizado com sucesso!" });
      });
    } catch (error) {
      console.log("erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  } //fim do update

  static async deleteEvento(req, res) {
    const idEvento = req.params.id;

    const query = `delete from evento where id_evento=?`;

    try {
      connect.query(query, idEvento, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao excluir evento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Evento excluído com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar a consulta!", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  static async getEventosPorData(req, res) {
    const query = `SELECT * FROM evento`
 
    try{
      connect.query(query,(err, results)=>{
        if(err){
          console.error(err);
          return res.status(500).json({error:"Erro ao buscar eventos"})
        }
        const dataEvento = new Date(results[0].data_hora)
        const dia = dataEvento.getDate()
        const mes = dataEvento.getMonth()+1
        const ano = dataEvento.getFullYear()
        console.log(dia+'/'+mes+'/'+ano)

        const dataEvento1 = new Date(results[1].data_hora)
        const dia1 = dataEvento1.getDate()
        const mes1 = dataEvento1.getMonth()+1
        const ano1 = dataEvento1.getFullYear()
        console.log(dia1+'/'+mes1+'/'+ano1)
        
        const dataEvento2 = new Date(results[2].data_hora)
        const dia2 = dataEvento2.getDate()
        const mes2 = dataEvento2.getMonth()+1
        const ano2 = dataEvento2.getFullYear()
        console.log(dia2+'/'+mes2+'/'+ano2)

        const now = new Date()
        const eventosPassados = results.filter(evento => new Date(evento.data_hora)<now)
        const eventosFuturos = results.filter(evento => new Date(evento.data_hora)>= now)

        const diferencaMs = eventosFuturos[0].data_hora.getTime() - now.getTime();
        const dias = Math.floor(diferencaMs/(1000*60*60*24));//transformar milisegundos em dias
        const horas = Math.floor((diferencaMs%(1000*60*60*24))/(1000*60*60));
        console.log(diferencaMs, 'Falta:'+dias+ 'dias,' +horas+'horas');

        //comparando datas
        const dataFiltro = new Date('2024-11-20').toISOString().split("T");
        const eventosDia = results.filter(evento => new Date(evento.data_hora).toISOString().split("T")[0] === dataFiltro[0]);

        console.log("Eventos:", eventosDia);
        
        return res.status(200).json({message:'ok',eventosPassados,eventosFuturos})
      })
    }
    catch(error){
        console.error(err);
        return res.status(500).json({error:"Erro ao buscar eventos"})
      }
      
  }   
  static async getEventosProximos(req, res) {
    const query = `SELECT * FROM evento`;
    const data_hora = req.params.data_hora;

    try {
      connect.query(query, data_hora, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao localizar o evento!" });
        }

        let dataInicial = new Date("2024-11-01"); 
        let dataFinal = new Date("2024-11-05"); 

        // Loop que vai de dataInicial até dataFinal
        for (
          let dataAtual = new Date(dataInicial);
          dataAtual <= dataFinal;
          dataAtual.setDate(dataAtual.getDate() + 1)
        ) {
          console.log(dataAtual.toISOString().split("T")[0]);
        }
      });
    } catch (error) {
      console.log("Erro ao executar a consulta!", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
      };
};
