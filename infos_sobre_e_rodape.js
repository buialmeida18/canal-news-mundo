const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="cnm-infos-pro-style">[\s\S]*?<\/style>/g, "")
     .replace(/<(div|script) id="(cnm-sobre-modal|cnm-infos-pro-js)">[\s\S]*?<\/\1>/g, "");

const css = [
  "<style id=\"cnm-infos-pro-style\">",
  "#cnm-sobre-modal{display:none;position:fixed;inset:0;z-index:9999;background:rgba(2,6,23,.86);align-items:center;justify-content:center;padding:16px;box-sizing:border-box}",
  "#cnm-sobre-modal.aberto{display:flex}",
  "#cnm-sobre-modal .cnm-modal-card{width:100%;max-width:560px;max-height:85vh;overflow-y:auto;background:#0f172a;border:2px solid var(--cnm-cor,#f59e0b);border-radius:18px;padding:18px;color:#f8fafc;box-shadow:0 24px 60px rgba(0,0,0,.7);box-sizing:border-box}",
  "#cnm-sobre-modal .cnm-modal-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.12)}",
  "#cnm-sobre-modal .cnm-modal-titulo{font-size:17px;font-weight:900;color:#fbbf24}",
  "#cnm-sobre-modal .cnm-modal-fechar{padding:6px 12px;border-radius:10px;border:1px solid #475569;background:#1e293b;color:#fff;font-weight:800;cursor:pointer}",
  "#cnm-sobre-modal .cnm-modal-sec{margin-bottom:12px}",
  "#cnm-sobre-modal .cnm-modal-sub{font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.4px;color:var(--cnm-cor,#fbbf24);margin-bottom:5px}",
  "#cnm-sobre-modal p,#cnm-sobre-modal li{font-size:13px;line-height:1.55;color:#e2e8f0;margin:0 0 6px}",
  "#cnm-sobre-modal ul{margin:4px 0 8px 18px;padding:0}",
  "#cnm-rodape-box .cnm-rodape-final{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);font-size:12px;line-height:1.55;color:#cbd5e1}",
  "#cnm-rodape-box .cnm-rodape-final strong{color:#f8fafc}",
  "#cnm-rodape-box .cnm-rodape-copy{margin-top:8px;padding-top:8px;border-top:1px dashed rgba(255,255,255,.12);font-size:11px;color:#94a3b8;text-align:center}",
  "</style>"
].join("\n");

const modal = [
  "<div id=\"cnm-sobre-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"cnm-modal-titulo\">",
  "<div class=\"cnm-modal-card\">",
  "<div class=\"cnm-modal-top\">",
  "<span id=\"cnm-modal-titulo\" class=\"cnm-modal-titulo\">Sobre o Canal News Mundo</span>",
  "<button id=\"cnm-fechar-sobre\" class=\"cnm-modal-fechar\" type=\"button\">Fechar</button>",
  "</div>",
  "<div class=\"cnm-modal-sec\">",
  "<div class=\"cnm-modal-sub\">Quem Somos</div>",
  "<p>O <strong>Canal News Mundo</strong> e um portal digital independente focado em informacao rapida, cobertura esportiva, atualidades do mundo, tecnologia e assuntos gerais, com navegacao leve para celular, tablet e computador.</p>",
  "</div>",
  "<div class=\"cnm-modal-sec\">",
  "<div class=\"cnm-modal-sub\">O Que Voce Encontra Aqui</div>",
  "<ul>",
  "<li><strong>Noticias e Atualidades:</strong> publicacoes organizadas por secoes (Todas as noticias, Mundo, Esportes, Tecnologia e Geral).</li>",
  "<li><strong>Esportes Ao Vivo:</strong> espaco dedicado na aba de Esportes para acompanhar transmissao carregada pela administracao.</li>",
  "<li><strong>Busca Rapida e Google:</strong> filtre conteudos do portal ou pesquise diretamente no Google com um clique.</li>",
  "<li><strong>Personalizacao:</strong> escolha o tom de cor do site no rodape com salvamento automatico no navegador.</li>",
  "</ul>",
  "</div>",
  "<div class=\"cnm-modal-sec\">",
  "<div class=\"cnm-modal-sub\">Canais Oficiais e Transparencia</div>",
  "<p>Acompanhe nossos videos e coberturas tambem no <strong>YouTube</strong> e no <strong>TikTok (@canalnewsmundo)</strong>. Transmissoes ou conteudos incorporados de plataformas externas seguem a disponibilidade e as regras de cada plataforma de origem.</p>",
  "</div>",
  "<button id=\"cnm-ok-sobre\" class=\"cnm-aba-btn ativa\" type=\"button\">Fechar Janela</button>",
  "</div>",
  "</div>"
].join("\n");

const js = [
  "<script id=\"cnm-infos-pro-js\">",
  "(()=>{",
  "const montarFinalRodape=()=>{",
  "  const foot=document.getElementById(\"cnm-rodape-box\");",
  "  if(!foot||foot.querySelector(\".cnm-rodape-final\"))return;",
  "  const fin=document.createElement(\"div\");",
  "  fin.className=\"cnm-rodape-final\";",
  "  fin.innerHTML=\"<strong>Canal News Mundo</strong> — Portal de noticias, esportes, tecnologia e atualidades. Conteudo informativo com acesso direto aos canais oficiais no YouTube e TikTok (@canalnewsmundo). As exibicoes ao vivo e links externos dependem da fonte original.<div class=\\\"cnm-rodape-copy\\\">Canal News Mundo • Todos os direitos reservados</div>\";",
  "  foot.appendChild(fin);",
  "};",
  "const abrirSobre=(v)=>{",
  "  const m=document.getElementById(\"cnm-sobre-modal\");",
  "  if(m)m.classList.toggle(\"aberto\",Boolean(v));",
  "};",
  "const ligarEventos=()=>{",
  "  montarFinalRodape();",
  "  const f=document.getElementById(\"cnm-fechar-sobre\");",
  "  const ok=document.getElementById(\"cnm-ok-sobre\");",
  "  const m=document.getElementById(\"cnm-sobre-modal\");",
  "  if(f)f.onclick=()=>abrirSobre(false);",
  "  if(ok)ok.onclick=()=>abrirSobre(false);",
  "  if(m)m.onclick=(e)=>{if(e.target===m)abrirSobre(false);};",
  "  document.querySelectorAll(\"nav a,nav button,aside a,aside button,[class*=menu] a,[class*=menu] button,[class*=drawer] a,[class*=drawer] button\").forEach(el=>{",
  "    if(/^sobre$/i.test((el.innerText||\"\").trim())){",
  "      el.onclick=(e)=>{e.preventDefault();e.stopPropagation();abrirSobre(true);};",
  "    }",
  "  });",
  "};",
  "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",ligarEventos);else ligarEventos();",
  "setInterval(ligarEventos,1000);",
  "})();",
  "</script>"
].join("\n");

const injetar = css + "\n" + modal + "\n" + js;
h = h.includes("</body>") ? h.replace("</body>", injetar + "\n</body>") : h + "\n" + injetar;
fs.writeFileSync(f, h, "utf8");
console.log("Informacoes completas adicionadas no Sobre e no final do rodape!");
