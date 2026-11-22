const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-leitura-pro">[\s\S]*?<\/style>\s*/g, "");

const estiloLeitura = `
<style id="estilo-leitura-pro">
article,
.materia,
.noticia-conteudo,
.conteudo-noticia,
.post-content,
main article {
  background: linear-gradient(180deg, #121926 0%, #0d131d 100%);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14px;
  padding: 16px;
}

article p,
.materia p,
.noticia-conteudo p,
.conteudo-noticia p,
.post-content p,
main p {
  color: #e5e7eb !important;
  font-size: 16px;
  line-height: 1.68;
  letter-spacing: 0.01em;
  margin-bottom: 12px;
}

article h1, article h2, article h3,
.noticia-conteudo h1, .noticia-conteudo h2, .noticia-conteudo h3,
.conteudo-noticia h1, .conteudo-noticia h2, .conteudo-noticia h3 {
  color: #f8fafc !important;
  line-height: 1.3;
  margin-bottom: 10px;
}
</style>
`;

if (html.includes("</head>")) {
  html = html.replace("</head>", estiloLeitura + "\n</head>");
} else {
  html = estiloLeitura + "\n" + html;
}

fs.writeFileSync(arquivo, html, "utf8");
console.log("Leitura da noticia ajustada com tom profissional!");
