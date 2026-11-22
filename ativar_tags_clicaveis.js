const fs = require("fs");
const path = require("path");

const arquivo = path.join(process.cwd(), "public", "index.html");
if (!fs.existsSync(arquivo)) {
  console.error("public/index.html nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-tags-clicaveis">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-tags-clicaveis">[\s\S]*?<\/script>\s*/g, "");

const estiloTags = `
<style id="estilo-tags-clicaveis">
.tag-clicavel-canal {
  cursor: pointer !important;
  pointer-events: auto !important;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.14s ease, filter 0.14s ease, box-shadow 0.14s ease !important;
}
.tag-clicavel-canal:hover {
  transform: translateY(-1px) scale(1.03);
  filter: brightness(1.12);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}
.tag-clicavel-canal:active {
  transform: scale(0.96);
}
</style>
`;

const scriptTags = `
<script id="script-tags-clicaveis">
(function() {
  const NOMES_TAGS = [
    "geral",
    "destaque",
    "mundo",
    "esportes",
    "esporte",
    "tecnologia",
    "politica",
    "política",
    "economia",
    "saude",
    "saúde",
    "entretenimento",
    "brasil",
    "bahia"
  ];

  function sincronizarFiltroNaPagina(rotuloLimpo) {
    const alvoTexto = rotuloLimpo.toLowerCase();

    // Tenta acionar <select> de categoria se existir
    const selects = Array.from(document.querySelectorAll("select"));
    for (const sel of selects) {
      const opt = Array.from(sel.options || []).find((o) => {
        const ot = (o.textContent || o.value || "").trim().toLowerCase();
        return ot === alvoTexto || ot.includes(alvoTexto);
      });
      if (opt) {
        sel.value = opt.value;
        sel.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }

    // Tenta clicar em botao/aba de filtro correspondente se existir
    const botoesFiltro = Array.from(document.querySelectorAll("button, a, [role='tab'], [data-category], [data-categoria]"));
    for (const btn of botoesFiltro) {
      if (btn.classList.contains("tag-clicavel-canal")) continue;
      const bt = (btn.textContent || btn.getAttribute("data-category") || btn.getAttribute("data-categoria") || "")
        .trim()
        .toLowerCase();
      if (bt === alvoTexto && btn.offsetParent !== null) {
        btn.click();
        break;
      }
    }

    // Filtra visualmente os cartoes de noticia quando aplicavel
    const cards = Array.from(document.querySelectorAll("article, .card, .noticia-card, .news-card, [class*='card']"));
    if (cards.length > 0) {
      cards.forEach((card) => {
        if (card.querySelector("h1, h2, h3, h4, .titulo, [class*='title']")) {
          const textoCard = (card.innerText || "").toLowerCase();
          if (alvoTexto === "todas" || alvoTexto === "todos") {
            card.style.display = "";
          } else if (alvoTexto === "destaque") {
            card.style.display = textoCard.includes("destaque") ? "" : "none";
          } else {
            card.style.display = textoCard.includes(alvoTexto) ? "" : "none";
          }
        }
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function tornarTagsClicaveis() {
    const elementos = Array.from(document.querySelectorAll("span, a, button, div, badge"));
    elementos.forEach((el) => {
      if (el.closest("#rodape-menu-hamburguer")) return;
      if (el.children.length > 0) return;

      const texto = (el.textContent || "").trim();
      const baixo = texto.toLowerCase();
      if (!texto || texto.length > 22) return;

      const ehTagConhecida = NOMES_TAGS.includes(baixo);
      const pareceBadge =
        el.offsetHeight > 0 &&
        el.offsetHeight <= 44 &&
        el.offsetWidth > 0 &&
        el.offsetWidth <= 180 &&
        (ehTagConhecida || /badge|tag|chip|pill|label|cat/i.test(el.className || ""));

      if (!ehTagConhecida && !pareceBadge) return;

      if (el.tagName !== "A" && !el.getAttribute("href")) {
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute("href", "#categoria-" + encodeURIComponent(baixo));
      }

      el.classList.add("tag-clicavel-canal");
      el.title = "Filtrar por " + texto;

      if (!el.dataset.tagLigada) {
        el.dataset.tagLigada = "1";
        el.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          sincronizarFiltroNaPagina(texto);
        });
        el.addEventListener("keydown", function(e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            sincronizarFiltroNaPagina(texto);
          }
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", tornarTagsClicaveis);
  const obs = new MutationObserver(tornarTagsClicaveis);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estiloTags + "\n</head>")
  : estiloTags + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", scriptTags + "\n</body>")
  : html + "\n" + scriptTags;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Tags GERAL, DESTAQUE e categorias agora estao clicaveis!");
