// Palavras-chave do tema. Cada uma casa com o começo de uma palavra
// ("cognitiv" pega "cognitivo", "cognitiva", "cognitivas").
const TERMOS_TEMA = [
  "inteligencia artificial",
  "chatgpt",
  "vicio em",
  "dependencia digital",
  "redes sociais",
  "atencao",
  "memoria",
  "cognitiv",
  "pensamento critico",
  "smartphone",
  "celular",
];

// Tira acentos e deixa tudo em minúsculas, para "atenção" casar com "atencao".
function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const regexes = TERMOS_TEMA.map((t) => new RegExp("\\b" + normalizar(t)));

function filtrarPorTema(artigos) {
  const filtrados = artigos.filter((artigo) => {
    const texto = normalizar(`${artigo.title} ${artigo.description}`);
    return regexes.some((re) => re.test(texto));
  });

  // Diagnóstico: mostra no terminal quantas notícias entraram e quantas passaram
  console.log(
    `[DEBUG] filtro: ${artigos.length} entraram, ${filtrados.length} passaram`
  );

  return filtrados;
}

module.exports = { filtrarPorTema, TERMOS_TEMA };