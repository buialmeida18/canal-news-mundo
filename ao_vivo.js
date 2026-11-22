const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="css-esportes-link">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(box-esportes-link|js-esportes-link)">[\s\S]*?<\/\1>/g, "")
     .replace(/<style id="css-cnm-aovivo">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(cnm-aovivo-box|cnm-aovivo-js)">[\s\S]*?<\/\1>/g, "");

const ui = `
<style id="css-cnm-aovivo">
  #cnm-aovivo-box {
    display: none;
    margin: 14px auto 18px;
    padding: 16px;
    border-radius: 18px;
    background: #0b1324;
    border: 1px solid #1e293b;
    color: #f8fafc;
    box-shadow: 0 10px 25px rgba(0,0,0,.35);
  }
  #cnm-aovivo-box.visivel { display: block !important; }
  .cnm-av-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  .cnm-av-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    border-radius: 999px;
    background: rgba(239,68,68,.16);
    border: 1px solid rgba(248,113,113,.45);
    color: #fca5a5;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .5px;
  }
  .cnm-av-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #ef4444;
  }
  .cnm-av-canal { font-size: 13px; font-weight: 700; color: #cbd5e1; text-align: right; }
  .cnm-av-titulo { font-size: 18px; font-weight: 800; margin: 0 0 12px; color: #fff; }
  .cnm-av-input {
    width: 100%;
    box-sizing: border-box;
    padding: 13px 14px;
    border-radius: 12px;
    border: 1px solid #334155;
    background: #070d19;
    color: #fff;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .cnm-av-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
  .cnm-av-btn1 {
    padding: 11px 18px;
    border-radius: 12px;
    border: 0;
    background: #2563eb;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
  }
  .cnm-av-btn2 {
    padding: 11px 16px;
    border-radius: 12px;
    border: 1px solid #334155;
    background: #172033;
    color: #e2e8f0;
    font-weight: 600;
    font-size: 14px;
  }
  .cnm-av-tela {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    border-radius: 14px;
    overflow: hidden;
    background: #040811;
    border: 1px solid #1e293b;
  }
  .cnm-av-tela iframe,
  .cnm-av-tela video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .cnm-av-vazio {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    text-align: center;
    color: #94a3b8;
    font-size: 13px;
  }
  .cnm-av-dica { margin: 12px 0 10px; font-size: 13px; color: #94a3b8; line-height: 1.45; }
  .cnm-av-ext { display: inline-block; color: #60a5fa; font-weight: 700; font-size: 14px; text-decoration: none; }
</style>

<section id="cnm-aovivo-box">
  <div class="cnm-av-top">
    <span class="cnm-av-badge"><span class="cnm-av-dot"></span>ESPORTES • AO VIVO</span>
    <span class="cnm-av-canal">Canal News Mundo</span>
  </div>
  <h3 class="cnm-av-titulo">Transmissão do Jogo Ao Vivo</h3>
  <input id="cnm-av-url" class="cnm-av-input" type="text" placeholder="Cole link do YouTube, TikTok ou TV ao vivo..." />
  <div class="cnm-av-btns">
    <button id="cnm-av-load" class="cnm-av-btn1" type="button">Carregar Jogo</button>
    <button id="cnm-av-clear" class="cnm-av-btn2" type="button">Limpar</button>
    <button id="cnm-av-keep" class="cnm-av-btn2" type="button">Manter Espaço: ON</button>
  </div>
  <div id="cnm-av-tela" class="cnm-av-tela">
    <div class="cnm-av-vazio">Cole um link do YouTube, TikTok ou TV ao vivo e toque em <strong>Carregar Jogo</strong>.</div>
  </div>
  <p class="cnm-av-dica">Dica: links do YouTube Live, TikTok ou transmissões ao vivo funcionam direto na tela.</p>
  <a id="cnm-av-ext" class="cnm-av-ext" href="#" target="_blank" rel="noopener noreferrer" style="display:none;">Abrir transmissão externa ↗</a>
</section>

<script id="cnm-aovivo-js">
(() => {
  const K_URL = "cnm_aovivo_url";
  const K_KEEP = "cnm_aovivo_keep";

  const parseUrl = (raw) => {
    const u = (raw || "").trim();
    if (!u) return { tipo: "vazio", src: "" };

    const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    if (yt && yt[1]) {
      return { tipo: "iframe", src: "https://www.youtube.com/embed/" + yt[1] + "?autoplay=1&rel=0" };
    }

    const tt = u.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (tt && tt[1]) {
      return { tipo: "iframe", src: "https://www.tiktok.com/embed/v2/" + tt[1] };
    }

    if (/\.(mp4|webm|ogg|m3u8)(\?.*)?$/i.test(u)) {
      return { tipo: "video", src: u };
    }

    return { tipo: "iframe", src: u };
  };

  const run = () => {
    const box = document.getElementById("cnm-aovivo-box");
    if (!box) return;

    const inp = box.querySelector("#cnm-av-url");
    const btnLoad = box.querySelector("#cnm-av-load");
    const btnClear = box.querySelector("#cnm-av-clear");
    const btnKeep = box.querySelector("#cnm-av-keep");
    const tela = box.querySelector("#cnm-av-tela");
    const ext = box.querySelector("#cnm-av-ext");

    const main = document.querySelector("main") || document.body;
    if (box.parentNode !== main) main.appendChild(box);

    let keep = localStorage.getItem(K_KEEP) !== "0";
    const paintKeep = () => {
      btnKeep.textContent = keep ? "Manter Espaço: ON" : "Manter Espaço: OFF";
    };
    paintKeep();

    const render = (raw) => {
      const info = parseUrl(raw);
      if (info.tipo === "vazio") {
        tela.innerHTML = '<div class="cnm-av-vazio">Cole um link do YouTube, TikTok ou TV ao vivo e toque em <strong>Carregar Jogo</strong>.</div>';
        ext.style.display = "none";
        return;
      }

      ext.href = (raw || "").trim();
      ext.style.display = "inline-block";

      if (info.tipo === "video") {
        const v = document.createElement("video");
        v.src = info.src;
        v.controls = true;
        v.autoplay = true;
        v.playsInline = true;
        tela.innerHTML = "";
        tela.appendChild(v);
        return;
      }

      const fr = document.createElement("iframe");
      fr.src = info.src;
      fr.allow = "autoplay; fullscreen; picture-in-picture";
      fr.allowFullscreen = true;
      tela.innerHTML = "";
      tela.appendChild(fr);
    };

    const saved = localStorage.getItem(K_URL) || "";
    if (saved) {
      inp.value = saved;
      render(saved);
    }

    btnLoad.onclick = () => {
      const v = inp.value.trim();
      if (!v) return;
      localStorage.setItem(K_URL, v);
      render(v);
    };

    btnClear.onclick = () => {
      localStorage.removeItem(K_URL);
      inp.value = "";
      render("");
    };

    btnKeep.onclick = () => {
      keep = !keep;
      localStorage.setItem(K_KEEP, keep ? "1" : "0");
      paintKeep();
      sync();
    };

    const isEsp = () =>
      decodeURIComponent(location.pathname + location.hash).toLowerCase().includes("esporte") ||
      Array.from(document.querySelectorAll("select")).some((s) => (s.value || "").toLowerCase().includes("esporte"));

    let man = null;
    const sync = () => {
      if (document.activeElement === inp) return;
      const shouldShow = keep || (man !== null ? man : isEsp());
      box.classList.toggle("visivel", shouldShow);
    };

    document.addEventListener("change", () => { man = null; sync(); }, true);
    document.addEventListener("click", (e) => {
      if (box.contains(e.target)) return;
      const a = e.target.closest("button,a,span,div,li,option");
      if (!a) return;
      const t = (a.textContent || "").trim().toLowerCase();
      if (t === "esportes" || t === "esporte") { man = true; sync(); }
      else if (["todas as notícias", "todas as noticias", "mundo", "tecnologia", "geral"].includes(t)) { man = false; sync(); }
    }, true);

    sync();
    setInterval(sync, 600);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
</script>
`;

h = h.includes("</body>") ? h.replace("</body>", ui + "\n</body>") : h + "\n" + ui;
fs.writeFileSync(f, h, "utf8");
console.log("Instalado em:", f);
