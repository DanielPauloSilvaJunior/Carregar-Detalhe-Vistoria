const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

let id = process.argv[2]

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
    db.each(`SELECT * FROM TBL_VISTORIA_DETALHES WHERE idVistoria = ?`, [id], (err, row) =>  {
      if (err) {
          console.error(err.message);
      }
      // // Construir a URL com o ID como parâmetro
      const url = `http://131.255.236.50:8080/WsDecSgt/VistoriaSJC/GravaDetalhes?data=${montaJson(row)}`; // Substitua pela sua URL

      // // Fazer a requisição HTTP usando axios
    //   axios.get(url)
    //       .then(response => {
    //           console.log(`Response for ID ${row.idVistoria}:`, response.data);
    //       })
    //       .catch(error => {
    //           console.error(`Error fetching data for ID ${row.idVistoria}:`, error.message);
    //       });
      console.log(montaJson(row)) ;
  });
});

function montaJson(row){
    let json = "";
    json+= `{"cdGrupo":${row.cdGrupo},"hrFiscalizacao":${row.hrFiscalizacao},"obsItem":${row.obsItem.replace(/(\r\n|\n|\r)/gm, " ")
    },"cdItem":${row.cdItem},"idVistoria":${row.idVistoria},"cdVistoria":19200,"flItem":${row.flItem},"prazoRegularizacao":${row.prazoRegularizacao},"_id":${row._id},"transmitido":${row.transmitido},"cdSubGrupo":${row.cdSubGrupo}}`
    


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

