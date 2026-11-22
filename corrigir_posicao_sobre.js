const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-fix-modal-pos-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-fix-modal-pos-js">[\s\S]*?<\/script>/g, "");

const css = [
  "<style id=\"cnm-fix-modal-pos-style\">",
  "#cnm-sobre-modal{display:none!important;position:fixed!important;inset:0!important;z-index:99999!important;background:rgba(2,6,23,.88)!important;align-items:center!important;justify-content:center!important;padding:16px!important}",
  "#cnm-sobre-modal.cnm-modal-visivel{display:flex!important}",
  "</style>"
].join("\n");

const js = [
  "<script id=\"cnm-fix-modal-pos-js\">",
  "(()=>{",
  "const m=document.getElementById(\"cnm-sobre-modal\");",
  "const foot=document.getElementById(\"cnm-rodape-box\");",
  "if(m){",
  "  m.classList.remove(\"aberto\",\"cnm-modal-visivel\");",
  "  if(m.parentNode!==document.body)document.body.appendChild(m);",
  "}",
  "if(foot&&foot.parentNode!==document.body)document.body.appendChild(foot);",
  "const abrir=(v)=>{if(!m)return;m.classList.toggle(\"cnm-modal-visivel\",Boolean(v));};",
  "const fecharBtn=document.getElementById(\"cnm-fechar-sobre\");",
  "const okBtn=document.getElementById(\"cnm-ok-sobre\");",
  "if(fecharBtn)fecharBtn.addEventListener(\"click\",()=>abrir(false));",
  "if(okBtn)okBtn.addEventListener(\"click\",()=>abrir(false));",
  "if(m)m.addEventListener(\"click\",e=>{if(e.target===m)abrir(false);});",
  "document.addEventListener(\"click\",e=>{",
  "  const item=e.target.closest(\"nav a,nav button,aside a,aside button,[class*=menu] a,[class*=menu] button,[class*=drawer] a,[class*=drawer] button\");",
  "  if(item&&/^sobre$/i.test((item.innerText||\"\").trim())){",
  "    e.preventDefault();e.stopPropagation();abrir(true);",
  "  }",
  "},true);",
  "})();",
  "</script>"
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", css + "\n" + js + "\n</body>") : h + "\n" + css + "\n" + js;
fs.writeFileSync(f, h, "utf8");
console.log("Modal corrigido: nao fica mais travado no meio da tela!");
