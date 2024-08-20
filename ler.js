const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

// Conectar ao banco de dados (substitua 'your_database.db' pelo nome do seu arquivo .db)
let db = new sqlite3.Database('SJC_VISTORIA.db', (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Executar uma consulta SQL (substitua 'your_table' pelo nome da sua tabela)
db.serialize(() => {
  db.each(`SELECT * FROM TBL_VISTORIA_DETALHES`, (err, row) => {
      if (err) {
          console.error(err.message);
      }
      // // Construir a URL com o ID como parâmetro
      // const url = `http://131.255.236.50:8080/WsDecSgt/VistoriaSJC/GravaDetalhes?data=${row.id}`; // Substitua pela sua URL

      // // // Fazer a requisição HTTP usando axios
      // // axios.get(url)
      // //     .then(response => {
      // //         console.log(`Response for ID ${row.id}:`, response.data);
      // //     })
      // //     .catch(error => {
      // //         console.error(`Error fetching data for ID ${row.id}:`, error.message);
      // //     });
      console.log(montaJson(row));
  });
});

function montaJson(row){
    let json = "";
    json+= {
    "cdGrupo":2,"hrFiscalizacao":0,"obsItem":"","cdItem":1787,"idVistoria":183,"cdVistoria":19124,"flItem":1,"prazoRegularizacao":"3 dias","_id":951,"transmitido":false,"cdSubGrupo":272
    }

    return json
}
    
// Fechar a conexão com o banco de dados
db.close((err) => {
  if (err) {
      console.error(err.message);
      return;
  }
  console.log('Conexão fechada.');
});

