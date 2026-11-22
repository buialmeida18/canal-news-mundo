const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-menu-lateral-pro">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-menu-lateral-pro">[\s\S]*?<\/script>\s*/g, "");

const estiloMenu = `
<style id="estilo-menu-lateral-pro">
.menu-item-lateral-pro {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  width: 100% !important;
  padding: 12px 16px !important;
  border-radius: 10px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(148, 163, 184, 0.14) !important;
  color: #f1f5f9 !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease !important;
}
.menu-item-lateral-pro:hover,
.menu-item-lateral-pro:active {
  background: rgba(59, 130, 246, 0.16) !important;
  border-color: rgba(96, 165, 250, 0.42) !important;
  color: #ffffff !important;
}
</style>
`;

const scriptMenu = `
<script id="script-menu-lateral-pro">
(function() {
  const ROTULOS_SECOES = [
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

  function alinharSecoesMenu() {
    const itens = Array.from(document.querySelectorAll("button, a, div, li"));
    itens.forEach((el) => {
      if (el.closest("#rodape-menu-hamburguer")) return;
      if (el.querySelector("button, a, svg, img")) return;

      const txt = (el.textContent || "").trim().toLowerCase();
      if (!ROTULOS_SECOES.includes(txt)) return;

      if (el.offsetHeight >= 34 && el.offsetHeight <= 72) {
        el.classList.add("menu-item-lateral-pro");
        el.style.justifyContent = "flex-start";
        el.style.textAlign = "left";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", alinharSecoesMenu);
  const obs = new MutationObserver(alinharSecoesMenu);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estiloMenu + "\n</head>")
  : estiloMenu + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", scriptMenu + "\n</body>")
  : html + "\n" + scriptMenu;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Menu hamburguer alinhado dos lados com estilo profissional!");
