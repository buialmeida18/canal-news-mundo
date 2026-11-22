const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-quatro-redes-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-quatro-redes-js">[\s\S]*?<\/script>/g, "");

const css = [
  "<style id=\"cnm-quatro-redes-style\">",
  "#cnm-rodape-box .cnm-redes-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;margin-bottom:18px!important}",
  "@media (max-width:460px){#cnm-rodape-box .cnm-redes-grid{grid-template-columns:1fr!important}}",
  "#cnm-rodape-box .cnm-rede-item{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;padding:13px 14px!important;border-radius:14px!important;font-weight:900!important;font-size:14px!important;text-decoration:none!important;box-sizing:border-box!important}",
  "#cnm-rodape-box .cnm-rede-yt{background:linear-gradient(135deg,#dc2626 0%,#ef4444 100%)!important;color:#ffffff!important;border:2px solid #fca5a5!important;cursor:pointer!important}",
  "#cnm-rodape-box .cnm-rede-tt{background:linear-gradient(135deg,#090d16 0%,#171923 100%)!important;color:#ffffff!important;border:2px solid #22d3ee!important;box-shadow:0 0 0 1.5px rgba(244,63,94,.65)!important;cursor:pointer!important}",
  "#cnm-rodape-box .cnm-rede-ig{background:linear-gradient(135deg,#833ab4 0%,#fd1d1d 55%,#fcb045 100%)!important;color:#ffffff!important;border:2px solid #fbcfe8!important;cursor:default!important}",
  "#cnm-rodape-box .cnm-rede-tg{background:linear-gradient(135deg,#0284c7 0%,#38bdf8 100%)!important;color:#ffffff!important;border:2px solid #bae6fd!important;cursor:default!important}",
  "</style>"
].join("\n");

const js = [
  "<script id=\"cnm-quatro-redes-js\">",
  "(()=>{",
  "const montarRedes=()=>{",
  "  const grid=document.querySelector(\"#cnm-rodape-box .cnm-redes-grid\");",
  "  if(!grid)return;",
  "  grid.innerHTML=\"\";",
  "  const itens=[",
  "    {tipo:\"link\",cls:\"cnm-rede-yt\",txt:\"\\u25B6 YouTube\",href:\"https://www.youtube.com/@canalnewsmundo\"},",
  "    {tipo:\"link\",cls:\"cnm-rede-tt\",txt:\"\\u266B TikTok\",href:\"https://www.tiktok.com/@canalnewsmundo\"},",
  "    {tipo:\"bloco\",cls:\"cnm-rede-ig\",txt:\"\\u25CE Instagram\"},",
  "    {tipo:\"bloco\",cls:\"cnm-rede-tg\",txt:\"\\u2708 Telegram\"}",
  "  ];",
  "  itens.forEach(it=>{",
  "    if(it.tipo===\"link\"){",
  "      const a=document.createElement(\"a\");",
  "      a.className=\"cnm-rede-item \"+it.cls;",
  "      a.href=it.href;a.target=\"_blank\";a.rel=\"noopener noreferrer\";",
  "      a.textContent=it.txt;grid.appendChild(a);",
  "    }else{",
  "      const d=document.createElement(\"div\");",
  "      d.className=\"cnm-rede-item \"+it.cls;",
  "      d.textContent=it.txt;",
  "      d.addEventListener(\"click\",e=>{e.preventDefault();e.stopPropagation();});",
  "      grid.appendChild(d);",
  "    }",
  "  });",
  "};",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",montarRedes);else montarRedes();",
  "setTimeout(montarRedes,500);",
  "})();",
  "</script>"
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", css + "\n" + js + "\n</body>") : h + "\n" + css + "\n" + js;
fs.writeFileSync(f, h, "utf8");
console.log("4 bloquinhos de redes sociais configurados!");
