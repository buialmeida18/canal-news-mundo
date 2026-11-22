const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-tirar-todas-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-tirar-todas-js">[\s\S]*?<\/script>/g, "");

const add = [
  '<style id="cnm-tirar-todas-style">',
  'select.cnm-escondido-todas{display:none!important}',
  '</style>',
  '<script id="cnm-tirar-todas-js">',
  '(()=>{const hide=()=>{document.querySelectorAll("select").forEach(sel=>{const opts=Array.from(sel.options||[]);const temTodas=opts.some(o=>/^todas$/i.test((o.textContent||o.value||"").trim()));const temCat=opts.some(o=>/esportes|geral|mundo|tecnologia/i.test((o.textContent||o.value||"").trim()));if(temTodas&&temCat){sel.classList.add("cnm-escondido-todas");}});};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hide);else hide();setInterval(hide,1000);})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", add + "\n</body>") : h + "\n" + add;
fs.writeFileSync(f, h, "utf8");
console.log("Seletor 'Todas' removido da tela!");
