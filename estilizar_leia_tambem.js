const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-leia-tambem">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-leia-tambem">[\s\S]*?<\/script>\s*/g, "");

const estiloLeiaTambem = `
<style id="estilo-leia-tambem">
.leia-tambem-titulo-refinado {
  color: #93C5FD !important;
  font-weight: 700 !important;
  letter-spacing: 0.03em;
  border-left: 3px solid #3B82F6;
  padding-left: 8px;
}
.leia-tambem-card-refinado {
  background: linear-gradient(145deg, #172236 0%, #111927 100%) !important;
  border: 1px solid rgba(96, 165, 250, 0.24) !important;
  border-left: 3px solid rgba(59, 130, 246, 0.75) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28) !important;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease !important;
}
.leia-tambem-card-refinado:hover,
.leia-tambem-card-refinado:active {
  border-color: rgba(147, 197, 253, 0.55) !important;
  background: linear-gradient(145deg, #1c2a42 0%, #141f31 100%) !important;
  transform: translateY(-1px);
}
</style>
`;

const scriptLeiaTambem = `
<script id="script-leia-tambem">
(function() {
  function aplicarEstiloLeiaTambem() {
    const todos = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, div, span, section, a"));

    todos.forEach((el) => {
      if (el.closest("#rodape-menu-hamburguer")) return;
      if (el.children.length === 0) {
        const txt = (el.textContent || "").trim().toLowerCase();
        if (txt === "leia também" || txt === "leia tambem") {
          el.classList.add("leia-tambem-titulo-refinado");

          const containerPai = el.parentElement;
          if (containerPai) {
            const itensRelacionados = Array.from(containerPai.querySelectorAll("a, article, div, li"))
              .filter((item) => {
                if (item === el || item.contains(el)) return false;
                if (item.children.length > 5) return false;
                const h = item.offsetHeight;
                const temTexto = (item.innerText || "").trim().length > 15;
                return temTexto && h >= 48 && h <= 190;
              });

            itensRelacionados.forEach((card) => {
              card.classList.add("leia-tambem-card-refinado");
            });
          }
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", aplicarEstiloLeiaTambem);
  const obs = new MutationObserver(aplicarEstiloLeiaTambem);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estiloLeiaTambem + "\n</head>")
  : estiloLeiaTambem + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", scriptLeiaTambem + "\n</body>")
  : html + "\n" + scriptLeiaTambem;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Estilo sutil aplicado no Leia tambem!");
