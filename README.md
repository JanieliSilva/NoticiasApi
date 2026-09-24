# NoticiasApi

Portal de notícias em Node.js e Express que busca matérias na [NewsAPI](https://newsapi.org) sobre inteligência artificial, redes sociais, atenção e cognição. As notícias passam por um filtro de tema e são exibidas em uma página com matéria em destaque, lista de notícias anteriores e busca por título ou fonte.

## Funcionalidades

- Busca de notícias em português na NewsAPI
- Filtro por tema, feito no servidor, para manter só o que é relevante
- Matéria em destaque com imagem e link para a fonte original
- Lista de notícias anteriores
- Busca por título ou fonte

## Tecnologias

- Node.js
- Express
- Axios
- dotenv
- HTML, CSS e JavaScript no frontend

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/JanieliSilva/NoticiasApi.git
cd NoticiasApi
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a chave da NewsAPI

Crie uma conta gratuita em [newsapi.org](https://newsapi.org) para gerar uma chave. Depois copie o arquivo de exemplo:

```bash
cp .env.example .env
```

No Windows (PowerShell), use `copy .env.example .env`.

Abra o `.env` e coloque a sua chave:

```
NEWS_API_KEY=sua_chave_aqui
```

O `.env` já está no `.gitignore` e não deve ser enviado ao GitHub.

### 4. Inicie o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

```
portal-cultural/
├── public/
│   └── index.html            # página do portal
├── src/
│   ├── config/
│   │   └── env.js            # leitura das variáveis de ambiente
│   ├── routes/
│   │   └── noticias.routes.js  # rota GET /api/noticias
│   ├── services/
│   │   └── newsApi.js        # chamada à NewsAPI
│   └── utils/
│       └── filtroTemas.js    # filtro de notícias por tema
├── .env.example
├── package.json
└── server.js
```

## Como funciona

1. A rota `GET /api/noticias` chama o serviço `newsApi.js`, que consulta o endpoint `/everything` da NewsAPI com termos do tema.
2. O resultado passa por `filtroTemas.js`, que mantém só os artigos cujo título ou descrição contêm palavras do tema.
3. A rota devolve em JSON os campos que a página usa: título, descrição, fonte, link, imagem e data.
