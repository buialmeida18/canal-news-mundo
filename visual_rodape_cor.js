const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-rodape-visual-style">[\s\S]*?<\/style>/g, "")
     .replace(/<script id="cnm-rodape-visual-js">[\s\S]*?<\/script>/g, "");

const estilo = [
  "<style id=\"cnm-rodape-visual-style\">",
  "#cnm-rodape-box{width:100%;max-width:960px;margin:24px auto 28px;padding:18px;border-radius:18px;background:#0d1320;border:2px solid var(--cnm-cor,#f59e0b);color:#f8fafc;box-sizing:border-box}",
  "#cnm-rodape-box .cnm-rod-titulo{font-size:12px;font-weight:900;letter-spacing:.6px;color:#fbbf24;margin-bottom:12px;text-transform:uppercase}",
  "#cnm-rodape-box .cnm-redes-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:18px}",
  "@media (max-width:520px){#cnm-rodape-box .cnm-redes-grid{grid-template-columns:1fr}}",
  "#cnm-rodape-box a.cnm-rede-yt{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;padding:14px 16px!important;border-radius:14px!important;background:linear-gradient(135deg,#dc2626 0%,#ef4444 100%)!important;color:#ffffff!important;border:2px solid #fca5a5!important;font-weight:900!important;font-size:14px!important;text-decoration:none!important;box-shadow:0 6px 18px rgba(220,38,38,.35)!important}",
  "#cnm-rodape-box a.cnm-rede-tt{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;padding:14px 16px!important;border-radius:14px!important;background:linear-gradient(135deg,#090d16 0%,#171923 100%)!important;color:#ffffff!important;border:2px solid #22d3ee!important;font-weight:900!important;font-size:14px!important;text-decoration:none!important;box-shadow:0 0 0 2px rgba(244,63,94,.65),0 6px 18px rgba(34,211,238,.22)!important}",
  "#cnm-rodape-box .cnm-cores-row{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}",
  "@media (min-width:640px){#cnm-rodape-box .cnm-cores-row{grid-template-columns:repeat(4,minmax(0,1fr))!important}}",
  "#cnm-rodape-box button.cnm-cor-btn{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:10px!important;padding:10px 12px!important;border-radius:12px!important;background:#131b2e!important;color:#ffffff!important;border:2px solid #334155!important;font-weight:800!important;font-size:13px!important;cursor:pointer!important}",
  "#cnm-rodape-box button.cnm-cor-btn.ativa{background:#1e293b!important;border-color:#ffffff!important;transform:translateY(-1px)!important}",
  "#cnm-rodape-box .cnm-cor-bolinha{width:18px;height:18px;border-radius:999px;flex:0 0 18px;border:2px solid rgba(255,255,255,.75)}",
  "</style>"
].join("\n");

const js = [
  "<script id=\"cnm-rodape-visual-js\">",
  "(()=>{",
  "const K_COR=\"cnm_tom_cor\";",
  "const CORES=[{nome:\"Ambar\",cor:\"#f59e0b\",escuro:\"#b45309\"},{nome:\"Azul\",cor:\"#3b82f6\",escuro:\"#1d4ed8\"},{nome:\"Esmeralda\",cor:\"#10b981\",escuro:\"#047857\"},{nome:\"Rubi\",cor:\"#ef4444\",escuro:\"#b91c1c\"}];",
  "const aplicarCor=(nome)=>{",
  "  const esc=CORES.find(c=>c.nome===nome)||CORES[0];",
  "  document.documentElement.style.setProperty(\"--cnm-cor\",esc.cor);",
  "  document.documentElement.style.setProperty(\"--cnm-cor-escura\",esc.escuro);",
  "  const box=document.getElementById(\"cnm-rodape-box\");",
  "  if(box)box.style.borderColor=esc.cor;",
  "  document.querySelectorAll(\"header,[class*=header],[class*=topbar]\").forEach(el=>{el.style.background=\"linear-gradient(90deg,\"+esc.escuro+\" 0%,\"+esc.cor+\" 100%)\";});",
  "  document.querySelectorAll(\"#cnm-rodape-box .cnm-cor-btn\").forEach(b=>{const ativa=b.dataset.nome===esc.nome;b.classList.toggle(\"ativa\",ativa);b.style.boxShadow=ativa?\"0 0 0 2px \"+esc.cor:\"none\";});",
  "  localStorage.setItem(K_COR,esc.nome);",
  "};",
  "const montar=()=>{",
  "  const lista=document.getElementById(\"cnm-cores-lista\");",
  "  if(!lista)return;",
  "  lista.innerHTML=\"\";",
  "  CORES.forEach(c=>{",
  "    const b=document.createElement(\"button\");",
  "    b.type=\"button\";",
  "    b.className=\"cnm-cor-btn\";",
  "    b.dataset.nome=c.nome;",
  "    const dot=document.createElement(\"span\");",
  "    dot.className=\"cnm-cor-bolinha\";",
  "    dot.style.background=c.cor;",
  "    const txt=document.createElement(\"span\");",
  "    txt.textContent=c.nome;",
  "    b.appendChild(dot);b.appendChild(txt);",
  "    b.onclick=()=>aplicarCor(c.nome);",
  "    lista.appendChild(b);",
  "  });",
  "  aplicarCor(localStorage.getItem(K_COR)||\"Ambar\");",
  "};",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",montar);else montar();",
  "setTimeout(montar,400);",
  "})();",
  "</script>"
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", estilo + "\n" + js + "\n</body>") : h + "\n" + estilo + "\n" + js;
fs.writeFileSync(f, h, "utf8");
console.log("Visual dos botoes sociais e seletor de cor atualizado!");
