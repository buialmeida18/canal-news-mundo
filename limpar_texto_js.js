const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/\(\(\)=>\{const K="cnm_tom_cor"[\s\S]*?<\/script>/g, "</script>")
     .replace(/<script id="cnm-rodape-cor-js">[\s\S]*?<\/script>/g, "");

const jsLimpo = [
  '<script id="cnm-rodape-cor-js">',
  '(()=>{const K="cnm_tom_cor";const CORES=[{nome:"Ambar",cor:"#f59e0b",escuro:"#b45309"},{nome:"Azul",cor:"#3b82f6",escuro:"#1d4ed8"},{nome:"Esmeralda",cor:"#10b981",escuro:"#047857"},{nome:"Rubi",cor:"#ef4444",escuro:"#b91c1c"}];const aplicarCor=(nome)=>{const escolhido=CORES.find(c=>c.nome===nome)||CORES[0];document.documentElement.style.setProperty("--cnm-cor",escolhido.cor);document.documentElement.style.setProperty("--cnm-cor-escura",escolhido.escuro);document.querySelectorAll("header,[class*=header],[class*=topbar]").forEach(el=>{el.style.background="linear-gradient(90deg,"+escolhido.escuro+" 0%,"+escolhido.cor+" 100%)";});document.querySelectorAll(".cnm-cor-btn").forEach(btn=>{btn.classList.toggle("ativa",btn.dataset.nome===escolhido.nome);});localStorage.setItem(K,escolhido.nome);};const run=()=>{const foot=document.getElementById("cnm-rodape-box");const lista=document.getElementById("cnm-cores-lista");if(foot&&foot.parentNode!==document.body)document.body.appendChild(foot);if(lista){lista.innerHTML="";CORES.forEach(item=>{const b=document.createElement("button");b.type="button";b.className="cnm-cor-btn";b.dataset.nome=item.nome;b.textContent=item.nome;b.style.borderColor=item.cor;b.onclick=()=>aplicarCor(item.nome);lista.appendChild(b);});}aplicarCor(localStorage.getItem(K)||"Ambar");};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", jsLimpo + "\n</body>") : h + "\n" + jsLimpo;
fs.writeFileSync(f, h, "utf8");
console.log("Texto de codigo removido da tela!");
