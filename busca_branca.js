const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-busca-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-busca-js">[\s\S]*?<\/script>/g, "");

const add = [
  '<style id="cnm-busca-style">',
  '.cnm-busca-wrap{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 8px}',
  '.cnm-busca-in{flex:1;min-width:0;padding:11px 14px;border-radius:12px;border:2px solid #f59e0b;background:#ffffff;color:#0f172a;font-size:14px;font-weight:600;outline:none}',
  '.cnm-busca-in::placeholder{color:#64748b;font-weight:500}',
  '.cnm-lupa-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:11px 14px;border-radius:12px;border:0;background:linear-gradient(90deg,#ea580c,#f59e0b);color:#090d16;font-weight:800;font-size:14px;box-shadow:0 4px 14px rgba(245,158,11,.28)}',
  '.cnm-g-btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 12px;border-radius:12px;border:1px solid #f59e0b;background:#ffffff;color:#0f172a;font-weight:800;font-size:13px;text-decoration:none}',
  '</style>',
  '<script id="cnm-busca-js">',
  '(()=>{const run=()=>{const inputs=Array.from(document.querySelectorAll("input[type=search],input[placeholder*=Buscar i],input[placeholder*=pesquis i]"));const inp=inputs.find(el=>!el.id||!el.id.startsWith("tv-cnm"));if(!inp)return;let wrap=inp.closest(".cnm-busca-wrap");if(!wrap){wrap=document.createElement("div");wrap.className="cnm-busca-wrap";inp.parentNode.insertBefore(wrap,inp);wrap.appendChild(inp);}inp.classList.add("cnm-busca-in");if(!wrap.querySelector(".cnm-lupa-btn")){const lupa=document.createElement("button");lupa.type="button";lupa.className="cnm-lupa-btn";lupa.innerHTML="&#128269;";lupa.title="Pesquisar";lupa.onclick=()=>{inp.dispatchEvent(new Event("input",{bubbles:true}));inp.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}));};wrap.appendChild(lupa);}if(!wrap.querySelector(".cnm-g-btn")){const g=document.createElement("a");g.className="cnm-g-btn";g.textContent="G";g.title="Buscar no Google";g.target="_blank";g.rel="noopener noreferrer";const syncG=()=>{const q=encodeURIComponent((inp.value||"").trim());g.href=q?"https://www.google.com/search?q="+q:"https://www.google.com";};inp.addEventListener("input",syncG);g.addEventListener("click",syncG);syncG();wrap.appendChild(g);}};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", add + "\n</body>") : h + "\n" + add;
fs.writeFileSync(f, h, "utf8");
console.log("Barra branca com lupinha em destaque aplicada!");
