// Carrega as variáveis do arquivo .env para dentro de process.env
require("dotenv").config();

// Exportamos um objeto só com o que o projeto precisa.
// Isso evita espalhar "process.env.NEWS_API_KEY" em vários arquivos —
// se um dia o nome da variável mudar, você só corrige aqui.
module.exports = {
  newsApiKey: process.env.NEWS_API_KEY,
  porta: process.env.PORT || 3000,
};
