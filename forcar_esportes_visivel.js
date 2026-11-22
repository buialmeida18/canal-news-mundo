const fs = require("fs");
const path = require("path");

const candidatos = [
  path.join(process.cwd(), "public", "index.html"),
  path.join(process.cwd(), "index.html")
];
const arquivo = candidatos.find((p) => fs.existsSync(p));

if (!arquivo) {
  console.error("Arquivo HTML nao encontrado em:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<!-- INÍCIO: BLOCO ESPORTES AO VIVO[\s\S]*?<!-- FIM: BLOCO ESPORTES AO VIVO[\s\S]*?-->\s*/g, "");
html = html.replace(/<style id="estilo-esportes-aovivo-copiar">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<script id="script-esportes-aovivo-copiar">[\s\S]*?<\/script>\s*/g, "");

const blocoEsportes = `
<!-- INÍCIO: BLOCO ESPORTES AO VIVO (CANAL NEWS MUNDO) -->
<style id="estilo-esportes-aovivo-copiar">
  #painel-esportes-aovivo {
    display: none;
    margin: 14px auto 18px auto;
    padding: 14px;
    border-radius: 14px;
    background: linear-gradient(160deg, #111927 0%, #0b111c 100%);
    border: 1px solid rgba(59, 130, 246, 0.45);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
  #painel-esportes-aovivo.ativo {
    display: block !important;
  }
  .aovivo-cabecalho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }
  .aovivo-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(220, 38, 38, 0.2);
    border: 1px solid rgba(248, 113, 113, 0.5);
    color: #FCA5A5;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .aovivo-ponto {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #EF4444;
    box-shadow: 0 0 8px #EF4444;
  }
  .aovivo-titulo {
    color: #F8FAFC;
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }
  .aovivo-controles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .aovivo-input {
    flex: 1 1 200px;
    min-width: 0;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: #0f172a;
    color: #F8FAFC;
    font-size: 13px;
  }
  .aovivo-input::placeholder {
    color: #64748B;
  }
  .aovivo-btn-carregar {
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }
  .aovivo-btn-limpar {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: rgba(30, 41, 59, 0.85);
    color: #CBD5E1;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  .aovivo-player-box {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    border-radius: 12px;
    overflow: hidden;
    background: #05080f;
    border: 1px solid rgba(148, 163, 184, 0.22);
  }
  .aovivo-player-box iframe,
  .aovivo-player-box video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .aovivo-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px;
    color: #94A3B8;
    font-size: 13px;
    line-height: 1.5;
  }
  .aovivo-rodape {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
    font-size: 12px;
    color: #94A3B8;
  }
  .aovivo-link-externo {
    color: #60A5FA;
    text-decoration: none;
    font-weight: 600;
  }
</style>

<section id="painel-esportes-aovivo" aria-label="Transmissão de Esportes Ao Vivo">
  <div class="aovivo-cabecalho">
    <span class="aovivo-badge"><span class="aovivo-ponto"></span> Esportes • Ao Vivo</span>
    <span style="font-size:12px;color:#94A3B8;">Canal News Mundo</span>
  </div>
  <h3 class="aovivo-titulo">Transmissão do Jogo Ao Vivo</h3>
  <div class="aovivo-controles">
    <input
      type="url"
      id="input-link-jogo-aovivo"
      class="aovivo-input"
      placeholder="Cole aqui o link do jogo ao vivo (YouTube ou player)..."
    />
    <button type="button" id="btn-carregar-jogo-aovivo" class="aovivo-btn-carregar">Carregar Jogo</button>
    <button type="button" id="btn-limpar-jogo-aovivo" class="aovivo-btn-limpar">Limpar</button>
  </div>
  <div class="aovivo-player-box" id="box-player-esportes">
    <div class="aovivo-placeholder">
      Cole o link da transmissão acima e toque em <strong>Carregar Jogo</strong> para assistir direto na seção Esportes.
    </div>
  </div>
  <div class="aovivo-rodape">
    <span>Dica: links do YouTube Live funcionam direto na tela.</span>
    <a
      id="link-externo-jogo-aovivo"
      class="aovivo-link-externo"
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      style="display:none;"
    >Abrir transmissão externa ↗</a>
  </div>
</section>

<script id="script-esportes-aovivo-copiar">
  (function () {
    const CHAVE_STORAGE = "canal_news_mundo_esportes_live_url";

    function normalizarUrlEmbed(urlBruta) {
      const url = (urlBruta || "").trim();
      if (!url) return "";

      const ytMatch = url.match(
        /(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/
      );
      if (ytMatch && ytMatch[1]) {
        return "https://www.youtube.com/embed/" + ytMatch[1] + "?autoplay=1&rel=0";
      }

      return url;
    }

    function ehVideoDireto(url) {
      return /\\.(mp4|webm|ogg)(\\?.*)?$/i.test(url);
    }

    function posicionarPainel(painel) {
      const select = document.querySelector("select");
      const status = Array.from(document.querySelectorAll("div, span, p")).find(
        (el) => (el.textContent || "").includes("Servidor conectado")
      );
      if (status && status.parentNode) {
        status.parentNode.insertBefore(painel, status.nextSibling);
        return;
      }
      if (select && select.parentNode) {
        select.parentNode.insertBefore(painel, select.nextSibling);
      }
    }

    function estaEmEsportes() {
      const hash = decodeURIComponent(window.location.hash || "").toLowerCase();
      const pathname = decodeURIComponent(window.location.pathname || "").toLowerCase();
      const selects = Array.from(document.querySelectorAll("select"));
      const temSelectEsporte = selects.some((s) => {
        const val = (s.value || "").toLowerCase();
        const txt = s.options && s.selectedIndex >= 0
          ? (s.options[s.selectedIndex].textContent || "").toLowerCase()
          : "";
        return val.includes("esporte") || txt.includes("esporte");
      });

      return hash.includes("esporte") || pathname.includes("esporte") || temSelectEsporte;
    }

    function iniciarPainelEsportesAoVivo() {
      const painel = document.getElementById("painel-esportes-aovivo");
      if (!painel) return;

      posicionarPainel(painel);

      const input = painel.querySelector("#input-link-jogo-aovivo");
      const btnCarregar = painel.querySelector("#btn-carregar-jogo-aovivo");
      const btnLimpar = painel.querySelector("#btn-limpar-jogo-aovivo");
      const boxPlayer = painel.querySelector("#box-player-esportes");
      const linkExterno = painel.querySelector("#link-externo-jogo-aovivo");

      function renderizarPlayer(urlOriginal) {
        const limpa = (urlOriginal || "").trim();
        if (!limpa) {
          boxPlayer.innerHTML =
            '<div class="aovivo-placeholder">Cole o link da transmissão acima e toque em <strong>Carregar Jogo</strong> para assistir direto na seção Esportes.</div>';
          linkExterno.style.display = "none";
          return;
        }

        const urlFinal = normalizarUrlEmbed(limpa);
        linkExterno.href = limpa;
        linkExterno.style.display = "inline-block";

        if (ehVideoDireto(urlFinal)) {
          boxPlayer.innerHTML =
            '<video src="' + urlFinal.replace(/"/g, "&quot;") + '" controls autoplay playsinline></video>';
        } else {
          boxPlayer.innerHTML =
            '<iframe src="' +
            urlFinal.replace(/"/g, "&quot;") +
            '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>';
        }
      }

      const salvo = localStorage.getItem(CHAVE_STORAGE) || "";
      if (salvo) {
        input.value = salvo;
        renderizarPlayer(salvo);
      }

      btnCarregar.addEventListener("click", function () {
        const val = input.value.trim();
        if (!val) return;
        localStorage.setItem(CHAVE_STORAGE, val);
        renderizarPlayer(val);
      });

      btnLimpar.addEventListener("click", function () {
        localStorage.removeItem(CHAVE_STORAGE);
        input.value = "";
        renderizarPlayer("");
      });

      let forcarManual = null;

      function sincronizar() {
        posicionarPainel(painel);
        const mostrar = forcarManual !== null ? forcarManual : estaEmEsportes();
        painel.classList.toggle("ativo", mostrar);
      }

      document.addEventListener("change", function () {
        forcarManual = null;
        sincronizar();
      }, true);

      document.addEventListener("click", function (e) {
        const alvo = e.target.closest("button, a, span, div, li, option");
        if (!alvo) return;
        const txt = (alvo.textContent || "").trim().toLowerCase();
        if (txt === "esportes" || txt === "esporte") {
          forcarManual = true;
          sincronizar();
        } else if (
          txt === "todas as notícias" ||
          txt === "todas as noticias" ||
          txt === "mundo" ||
          txt === "tecnologia" ||
          txt === "geral"
        ) {
          forcarManual = false;
          sincronizar();
        }
      }, true);

      sincronizar();
      setInterval(sincronizar, 600);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", iniciarPainelEsportesAoVivo);
    } else {
      iniciarPainelEsportesAoVivo();
    }
  })();
</script>
<!-- FIM: BLOCO ESPORTES AO VIVO (CANAL NEWS MUNDO) -->
`;

html = html.includes("</body>")
  ? html.replace("</body>", blocoEsportes + "\n</body>")
  : html + "\n" + blocoEsportes;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Painel Esportes Ao Vivo configurado para aparecer na tela de Esportes!");
