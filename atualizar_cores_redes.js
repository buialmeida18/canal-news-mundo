const fs = require("fs");
const path = require("path");

const candidatos = [
  path.join(process.cwd(), "public", "index.html"),
  path.join(process.cwd(), "index.html")
];

const arquivo = candidatos.find((p) => fs.existsSync(p));
if (!arquivo) {
  console.error("index.html nao encontrado em ~/canal-news-mundo");
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-redes-rodape">[\s\S]*?<\/style>\s*/g, "");

const estiloNovo = `
<style id="estilo-redes-rodape">
.menu-redes-rodape {
  margin-top: auto;
  padding: 14px 14px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 14, 23, 0.45);
}
.menu-redes-titulo {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 10px;
}
.menu-redes-lista {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.rede-icone-btn {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
  transition: transform 0.16s ease, filter 0.16s ease, box-shadow 0.16s ease;
}
.rede-icone-btn svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}
.rede-icone-btn:hover {
  transform: translateY(-2px) scale(1.04);
  filter: brightness(1.08);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.38);
}
#link-tiktok {
  background: #111318;
  border-color: rgba(37, 244, 238, 0.45);
  box-shadow: 0 2px 8px rgba(37, 244, 238, 0.18), 0 0 0 1px rgba(254, 44, 85, 0.22);
}
#link-youtube {
  background: #FF0000;
  border-color: rgba(255, 255, 255, 0.2);
}
#link-facebook {
  background: #1877F2;
  border-color: rgba(255, 255, 255, 0.2);
}
#link-instagram {
  background: linear-gradient(45deg, #F58529 0%, #DD2A7B 52%, #8134AF 100%);
  border-color: rgba(255, 255, 255, 0.22);
}
.menu-rodape-creditos {
  margin-top: 11px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.68);
}
</style>
`;

if (html.includes("</head>")) {
  html = html.replace("</head>", estiloNovo + "\n</head>");
} else {
  html = estiloNovo + "\n" + html;
}

fs.writeFileSync(arquivo, html, "utf8");
console.log("Cores e tamanho atualizados com sucesso!");
