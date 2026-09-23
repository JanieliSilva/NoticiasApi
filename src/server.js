const path = require("path");
const express = require("express");
const cors = require("cors");

const { porta } = require("./config/env");
const noticiasRoutes = require("./routes/noticias.routes");

const app = express();

// Permite que um frontend rodando em outra porta/domínio acesse essa API
app.use(cors());

// Todas as rotas de notícias ficam sob o prefixo /api
app.use("/api", noticiasRoutes);

// Serve a página do portal (pasta public, na raiz do projeto)
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});