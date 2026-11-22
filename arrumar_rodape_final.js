const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/\(\(\)=>\{const K="cnm_tom_cor"[\s\S]*?<\/script>/g, "")
     .replace(/<script id="cnm-rodape-cor-js">[\s\S]*?<\/script>/g, "")
     .replace(/<style id="cnm-rodape-cor-style">[\s\S]*?<\/style>/g, "")
     .replace(/<footer id="cnm-rodape-box">[\s\S]*?<\/footer>/g, "");

const parteFinal = [
  '<style id="cnm-rodape-cor-style">',
  '#cnm-rodape-box{width:100%;max-width:960px;margin:24px auto 28px;padding:16px;border-radius:18px;background:linear-gradient(180deg,#141923 0%,#0a0d14 100%);border:1.5px solid var(--cnm-cor,#f59e0b);color:#f8fafc;box-sizing:border-box}',
  '.cnm-rod-titulo{font-size:12px;font-weight:800;letter-spacing:.4px;color:var(--cnm-cor,#fbbf24);margin-bottom:10px;text-transform:uppercase}',
  '.cnm-redes-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:16px}',
  '@media (max-width:480px){.cnm-redes-grid{grid-template-columns:1fr}}',
  '.cnm-rede-card{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 14px;border-radius:12px;font-size:14px;font-weight:800;text-decoration:none;transition:transform .15s ease,opacity .15s ease}',
  '.cnm-rede-yt{background:linear-gradient(90deg,#b91c1c 0%,#ef4444 100%);color:#ffffff;border:1.5px solid #fca5a5;box-shadow:0 4px 14px rgba(239,68,68,.25)}',
  '.cnm-rede-tt{background:linear-gradient(90deg,#090d16 0%,#18181b 100%);color:#ffffff;border:1.5px solid #00f2ea;box-shadow:0 0 0 1px rgba(255,0,80,.55),0 4px 14px rgba(0,242,234,.18)}',
  '.cnm-cores-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
  '.cnm-cor-btn{padding:8px 13px;border-radius:10px;border:1.5px solid #475569;background:#111827;color:#f8fafc;font-size:12px;font-weight:800}',
  '.cnm-cor-btn.ativa{border-color:#ffffff;box-shadow:0 0 0 2px var(--cnm-cor,#f59e0b)}',
  '</style>',
  '<footer id="cnm-rodape-box">',
  '<div class="cnm-rod-titulo">Redes Sociais • Canal News Mundo</div>',
  '<div class="cnm-redes-grid">',
  '<a class="cnm-rede-card cnm-rede-yt" href="https://www.youtube.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer">&#9654; YouTube</a>',
  '<a class="cnm-rede-card cnm-rede-tt" href="https://www.tiktok.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer">&#9835; TikTok</a>',
  '</div>',
  '<div class="cnm-rod-titulo">Tom de Cor do Site</div>',
  '<div id="cnm-cores-lista" class="cnm-cores-row"></div>',
  '</footer>',
  '<script id="cnm-rodape-cor-js">',
  '(()=>{const K="cnm_tom_cor";const CORES=[{nome:"Ambar",cor:"#f59e0b",escuro:"#b45309"},{nome:"Azul",cor:"#3b82f6",escuro:"#1d4ed8"},{nome:"Esmeralda",cor:"#10b981",escuro:"#047857"},{nome:"Rubi",cor:"#ef4444",escuro:"#b91c1c"}];const aplicarCor=(nome)=>{const escolhido=CORES.find(c=>c.nome===nome)||CORES[0];document.documentElement.style.setProperty("--cnm-cor",escolhido.cor);document.documentElement.style.setProperty("--cnm-cor-escura",escolhido.escuro);document.querySelectorAll("header,[class*=header],[class*=topbar]").forEach(el=>{el.style.background="linear-gradient(90deg,"+escolhido.escuro+" 0%,"+escolhido.cor+" 100%)";});document.querySelectorAll(".cnm-cor-btn").forEach(btn=>{btn.classList.toggle("ativa",btn.dataset.nome===escolhido.nome);});localStorage.setItem(K,escolhido.nome);};const run=()=>{const foot=document.getElementById("cnm-rodape-box");const lista=document.getElementById("cnm-cores-lista");if(foot&&foot.parentNode!==document.body)document.body.appendChild(foot);if(lista){lista.innerHTML="";CORES.forEach(item=>{const b=document.createElement("button");b.type="button";b.className="cnm-cor-btn";b.dataset.nome=item.nome;b.textContent=item.nome;b.style.borderColor=item.cor;b.onclick=()=>aplicarCor(item.nome);lista.appendChild(b);});}aplicarCor(localStorage.getItem(K)||"Ambar");};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", parteFinal + "\n</body>") : h + "\n" + parteFinal;
fs.writeFileSync(f, h, "utf8");
console.log("Rodape limpo, cores das redes aplicadas e layout ajustado!");
