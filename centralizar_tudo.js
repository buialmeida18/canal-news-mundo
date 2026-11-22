const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-center-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-center-js">[\s\S]*?<\/script>/g, "");

const add = [
  '<style id="cnm-center-style">',
  '*,*::before,*::after{box-sizing:border-box}',
  'html,body{margin:0;padding:0;width:100%;max-width:100vw;overflow-x:hidden}',
  'main,#root,#app,.container,.main-content{width:100%;max-width:960px;margin-left:auto!important;margin-right:auto!important;padding-left:12px!important;padding-right:12px!important;float:none!important}',
  'main > section,main > article,main > div,main > footer,#tv-cnm-box,#cnm-rodape-box,.cnm-busca-wrap{width:100%!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important;float:none!important}',
  'img,video,iframe{max-width:100%;height:auto;display:block;margin-left:auto;margin-right:auto}',
  '@media (max-width:640px){main,#root,#app,.container,.main-content{max-width:100%;padding-left:10px!important;padding-right:10px!important}}',
  '</style>',
  '<script id="cnm-center-js">',
  '(()=>{const fix=()=>{document.querySelectorAll("main > *, #root > *, #app > *").forEach(el=>{if(el.tagName==="SCRIPT"||el.tagName==="STYLE")return;el.style.maxWidth="100%";el.style.marginLeft="auto";el.style.marginRight="auto";el.style.cssFloat="none";});};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fix);else fix();setInterval(fix,1200);})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", add + "\n</body>") : h + "\n" + add;
fs.writeFileSync(f, h, "utf8");
console.log("Centralizacao aplicada para celular e computador!");
