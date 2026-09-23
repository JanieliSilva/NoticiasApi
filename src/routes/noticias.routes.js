const express = require("express");
const router = express.Router();

const { buscarNoticias } = require("../services/newsApi");
const { filtrarPorTema } = require("../utils/filtroTemas");

// GET /api/noticias
// Busca notícias relacionadas ao tema e devolve já filtradas
router.get("/noticias", async (req, res) => {
  // A query do tema fica definida dentro do newsApi.js
  const artigosBrutos = await buscarNoticias();
  const artigosFiltrados = filtrarPorTema(artigosBrutos);

  // Devolvemos só os campos que o frontend realmente precisa,
  // em vez de repassar o JSON gigante que a NewsAPI retorna
  const resultado = artigosFiltrados.map((a) => ({
    titulo: a.title,
    descricao: a.description,
    fonte: a.source?.name,
    link: a.url,
    imagem: a.urlToImage,
    publicadoEm: a.publishedAt,
  }));

  res.json({
    total: resultado.length,
    noticias: resultado,
  });
});

module.exports = router;