const fs = require("fs");
const htmlPath = fs.existsSync("public/index.html") ? "public/index.html" : "index.html";
let html = fs.readFileSync(htmlPath, "utf8");

html = html.replace(/<!-- MINI-APP ESPORTES SIMPLES -->[\s\S]*?<!-- FIM MINI-APP ESPORTES SIMPLES -->\s*/g, "");

const blocoSimples = `
<!-- MINI-APP ESPORTES SIMPLES -->
<style id="css-mini-app-esportes">
  #mini-app-esportes {
    display: none;
    margin: 14px auto 18px;
    padding: 14px;
    border-radius: 14px;
    background: #111827;
    border: 1px solid #3b82f6;
    color: #f9fafb;
  }
  #mini-app-esportes.visivel {
    display: block !important;
  }
  .mae-topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 700;
  }
  .mae-linha {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .mae-input {
    flex: 1 1 200px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #4b5563;
    background: #030712;
    color: #ffffff;
    font-size: 14px;
  }
  .mae-btn {
    padding: 10px 14px;
    border-radius: 10px;
    border: 0;
    background: #2563eb;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }
  .mae-btn-limpar {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #4b5563;
    background: #1f2937;
    color: #e5e7eb;
    cursor: pointer;
  }
  .mae-tv {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    border-radius: 12px;
    overflow: hidden;
    background: #030712;
    border: 2px solid #60a5fa;
  }
  .mae-tv iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .mae-vazio {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
  }
  .mae-rodape {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #9ca3af;
  }
  .mae-abrir {
    color: #60a5fa;
    font-weight: 700;
    text-decoration: none;
  }
</style>

<section id="mini-app-esportes">
  <div class="mae-topo">
    <span>App Esportes • YouTube e TikTok</span>
    <span>Canal News Mundo</span>
  </div>
  <div class="mae-linha">
    <input id="mae-link" class="mae-input" type="text" placeholder="Cole o link do YouTube ou TikTok..." />
    <button id="mae-abrir-btn" class="mae-btn" type="button">Mostrar</button>
    <button id="mae-limpar-btn" class="mae-btn-limpar" type="button">Limpar</button>
  </div>
  <div id="mae-tela" class="mae-tv">
    <div class="mae-vazio">Cole um link do YouTube ou TikTok e toque em <strong>Mostrar</strong>.</div>
  </div>
  <div class="mae-rodape">
    <span>Se o TikTok não abrir na caixa, use o link ao lado.</span>
    <a id="mae-externo" class="mae-abrir" href="#" target="_blank" rel="noopener noreferrer" style="display:none;">Abrir link ↗</a>
  </div>
</section>

<script id="js-mini-app-esportes">
(() => {
  const CHAVE = "cnm_mini_app_esportes_link";

  function converterLink(raw) {
    const url = (raw || "").trim();
    if (!url) return "";

    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    if (yt && yt[1]) {
      return "https://www.youtube.com/embed/" + yt[1] + "?autoplay=1&rel=0";
    }

    const tt = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (tt && tt[1]) {
      return "https://www.tiktok.com/embed/v2/" + tt[1];
    }

    return url;
  }

  function naAbaEsportes() {
    const rota = decodeURIComponent(location.pathname + location.hash).toLowerCase();
    const temSelect = Array.from(document.querySelectorAll("select")).some(
      (s) => (s.value || "").toLowerCase().includes("esporte")
    );
    return rota.includes("esporte") || temSelect;
  }

  function iniciar() {
    const app = document.getElementById("mini-app-esportes");
    if (!app) return;

    const inp = app.querySelector("#mae-link");
    const btnMostrar = app.querySelector("#mae-abrir-btn");
    const btnLimpar = app.querySelector("#mae-limpar-btn");
    const tela = app.querySelector("#mae-tela");
    const externo = app.querySelector("#mae-externo");

    const status = Array.from(document.querySelectorAll("div,span,p")).find(
      (el) => (el.textContent || "").includes("Servidor conectado")
    );
    if (status && status.parentNode && status.nextSibling !== app) {
      status.parentNode.insertBefore(app, status.nextSibling);
    }

    function mostrarLink(urlOriginal) {
      const limpo = (urlOriginal || "").trim();
      if (!limpo) {
        tela.innerHTML = '<div class="mae-vazio">Cole um link do YouTube ou TikTok e toque em <strong>Mostrar</strong>.</div>';
        externo.style.display = "none";
        return;
      }
      externo.href = limpo;
      externo.style.display = "inline";
      tela.innerHTML = '<iframe src="' + converterLink(limpo).replace(/"/g, "&quot;") + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    }

    const salvo = localStorage.getItem(CHAVE) || "";
    if (salvo) {
      inp.value = salvo;
      mostrarLink(salvo);
    }

    btnMostrar.onclick = () => {
      const v = inp.value.trim();
      if (!v) return;
      localStorage.setItem(CHAVE, v);
      mostrarLink(v);
    };

    btnLimpar.onclick = () => {
      localStorage.removeItem(CHAVE);
      inp.value = "";
      mostrarLink("");
    };

    let forcarEsporte = null;
    function atualizarVisibilidade() {
      if (document.activeElement === inp) return;
      app.classList.toggle("visivel", forcarEsporte !== null ? forcarEsporte : naAbaEsportes());
    }

    document.addEventListener("change", () => {
      forcarEsporte = null;
      atualizarVisibilidade();
    }, true);

    document.addEventListener("click", (e) => {
      if (app.contains(e.target)) return;
      const item = e.target.closest("button,a,span,div,li,option");
      if (!item) return;
      const txt = (item.textContent || "").trim().toLowerCase();
      if (txt === "esportes" || txt === "esporte") {
        forcarEsporte = true;
        atualizarVisibilidade();
      } else if (["todas as notícias", "todas as noticias", "mundo", "tecnologia", "geral"].includes(txt)) {
        forcarEsporte = false;
        atualizarVisibilidade();
      }
    }, true);

    atualizarVisibilidade();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
</script>
<!-- FIM MINI-APP ESPORTES SIMPLES -->
`;

html = html.includes("</body>")
  ? html.replace("</body>", blocoSimples + "\n</body>")
  : html + "\n" + blocoSimples;

fs.writeFileSync(htmlPath, html, "utf8");
console.log("Mini-app simples aplicado em:", htmlPath);
