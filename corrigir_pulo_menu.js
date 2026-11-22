const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-menu-sem-pulo">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-menu-sem-pulo">[\s\S]*?<\/script>\s*/g, "");

const estiloSemPulo = `
<style id="estilo-menu-sem-pulo">
.menu-alinhado-canto-fixo {
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
  transition: background 0.12s ease, border-color 0.12s ease !important;
}
.menu-alinhado-canto-fixo:hover,
.menu-alinhado-canto-fixo:active {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.26) 0%, rgba(30, 41, 59, 0.85) 100%) !important;
  border-color: rgba(147, 197, 253, 0.55) !important;
  color: #FFFFFF !important;
}
</style>
`;

const scriptSemPulo = `
<script id="script-menu-sem-pulo">
(function() {
  const ITENS_MENU = [
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

  function travarNoCanto() {
    const els = document.querySelectorAll("button, a, div, li");
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.closest("#rodape-menu-hamburguer")) continue;
      if (el.querySelector("button, a, svg, img")) continue;

      const txt = (el.textContent || "").trim().toLowerCase();
      if (ITENS_MENU.includes(txt)) {
        el.classList.add("menu-alinhado-canto-fixo");
        el.style.setProperty("justify-content", "flex-start", "important");
        el.style.setProperty("text-align", "left", "important");
        el.style.setProperty("align-items", "center", "important");
      }
    }
  }

  // Executa imediatamente e tambem no clique do hamburguer
  travarNoCanto();
  document.addEventListener("DOMContentLoaded", travarNoCanto);
  document.addEventListener("click", function() {
    travarNoCanto();
    requestAnimationFrame(travarNoCanto);
  }, true);

  const obs = new MutationObserver(travarNoCanto);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estiloSemPulo + "\n</head>")
  : estiloSemPulo + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", scriptSemPulo + "\n</body>")
  : html + "\n" + scriptSemPulo;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Alinhamento do menu travado no canto sem atraso!");
