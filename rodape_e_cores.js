const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-rodape-cor-style">[\s\S]*?<\/style>/g, "")
     .replace(/<(footer|script) id="(cnm-rodape-box|cnm-rodape-cor-js)">[\s\S]*?<\/\1>/g, "");

const add = [
  '<style id="cnm-rodape-cor-style">',
  '#cnm-rodape-box{margin:24px auto 28px;padding:16px;border-radius:18px;background:linear-gradient(180deg,#141923 0%,#0a0d14 100%);border:1.5px solid var(--cnm-cor,#f59e0b);color:#f8fafc}',
  '.cnm-rod-titulo{font-size:12px;font-weight:800;letter-spacing:.4px;color:var(--cnm-cor,#fbbf24);margin-bottom:10px;text-transform:uppercase}',
  '.cnm-redes-grid{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}',
  '.cnm-rede-card{flex:1 1 130px;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 14px;border-radius:12px;background:#1a2234;border:1px solid var(--cnm-cor,#f59e0b);color:#ffffff;font-size:13px;font-weight:800;text-decoration:none}',
  '.cnm-cores-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
  '.cnm-cor-btn{padding:8px 13px;border-radius:10px;border:1.5px solid #475569;background:#111827;color:#f8fafc;font-size:12px;font-weight:800}',
  '.cnm-cor-btn.ativa{border-color:#ffffff;box-shadow:0 0 0 2px var(--cnm-cor,#f59e0b)}',
  'header,[class*=topbar],[class*=header],.tv-cnm-badge,.tv-cnm-b1,.cnm-lupa-btn{accent-color:var(--cnm-cor,#f59e0b)}',
  '</style>',
  '<footer id="cnm-rodape-box">',
  '<div class="cnm-rod-titulo">Redes Sociais • Canal News Mundo</div>',
  '<div class="cnm-redes-grid">',
  '<a class="cnm-rede-card" href="https://www.youtube.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer">YouTube</a>',
  '<a class="cnm-rede-card" href="https://www.tiktok.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer">TikTok</a>',
  '</div>',
  '<div class="cnm-rod-titulo">Tom de Cor do Site</div>',
  '<div id="cnm-cores-lista" class="cnm-cores-row"></div>',
  '</footer>',
  '<script id="cnm-rodape-cor-js">',
  '(()=>{const K="cnm_tom_cor";const CORES=[{nome:"Ambar",cor:"#f59e0b",escuro:"#b45309"},{nome:"Azul",cor:"#3b82f6",escuro:"#1d4ed8"},{nome:"Esmeralda",cor:"#10b981",escuro:"#047857"},{nome:"Rubi",cor:"#ef4444",escuro:"#b91c1c"}];const aplicarCor=(nome)=>{const escolhido=CORES.find(c=>c.nome===nome)||CORES[0];document.documentElement.style.setProperty("--cnm-cor",escolhido.cor);document.documentElement.style.setProperty("--cnm-cor-escura",escolhido.escuro);document.querySelectorAll("header,[class*=header],[class*=topbar]").forEach(el=>{el.style.background="linear-gradient(90deg,"+escolhido.escuro+" 0%,"+escolhido.cor+" 100%)";});document.querySelectorAll(".cnm-cor-btn").forEach(btn=>{btn.classList.toggle("ativa",btn.dataset.nome===escolhido.nome);});localStorage.setItem(K,escolhido.nome);};const run=()=>{const foot=document.getElementById("cnm-rodape-box");const lista=document.getElementById("cnm-cores-lista");if(foot&&foot.parentNode!==document.body)document.body.appendChild(foot);if(lista){lista.innerHTML="";CORES.forEach(item=>{const b=document.createElement("button");b.type="button";b.className="cnm-cor-btn";b.dataset.nome=item.nome;b.textContent=item.nome;b.style.borderColor=item.cor;b.onclick=()=>aplicarCor(item.nome);lista.appendChild(b);});}aplicarCor(localStorage.getItem(K)||"Ambar");};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", add + "\n</body>") : h + "\n" + add;
fs.writeFileSync(f, h, "utf8");
console.log("Rodape com YouTube, TikTok e seletor de cor adicionado!");
