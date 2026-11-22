const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-botoes-destaque">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-botoes-destaque">[\s\S]*?<\/script>\s*/g, "");

const estiloBotoes = `
<style id="estilo-botoes-destaque">
.btn-destaque-ler {
  background: linear-gradient(135deg, #FACC15 0%, #EAB308 100%) !important;
  color: #111827 !important;
  border: 1px solid rgba(254, 240, 138, 0.7) !important;
  font-weight: 700 !important;
  box-shadow: 0 3px 10px rgba(234, 179, 8, 0.35) !important;
}
.btn-destaque-video {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%) !important;
  color: #FFFFFF !important;
  border: 1px solid rgba(254, 202, 202, 0.45) !important;
  font-weight: 700 !important;
  box-shadow: 0 3px 10px rgba(220, 38, 38, 0.38) !important;
}
.btn-destaque-compartilhar {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important;
  color: #FFFFFF !important;
  border: 1px solid rgba(167, 243, 208, 0.5) !important;
  font-weight: 700 !important;
  box-shadow: 0 3px 10px rgba(16, 185, 129, 0.38) !important;
}
.btn-destaque-ler:active,
.btn-destaque-video:active,
.btn-destaque-compartilhar:active {
  transform: scale(0.97);
}
</style>
`;

const scriptBotoes = `
<script id="script-botoes-destaque">
(function() {
  function aplicarCoresBotoes() {
    const elementos = document.querySelectorAll("button, a");
    elementos.forEach((el) => {
      if (el.closest("#rodape-menu-hamburguer")) return;
      const texto = (el.textContent || "").trim().toLowerCase();
      if (texto.includes("ler matéria") || texto.includes("ler materia")) {
        el.classList.add("btn-destaque-ler");
      } else if (texto.includes("assistir vídeo") || texto.includes("assistir video")) {
        el.classList.add("btn-destaque-video");
      } else if (texto.includes("compartilhar")) {
        el.classList.add("btn-destaque-compartilhar");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", aplicarCoresBotoes);
  const observador = new MutationObserver(aplicarCoresBotoes);
  observador.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estiloBotoes + "\n</head>")
  : estiloBotoes + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", scriptBotoes + "\n</body>")
  : html + "\n" + scriptBotoes;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Cores chamativas aplicadas nos botoes com sucesso!");
