const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");
h = h.replace(/<style id="css-esportes-link">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(box-esportes-link|js-esportes-link)">[\s\S]*?<\/\1>/g, "");

const bloco = `
<style id="css-esportes-link">
  #box-esportes-link { display: none; margin: 14px auto; padding: 12px; border-radius: 12px; background: #111827; border: 1px solid #374151; color: #fff; }
  #box-esportes-link.ativo { display: block !important; }
  .el-linha { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
  .el-in { flex: 1 1 180px; padding: 10px; border-radius: 8px; border: 1px solid #4b5563; background: #030712; color: #fff; }
  .el-b1 { padding: 10px 14px; border-radius: 8px; border: 0; background: #2563eb; color: #fff; font-weight: 700; }
  .el-b2 { padding: 10px 12px; border-radius: 8px; border: 1px solid #4b5563; background: #1f2937; color: #e5e7eb; }
  .el-tv { position: relative; width: 100%; height: 220px; border-radius: 10px; overflow: hidden; background: #030712; border: 1px solid #374151; }
  .el-tv iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
</style>
<section id="box-esportes-link">
  <div class="el-linha">
    <input id="el-url" class="el-in" placeholder="Cole o link do YouTube ou TikTok..." />
    <button id="el-ver" class="el-b1" type="button">Ver</button>
    <button id="el-limp" class="el-b2" type="button">Limpar</button>
  </div>
  <div id="el-tela" class="el-tv"></div>
</section>
<script id="js-esportes-link">
(() => {
  const K = "cnm_esporte_link";
  const conv = u => {
    u = (u || "").trim();
    const y = u.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    if (y) return "https://www.youtube.com/embed/" + y[1] + "?autoplay=1&rel=0";
    const t = u.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (t) return "https://www.tiktok.com/embed/v2/" + t[1];
    return u;
  };
  const run = () => {
    const box = document.getElementById("box-esportes-link");
    if (!box) return;
    const inp = box.querySelector("#el-url"), b1 = box.querySelector("#el-ver"), b2 = box.querySelector("#el-limp"), tela = box.querySelector("#el-tela");
    const main = document.querySelector("main") || document.body;
    if (box.parentNode !== main) main.appendChild(box);
    const show = u => {
      u = (u || "").trim();
      tela.innerHTML = "";
      if (!u) return;
      const fr = document.createElement("iframe");
      fr.src = conv(u);
      fr.allow = "autoplay; fullscreen; picture-in-picture";
      fr.allowFullscreen = true;
      tela.appendChild(fr);
    };
    const sv = localStorage.getItem(K) || "";
    if (sv) { inp.value = sv; show(sv); }
    b1.onclick = () => { const v = inp.value.trim(); if (!v) return; localStorage.setItem(K, v); show(v); };
    b2.onclick = () => { localStorage.removeItem(K); inp.value = ""; show(""); };
    const isEsp = () => decodeURIComponent(location.pathname + location.hash).toLowerCase().includes("esporte") ||
      Array.from(document.querySelectorAll("select")).some(s => (s.value || "").toLowerCase().includes("esporte"));
    let man = null;
    const sync = () => { if (document.activeElement === inp) return; box.classList.toggle("ativo", man !== null ? man : isEsp()); };
    document.addEventListener("change", () => { man = null; sync(); }, true);
    document.addEventListener("click", e => {
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
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
</script>
`;

h = h.includes("</body>") ? h.replace("</body>", bloco + "\n</body>") : h + "\n" + bloco;
fs.writeFileSync(f, h, "utf8");
console.log("Pronto em:", f);
