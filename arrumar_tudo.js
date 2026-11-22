const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="(tv-cnm-style|cnm-busca-style|cnm-tirar-todas-style|cnm-menu-pro-style|cnm-fix-layout-style)">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(tv-cnm-box|tv-cnm-js|cnm-busca-js|cnm-tirar-todas-js|cnm-menu-pro-js|cnm-fix-layout-js)">[\s\S]*?<\/\1>/g, "");

const bloco = [
  '<style id="cnm-fix-layout-style">',
  'footer,[class*=footer],[id*=footer],[class*=rodape],[id*=rodape],[class*=social],[class*=redes],[class*=tema],[class*=cor-tema],[class*=theme]{display:block;visibility:visible;opacity:1}',
  '#tv-cnm-box{display:none;margin:16px auto 20px;padding:15px;border-radius:18px;background:linear-gradient(180deg,#151b28 0%,#0b0f17 100%);border:1.5px solid #f59e0b;color:#f8fafc;box-shadow:0 12px 28px rgba(245,158,11,.14)}',
  '#tv-cnm-box.so-esportes{display:block}',
  '.tv-cnm-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;font-size:13px;font-weight:800}',
  '.tv-cnm-badge{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(90deg,#ea580c,#f59e0b);color:#090d16;padding:5px 11px;border-radius:999px;font-size:11px;font-weight:900}',
  '.tv-cnm-canal{color:#fbbf24;font-weight:800}',
  '.tv-cnm-edit{display:none;margin-bottom:10px}',
  '.tv-cnm-edit.visivel{display:block}',
  '.tv-cnm-doms{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px}',
  '.tv-cnm-dom{padding:7px 12px;border-radius:10px;border:1px solid #f59e0b66;background:#1e2433;color:#fde68a;font-size:12px;font-weight:700;text-decoration:none}',
  '.tv-cnm-in{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:12px;border:1px solid #475569;background:#070a10;color:#fff;margin-bottom:10px;font-size:13px}',
  '.tv-cnm-btns{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}',
  '.tv-cnm-b1{padding:10px 15px;border-radius:12px;border:0;background:linear-gradient(90deg,#ea580c,#f59e0b);color:#090d16;font-weight:800;font-size:13px}',
  '.tv-cnm-b2{padding:10px 13px;border-radius:12px;border:1px solid #475569;background:#1e293b;color:#f1f5f9;font-weight:700;font-size:13px}',
  '.tv-cnm-scr{position:relative;width:100%;padding-top:56.25%;border-radius:14px;overflow:hidden;background:#04060b;border:1px solid #f59e0b55}',
  '.tv-cnm-scr iframe,.tv-cnm-scr video{position:absolute;inset:0;width:100%;height:100%;border:0}',
  '.tv-cnm-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:14px;text-align:center;color:#cbd5e1;font-size:13px}',
  '.cnm-busca-wrap{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 8px}',
  '.cnm-busca-in{flex:1;min-width:0;padding:11px 14px;border-radius:12px;border:2px solid #f59e0b;background:#ffffff;color:#0f172a;font-size:14px;font-weight:600;outline:none}',
  '.cnm-lupa-btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 14px;border-radius:12px;border:0;background:linear-gradient(90deg,#ea580c,#f59e0b);color:#090d16;font-weight:800;font-size:14px}',
  '.cnm-g-btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 12px;border-radius:12px;border:1px solid #f59e0b;background:#ffffff;color:#0f172a;font-weight:800;font-size:13px;text-decoration:none}',
  'select.cnm-escondido-todas{display:none!important}',
  '.cnm-menu-destaque{background:linear-gradient(90deg,#1e293b 0%,#292011 100%)!important;border:1.5px solid #f59e0b!important;color:#fffbeb!important;font-weight:700!important;border-radius:12px!important}',
  '</style>',
  '<section id="tv-cnm-box">',
  '<div class="tv-cnm-top"><span class="tv-cnm-badge">ESPORTES • AO VIVO</span><span class="tv-cnm-canal">Canal News Mundo</span></div>',
  '<div id="tv-cnm-edit" class="tv-cnm-edit">',
  '<div class="tv-cnm-doms">',
  '<a class="tv-cnm-dom" href="https://studio.youtube.com/" target="_blank" rel="noopener noreferrer">YouTube Live</a>',
  '<a class="tv-cnm-dom" href="https://www.tiktok.com/live" target="_blank" rel="noopener noreferrer">TikTok Live</a>',
  '<a class="tv-cnm-dom" href="https://www.youtube.com/live" target="_blank" rel="noopener noreferrer">TV Ao Vivo</a>',
  '</div>',
  '<input id="tv-cnm-url" class="tv-cnm-in" type="text" placeholder="Cole link do YouTube, TikTok ou TV ao vivo..."/>',
  '<div class="tv-cnm-btns"><button id="tv-cnm-go" class="tv-cnm-b1" type="button">Carregar Jogo</button><button id="tv-cnm-clr" class="tv-cnm-b2" type="button">Limpar</button></div>',
  '</div>',
  '<div id="tv-cnm-scr" class="tv-cnm-scr"><div class="tv-cnm-msg">Sem transmissao no momento.</div></div>',
  '</section>',
  '<script id="cnm-fix-layout-js">',
  '(()=>{const K="cnm_tv_live_url";let linkAtual=localStorage.getItem(K)||"";let ultimoRender="";',
  'const ehEsportes=()=>{const p=(location.pathname||"").toLowerCase();const h=(location.hash||"").toLowerCase();if(p.includes("/esport")||h.includes("esport"))return true;const sels=Array.from(document.querySelectorAll("select"));const catSel=sels.find(s=>Array.from(s.options||[]).some(o=>/esportes/i.test(o.textContent||"")));if(catSel&&/esport/i.test(catSel.value||""))return true;const ativo=document.querySelector("[aria-current=page],[aria-pressed=true],.active,.ativo");if(ativo&&/\\besportes\\b/i.test(ativo.innerText||""))return true;return false;};',
  'const ehAdmin=()=>{const txt=document.body.innerText||"";return Boolean(document.querySelector("[data-admin],.admin-panel,#painel-admin,.modo-admin"))||/\\bexcluir\\b|novo post|sair do admin|painel admin/i.test(txt);};',
  'const conv=u=>{u=(u||"").trim();const y=u.match(/(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/);if(y)return"https://www.youtube.com/embed/"+y[1]+"?rel=0";const t=u.match(/tiktok\\.com\\/@[^/]+\\/video\\/(\\d+)/);if(t)return"https://www.tiktok.com/embed/v2/"+t[1];return u;};',
  'const salvar=(u)=>{linkAtual=(u||"").trim();if(linkAtual)localStorage.setItem(K,linkAtual);else localStorage.removeItem(K);ultimoRender="";fetch("/api/esportes-live",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:linkAtual,ativo:Boolean(linkAtual)})}).catch(()=>{});pintar();};',
  'const arrumarRodape=()=>{const foot=document.querySelector("footer,[class*=footer],[id*=footer],[class*=rodape],[id*=rodape]");if(foot&&foot.parentNode===document.body){document.body.appendChild(foot);}};',
  'const pintar=()=>{const box=document.getElementById("tv-cnm-box");if(!box)return;const emEsp=ehEsportes();const adm=ehAdmin();box.classList.toggle("so-esportes",emEsp);const edit=box.querySelector("#tv-cnm-edit"),inp=box.querySelector("#tv-cnm-url"),go=box.querySelector("#tv-cnm-go"),clr=box.querySelector("#tv-cnm-clr"),scr=box.querySelector("#tv-cnm-scr");if(edit)edit.classList.toggle("visivel",adm);if(inp&&adm&&document.activeElement!==inp&&!inp.value)inp.value=linkAtual;const u=(linkAtual||"").trim();const chave=u+"|"+adm+"|"+emEsp;if(chave!==ultimoRender){ultimoRender=chave;if(!u){scr.innerHTML=\'<div class="tv-cnm-msg">Sem transmissao no momento.</div>\';}else{const f=conv(u);const tag=/\\.(mp4|webm|ogg|m3u8)(\\?.*)?$/i.test(f)?"video":"iframe";const el=document.createElement(tag);el.src=f;if(tag==="video"){el.controls=true;el.playsInline=true;}else{el.allow="autoplay; fullscreen; picture-in-picture";el.allowFullscreen=true;}scr.innerHTML="";scr.appendChild(el);}}if(go)go.onclick=()=>salvar(inp.value);if(clr)clr.onclick=()=>salvar("");',
  'document.querySelectorAll("select").forEach(sel=>{const opts=Array.from(sel.options||[]);if(opts.some(o=>/^todas$/i.test((o.textContent||"").trim()))&&opts.some(o=>/esportes|geral|mundo/i.test((o.textContent||"").trim())))sel.classList.add("cnm-escondido-todas");});',
  'document.querySelectorAll("nav a,nav button,aside a,aside button,[class*=menu] a,[class*=menu] button").forEach(el=>{const t=(el.innerText||"").trim();if(/todas as not|mundo|esportes|tecnologia|geral/i.test(t))el.classList.add("cnm-menu-destaque");});',
  'arrumarRodape();};',
  'const initBusca=()=>{const inp=Array.from(document.querySelectorAll("input[type=search],input[placeholder*=Buscar i]")).find(el=>!el.id||!el.id.startsWith("tv-cnm"));if(!inp||inp.closest(".cnm-busca-wrap"))return;const wrap=document.createElement("div");wrap.className="cnm-busca-wrap";inp.parentNode.insertBefore(wrap,inp);wrap.appendChild(inp);inp.classList.add("cnm-busca-in");const lupa=document.createElement("button");lupa.type="button";lupa.className="cnm-lupa-btn";lupa.innerHTML="&#128269;";lupa.onclick=()=>{inp.dispatchEvent(new Event("input",{bubbles:true}));inp.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}));};wrap.appendChild(lupa);const g=document.createElement("a");g.className="cnm-g-btn";g.textContent="G";g.target="_blank";g.rel="noopener noreferrer";const syncG=()=>{const q=encodeURIComponent((inp.value||"").trim());g.href=q?"https://www.google.com/search?q="+q:"https://www.google.com";};inp.addEventListener("input",syncG);syncG();wrap.appendChild(g);};',
  'const run=()=>{initBusca();fetch("/api/esportes-live").then(r=>r.ok?r.json():null).then(d=>{if(d&&typeof d.url==="string"){linkAtual=d.url.trim();if(linkAtual)localStorage.setItem(K,linkAtual);ultimoRender="";}pintar();}).catch(()=>pintar());pintar();setInterval(pintar,1000);};',
  'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", bloco + "\n</body>") : h + "\n" + bloco;
fs.writeFileSync(f, h, "utf8");
console.log("Tudo arrumado: Esportes isolado, rodape e tema preservados!");
