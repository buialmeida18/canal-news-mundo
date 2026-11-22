const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<script id="cnm-sobre-lista-js">[\s\S]*?<\/script>/g, "");

const js = [
  "<script id=\"cnm-sobre-lista-js\">",
  "(()=>{",
  "const colocarNaLista=()=>{",
  "  const abrir=()=>{const m=document.getElementById(\"cnm-sobre-modal\");if(m)m.classList.add(\"aberto\");};",
  "  document.querySelectorAll(\"nav,aside,[class*=menu],[class*=drawer],[class*=sidebar]\").forEach(menu=>{",
  "    if(menu.querySelector(\".cnm-sobre-item-secao\"))return;",
  "    const itens=Array.from(menu.querySelectorAll(\"a,button\"));",
  "    const alvo=itens.find(el=>/\\b(geral|esportes)\\b/i.test((el.innerText||\"\").trim()));",
  "    if(!alvo||!alvo.parentNode)return;",
  "    const btn=document.createElement(alvo.tagName===\"A\"?\"a\":\"button\");",
  "    if(btn.tagName===\"BUTTON\")btn.type=\"button\";",
  "    else btn.href=\"#sobre\";",
  "    btn.className=alvo.className+\" cnm-sobre-item-secao\";",
  "    btn.textContent=\"Sobre\";",
  "    btn.onclick=(e)=>{e.preventDefault();e.stopPropagation();abrir();};",
  "    alvo.parentNode.insertBefore(btn,alvo.nextSibling);",
  "  });",
  "};",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",colocarNaLista);else colocarNaLista();",
  "setInterval(colocarNaLista,1000);",
  "})();",
  "</script>"
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", js + "\n</body>") : h + "\n" + js;
fs.writeFileSync(f, h, "utf8");
console.log("Botao Sobre posicionado junto com Esportes e Geral no menu!");
