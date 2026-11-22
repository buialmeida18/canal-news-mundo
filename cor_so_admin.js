const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-cor-admin-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-cor-admin-js">[\s\S]*?<\/script>/g, "");

const css = [
  "<style id=\"cnm-cor-admin-style\">",
  "#cnm-rodape-box .cnm-cor-area{display:none!important}",
  "#cnm-rodape-box.admin-cores-visivel .cnm-cor-area{display:block!important;margin-bottom:16px!important}",
  "</style>"
].join("\n");

const js = [
  "<script id=\"cnm-cor-admin-js\">",
  "(()=>{",
  "const COR_PADRAO=\"Ambar\";",
  "const K_COR=\"cnm_tom_cor\";",
  "const CORES=[{nome:\"Ambar\",cor:\"#f59e0b\",escuro:\"#b45309\"},{nome:\"Azul\",cor:\"#3b82f6\",escuro:\"#1d4ed8\"},{nome:\"Esmeralda\",cor:\"#10b981\",escuro:\"#047857\"},{nome:\"Rubi\",cor:\"#ef4444\",escuro:\"#b91c1c\"}];",
  "const ehAdmin=()=>{",
  "  const txt=document.body.innerText||\"\";",
  "  return Boolean(document.querySelector(\"[data-admin],.admin-panel,#painel-admin,.modo-admin\"))||/\\bexcluir\\b|novo post|sair do admin|painel admin/i.test(txt);",
  "};",
  "const aplicarCor=(nome,salvarLocal)=>{",
  "  const esc=CORES.find(c=>c.nome===nome)||CORES.find(c=>c.nome===COR_PADRAO)||CORES[0];",
  "  document.documentElement.style.setProperty(\"--cnm-cor\",esc.cor);",
  "  document.documentElement.style.setProperty(\"--cnm-cor-escura\",esc.escuro);",
  "  const box=document.getElementById(\"cnm-rodape-box\");",
  "  if(box)box.style.borderColor=esc.cor;",
  "  document.querySelectorAll(\"header,[class*=header],[class*=topbar]\").forEach(el=>{el.style.background=\"linear-gradient(90deg,\"+esc.escuro+\" 0%,\"+esc.cor+\" 100%)\";});",
  "  document.querySelectorAll(\"#cnm-rodape-box .cnm-cor-btn\").forEach(b=>{const ativa=b.dataset.nome===esc.nome;b.classList.toggle(\"ativa\",ativa);b.style.boxShadow=ativa?\"0 0 0 2px \"+esc.cor:\"none\";});",
  "  if(salvarLocal)localStorage.setItem(K_COR,esc.nome);",
  "};",
  "const prepararAreaCor=()=>{",
  "  const box=document.getElementById(\"cnm-rodape-box\");",
  "  const lista=document.getElementById(\"cnm-cores-lista\");",
  "  if(!box||!lista)return;",
  "  if(!box.querySelector(\".cnm-cor-area\")){",
  "    const area=document.createElement(\"div\");",
  "    area.className=\"cnm-cor-area\";",
  "    const prev=lista.previousElementSibling;",
  "    if(prev&&/tom de cor/i.test(prev.innerText||\"\"))area.appendChild(prev);",
  "    area.appendChild(lista);",
  "    const redes=box.querySelector(\".cnm-redes-grid\");",
  "    if(redes&&redes.nextSibling)box.insertBefore(area,redes.nextSibling);",
  "    else box.appendChild(area);",
  "  }",
  "  const adm=ehAdmin();",
  "  box.classList.toggle(\"admin-cores-visivel\",adm);",
  "  const corAtiva=adm?(localStorage.getItem(K_COR)||COR_PADRAO):COR_PADRAO;",
  "  aplicarCor(corAtiva,adm);",
  "};",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",prepararAreaCor);else prepararAreaCor();",
  "setInterval(prepararAreaCor,1000);",
  "})();",
  "</script>"
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", css + "\n" + js + "\n</body>") : h + "\n" + css + "\n" + js;
fs.writeFileSync(f, h, "utf8");
console.log("Controle de cor agora aparece apenas no modo admin e segue o codigo padrao para visitantes!");
