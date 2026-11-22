const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="(cnm-infos-pro-style|cnm-fix-modal-pos-style|cnm-sobre-pagina-style)">[\s\S]*?<\/style>/g, "")
     .replace(/<(div|section|script) id="(cnm-sobre-modal|cnm-pagina-sobre|cnm-infos-pro-js|cnm-fix-modal-pos-js|cnm-sobre-pagina-js)">[\s\S]*?<\/\1>/g, "");

const css = [
  "<style id=\"cnm-sobre-pagina-style\">",
  "#cnm-pagina-sobre{display:none;width:100%;max-width:960px;margin:16px auto 24px;padding:20px;border-radius:18px;background:linear-gradient(180deg,#121826 0%,#090d16 100%);border:2px solid var(--cnm-cor,#f59e0b);color:#f8fafc;box-sizing:border-box}",
  "#cnm-pagina-sobre.ativa{display:block}",
  "#cnm-pagina-sobre .cnm-pag-topo{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.14)}",
  "#cnm-pagina-sobre .cnm-pag-titulo{font-size:20px;font-weight:900;color:#fbbf24}",
  "#cnm-pagina-sobre .cnm-pag-voltar{padding:8px 14px;border-radius:10px;border:0;background:var(--cnm-cor,#f59e0b);color:#090d16;font-weight:900;font-size:13px;cursor:pointer}",
  "#cnm-pagina-sobre .cnm-pag-bloco{margin-bottom:16px}",
  "#cnm-pagina-sobre .cnm-pag-sub{font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.5px;color:var(--cnm-cor,#fbbf24);margin-bottom:6px}",
  "#cnm-pagina-sobre p,#cnm-pagina-sobre li{font-size:14px;line-height:1.6;color:#e2e8f0;margin:0 0 8px}",
  "#cnm-pagina-sobre ul{margin:6px 0 10px 20px;padding:0}",
  "body.cnm-modo-pagina-sobre main > *:not(#cnm-pagina-sobre):not(#cnm-rodape-box),body.cnm-modo-pagina-sobre #root > *:not(#cnm-pagina-sobre):not(#cnm-rodape-box),body.cnm-modo-pagina-sobre article,body.cnm-modo-pagina-sobre .noticias,.feed,.lista-noticias{display:none!important}",
  "#cnm-rodape-box .cnm-rodape-final{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);font-size:12px;line-height:1.55;color:#cbd5e1}",
  "#cnm-rodape-box .cnm-rodape-final strong{color:#f8fafc}",
  "#cnm-rodape-box .cnm-rodape-copy{margin-top:8px;padding-top:8px;border-top:1px dashed rgba(255,255,255,.12);font-size:11px;color:#94a3b8;text-align:center}",
  "</style>"
].join("\n");

const sec = [
  "<section id=\"cnm-pagina-sobre\" aria-label=\"Sobre o Canal News Mundo\">",
  "<div class=\"cnm-pag-topo\">",
  "<span class=\"cnm-pag-titulo\">Sobre o Canal News Mundo</span>",
  "<button id=\"cnm-voltar-noticias\" class=\"cnm-pag-voltar\" type=\"button\">Voltar para notícias</button>",
  "</div>",
  "<div class=\"cnm-pag-bloco\">",
  "<div class=\"cnm-pag-sub\">Quem Somos</div>",
  "<p>O <strong>Canal News Mundo</strong> é um portal digital independente focado em informação rápida, cobertura esportiva, atualidades do mundo, tecnologia e assuntos gerais, com navegação leve para celular, tablet e computador.</p>",
  "</div>",
  "<div class=\"cnm-pag-bloco\">",
  "<div class=\"cnm-pag-sub\">O Que Você Encontra Aqui</div>",
  "<ul>",
  "<li><strong>Notícias e Atualidades:</strong> publicações organizadas por seções (Todas as notícias, Mundo, Esportes, Tecnologia e Geral).</li>",
  "<li><strong>Esportes Ao Vivo:</strong> espaço dedicado na aba de Esportes para acompanhar a transmissão carregada pela administração.</li>",
  "<li><strong>Busca Rápida e Google:</strong> filtre conteúdos do portal ou pesquise diretamente no Google com um clique.</li>",
  "<li><strong>Identidade Visual:</strong> o tom de cor do site é definido pela administração para manter uma aparência limpa e profissional aos visitantes.</li>",
  "</ul>",
  "</div>",
  "<div class=\"cnm-pag-bloco\">",
  "<div class=\"cnm-pag-sub\">Canais Oficiais e Transparência</div>",
  "<p>Acompanhe nossos vídeos e coberturas também no <strong>YouTube</strong> e no <strong>TikTok (@canalnewsmundo)</strong>. As transmissões ao vivo e links externos dependem da disponibilidade e das regras de cada plataforma de origem.</p>",
  "</div>",
  "<button id=\"cnm-voltar-noticias-baixo\" class=\"cnm-pag-voltar\" type=\"button\">Voltar para notícias</button>",
  "</section>"
].join("\n");

const js = [
  "<script id=\"cnm-sobre-pagina-js\">",
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
  "const abrirPaginaSobre=(abrir)=>{",
  "  const secEl=document.getElementById(\"cnm-pagina-sobre\");",
  "  if(secEl&&secEl.parentNode!==document.body)document.body.appendChild(secEl);",
  "  document.body.classList.toggle(\"cnm-modo-pagina-sobre\",Boolean(abrir));",
  "  if(secEl)secEl.classList.toggle(\"ativa\",Boolean(abrir));",
  "  window.scrollTo({top:0,behavior:\"smooth\"});",
  "};",
  "const init=()=>{",
  "  montarFinalRodape();",
  "  const v1=document.getElementById(\"cnm-voltar-noticias\");",
  "  const v2=document.getElementById(\"cnm-voltar-noticias-baixo\");",
  "  if(v1)v1.onclick=()=>abrirPaginaSobre(false);",
  "  if(v2)v2.onclick=()=>abrirPaginaSobre(false);",
  "  document.addEventListener(\"click\",e=>{",
  "    const item=e.target.closest(\"nav a,nav button,aside a,aside button,[class*=menu] a,[class*=menu] button,[class*=drawer] a,[class*=drawer] button\");",
  "    if(!item)return;",
  "    const rotulo=(item.innerText||\"\").trim();",
  "    if(/^sobre$/i.test(rotulo)){",
  "      e.preventDefault();e.stopPropagation();abrirPaginaSobre(true);",
  "    }else if(/todas as not|mundo|esportes|tecnologia|geral|in[ií]cio/i.test(rotulo)){",
  "      abrirPaginaSobre(false);",
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
console.log("Pagina Sobre configurada como secao propria e final do rodape atualizado!");
