const axios = require("axios");
const { newsApiKey } = require("../config/env");

const BASE_URL = "https://newsapi.org/v2/everything";

// Query padrão, usada quando ninguém passa um termo para buscarNoticias().
const QUERY_TEMA =
  '("inteligência artificial" OR ChatGPT OR "redes sociais" OR smartphone OR "pensamento crítico" OR "vício em" OR cognição)';

/**
 * Busca notícias na NewsAPI usando um termo de busca.
 * @param {string} query - termo de busca (padrão: QUERY_TEMA)
 * @returns {Promise<Array>} lista de artigos crus da API
 */
async function buscarNoticias(query = QUERY_TEMA) {
  try {
    const resposta = await axios.get(BASE_URL, {
      params: {
        q: query,
        searchIn: "title,description", // busca só no título e na descrição
        language: "pt", // só notícias em português
        sortBy: "publishedAt", // mais recentes primeiro
        pageSize: 20, // quantidade de resultados por chamada
        apiKey: newsApiKey,
      },
    });

    // Diagnóstico: mostra no terminal quantas notícias a API devolveu
    console.log(
      `[DEBUG] query: ${query} | totalResults: ${resposta.data.totalResults} | recebidos: ${resposta.data.articles.length}`
    );

    // A API devolve { status, totalResults, articles: [...] }
    // Só nos interessa o array "articles"
    return resposta.data.articles;
  } catch (erro) {
    // A NewsAPI retorna 401 se a key estiver errada e
    // 429 se você estourou o limite de requisições do plano grátis.
    if (erro.response) {
      console.error(
        `Erro da NewsAPI: ${erro.response.status} - ${erro.response.data.message}`
      );
    } else {
      console.error("Erro de conexão com a NewsAPI:", erro.message);
    }
    return []; // devolve array vazio em vez de quebrar o servidor inteiro
  }
}

module.exports = { buscarNoticias };