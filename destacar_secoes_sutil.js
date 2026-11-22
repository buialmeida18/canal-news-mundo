const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-secoes-sutil">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-secoes-sutil">[\s\S]*?<\/script>\s*/g, "");

const estiloSecoes = `
<style id="estilo-secoes-sutil">
.secao-linha-profissional {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  width: 100% !important;
  padding: 12px 15px !important;
  border-radius: 10px !important;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.16) 0%, rgba(30, 41, 59, 0.65) 100%) !important;
  border: 1px solid rgba(96, 165, 250, 0.32) !important;
  border-left: 3px solid #60A5FA !important;
  color: #F1F5F9 !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease !important;
}
.secao-linha-profissional:hover,
.secao-linha-profissional:active {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.26) 0%, rgba(30, 41, 59, 0.85) 100%) !important;
  border-color: rgba(147, 197, 253, 0.55) !important;
  color: #FFFFFF !important;
}
</style>
`;

const scriptSecoes = `
<script id="script-secoes-sutil">
(function() {
  const SECOES_LISTA = [
    "todas as notícias",
    "todas as noticias",
    "mundo",
    "esportes",
    "esporte",
    "tecnologia",
    "geral",
    "política",
    "politica",
    "economia",
    "saúde",
    "saude"
  ];

  function destacarLinhasSecoes() {
    const els = Array.from(document.querySelectorAll("button, a, div, li"));
    els.forEach((el) => {
      if (el.closest("#rodape-menu-hamburguer")) return;
      if (el.querySelector("button, a, svg, img")) return;

      const txt = (el.textContent || "").trim().toLowerCase();
      if (!SECOES_LISTA.includes(txt)) return;

      if (el.offsetHeight >= 34 && el.offsetHeight <= 74) {
        el.classList.add("secao-linha-profissional");
        el.style.justifyContent = "flex-start";
        el.style.textAlign = "left";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", destacarLinhasSecoes);
  const obs = new MutationObserver(destacarLinhasSecoes);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estiloSecoes + "\n</head>")
  : estiloSecoes + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", scriptSecoes + "\n</body>")
  : html + "\n" + scriptSecoes;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Destaque sutil aplicado nas linhas das secoes!");
