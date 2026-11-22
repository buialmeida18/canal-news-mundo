const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="(cnm-infos-pro-style|cnm-fix-modal-pos-style|cnm-sobre-pagina-style|cnm-secao-padrao-style)">[\s\S]*?<\/style>/g, "")
     .replace(/<(div|section|script) id="(cnm-sobre-modal|cnm-pagina-sobre|cnm-secao-sobre|cnm-infos-pro-js|cnm-fix-modal-pos-js|cnm-sobre-pagina-js|cnm-secao-padrao-js)">[\s\S]*?<\/\1>/g, "");

const css = [
  "<style id=\"cnm-secao-padrao-style\">",
  "#cnm-secao-sobre{display:none;width:100%;max-width:960px;margin:14px auto 20px;padding:16px;border-radius:16px;background:#141b29;border:1.5px solid rgba(255,255,255,.12);color:#f8fafc;box-sizing:border-box}",
  "#cnm-secao-sobre.ativa{display:block}",
  "#cnm-secao-sobre .cnm-sec-cab{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.1)}",
  "#cnm-secao-sobre .cnm-sec-tit{font-size:17px;font-weight:800;color:#ffffff}",
  "#cnm-secao-sobre .cnm-sec-voltar{padding:7px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:#1e293b;color:#f8fafc;font-size:12px;font-weight:700;cursor:pointer}",
  "#cnm-secao-sobre .cnm-sec-texto{font-size:14px;line-height:1.6;color:#e2e8f0;margin-bottom:12px}",
  "#cnm-secao-sobre .cnm-sec-rodape-box{padding:12px;border-radius:12px;background:#0c111b;border:1px solid rgba(255,255,255,.08);font-size:13px;line-height:1.55;color:#cbd5e1}",
  "body.cnm-ver-sobre main > *:not(#cnm-secao-sobre):not(#cnm-rodape-box),body.cnm-ver-sobre #root > *:not(#cnm-secao-sobre):not(#cnm-rodape-box),body.cnm-ver-sobre article,body.cnm-ver-sobre .noticias,.feed,.lista-noticias{display:none!important}",
  "#cnm-rodape-box .cnm-rodape-final{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);font-size:12px;line-height:1.55;color:#cbd5e1}",
  "#cnm-rodape-box .cnm-rodape-final strong{color:#f8fafc}",
  "#cnm-rodape-box .cnm-rodape-copy{margin-top:8px;padding-top:8px;border-top:1px dashed rgba(255,255,255,.12);font-size:11px;color:#94a3b8;text-align:center}",
  "</style>"
].join("\n");

const sec = [
  "<section id=\"cnm-secao-sobre\">",
  "<div class=\"cnm-sec-cab\">",
  "<span class=\"cnm-sec-tit\">Sobre</span>",
  "<button id=\"cnm-btn-voltar-sobre\" class=\"cnm-sec-voltar\" type=\"button\">Voltar</button>",
  "</div>",
  "<div class=\"cnm-sec-texto\">",
  "<strong>Canal News Mundo</strong> — Portal de notícias, esportes, tecnologia e atualidades. Conteúdo informativo com navegação leve para celular, tablet e computador e acesso direto aos canais oficiais no YouTube e TikTok (@canalnewsmundo).",
  "</div>",
  "<div class=\"cnm-sec-rodape-box\">",
  "As transmissões ao vivo na aba de Esportes e os links externos dependem da disponibilidade e das regras da plataforma de origem. O tom visual do site é definido pela administração para manter uma aparência limpa e profissional para todos os visitantes.<br><br><strong>Canal News Mundo • Todos os direitos reservados</strong>",
  "</div>",
  "</section>"
].join("\n");

const js = [
  "<script id=\"cnm-secao-padrao-js\">",
  "(()=>{",
  "const montarFinalRodape=()=>{",
  "  const foot=document.getElementById(\"cnm-rodape-box\");",
  "  if(!foot)return;",
  "  if(foot.parentNode!==document.body)document.body.appendChild(foot);",
  "  if(!foot.querySelector(\".cnm-rodape-final\")){",
  "    const fin=document.createElement(\"div\");",
  "    fin.className=\"cnm-rodape-final\";",
  "    fin.innerHTML=\"<strong>Canal News Mundo</strong> — Portal de notícias, esportes, tecnologia e atualidades. Conteúdo informativo com acesso direto aos canais oficiais no YouTube e TikTok (@canalnewsmundo). As transmissões ao vivo e links externos dependem da fonte original.<div class=\\\"cnm-rodape-copy\\\">Canal News Mundo • Todos os direitos reservados</div>\";",
  "    foot.appendChild(fin);",
  "  }",
  "};",
  "const abrirSobre=(abrir)=>{",
  "  const s=document.getElementById(\"cnm-secao-sobre\");",
  "  if(s&&s.parentNode!==document.body)document.body.appendChild(s);",
  "  document.body.classList.toggle(\"cnm-ver-sobre\",Boolean(abrir));",
  "  if(s)s.classList.toggle(\"ativa\",Boolean(abrir));",
  "  if(abrir)window.scrollTo({top:0,behavior:\"instant\"});",
  "};",
  "const init=()=>{",
  "  montarFinalRodape();",
  "  const v=document.getElementById(\"cnm-btn-voltar-sobre\");",
  "  if(v)v.onclick=()=>abrirSobre(false);",
  "  document.addEventListener(\"click\",e=>{",
  "    const item=e.target.closest(\"nav a,nav button,aside a,aside button,[class*=menu] a,[class*=menu] button,[class*=drawer] a,[class*=drawer] button\");",
  "    if(!item)return;",
  "    const t=(item.innerText||\"\").trim();",
  "    if(/^sobre$/i.test(t)){",
  "      e.preventDefault();e.stopPropagation();abrirSobre(true);",
  "    }else if(/todas as not|mundo|esportes|tecnologia|geral|in[ií]cio/i.test(t)){",
  "      abrirSobre(false);",
  "    }",
  "  },true);",
  "};",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",init);else init();",
  "setInterval(montarFinalRodape,1200);",
  "})();",
  "</script>"
].join("\n");

const injetar = css + "\n" + sec + "\n" + js;
h = h.includes("</body>") ? h.replace("</body>", injetar + "\n</body>") : h + "\n" + injetar;
fs.writeFileSync(f, h, "utf8");
console.log("Secao Sobre ajustada no estilo padrao das paginas do site!");
