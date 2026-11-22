const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-menu-pro-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-menu-pro-js">[\s\S]*?<\/script>/g, "");

const add = [
  '<style id="cnm-menu-pro-style">',
  '.cnm-menu-destaque{background:linear-gradient(90deg,#1e293b 0%,#292011 100%)!important;border:1.5px solid #f59e0b!important;color:#fffbeb!important;font-weight:700!important;border-radius:12px!important;box-shadow:0 4px 14px rgba(245,158,11,.16)!important;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease!important}',
  '.cnm-menu-destaque:hover,.cnm-menu-destaque:active,.cnm-menu-ativo{background:linear-gradient(90deg,#d97706 0%,#f59e0b 100%)!important;border-color:#fde68a!important;color:#090d16!important;font-weight:800!important;box-shadow:0 6px 18px rgba(245,158,11,.35)!important}',
  '.cnm-canal-destaque{background:linear-gradient(135deg,#172033 0%,#1f1a10 100%)!important;border:1px solid #f59e0b88!important;border-radius:12px!important}',
  '</style>',
  '<script id="cnm-menu-pro-js">',
  '(()=>{const pintarMenu=()=>{document.querySelectorAll("nav a,nav button,aside a,aside button,[class*=menu] a,[class*=menu] button,[class*=drawer] a,[class*=drawer] button,[class*=sidebar] a,[class*=sidebar] button").forEach(el=>{const t=(el.innerText||"").trim();if(!t)return;if(/todas as not|mundo|esportes|tecnologia|geral/i.test(t)){el.classList.add("cnm-menu-destaque");if(el.getAttribute("aria-pressed")==="true"||el.classList.contains("active"))el.classList.add("cnm-menu-ativo");}else if(/tiktok|youtube|abrir/i.test(t)){el.classList.add("cnm-canal-destaque");}});};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",pintarMenu);else pintarMenu();setInterval(pintarMenu,800);})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", add + "\n</body>") : h + "\n" + add;
fs.writeFileSync(f, h, "utf8");
console.log("Menu aplicado com cor profissional ambar + ardosia!");
