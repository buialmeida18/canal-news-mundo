const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="tv-cnm-style">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(tv-cnm-box|tv-cnm-js)">[\s\S]*?<\/\1>/g, "");

const htmlAdd = [
  '<style id="tv-cnm-style">',
  '#tv-cnm-box{display:block;margin:14px auto 18px;padding:14px;border-radius:14px;background:#0b1324;border:1px solid #2563eb;color:#f8fafc}',
  '.tv-cnm-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:13px;font-weight:700}',
  '.tv-cnm-badge{background:#7f1d1d;color:#fecaca;padding:4px 10px;border-radius:999px;font-size:11px}',
  '.tv-cnm-edit{display:none}',
  '.tv-cnm-edit.visivel{display:block}',
  '.tv-cnm-doms{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}',
  '.tv-cnm-dom{padding:7px 11px;border-radius:8px;border:1px solid #334155;background:#111c33;color:#93c5fd;font-size:12px;font-weight:700;text-decoration:none}',
  '.tv-cnm-in{width:100%;box-sizing:border-box;padding:11px;border-radius:10px;border:1px solid #334155;background:#050a14;color:#fff;margin-bottom:10px}',
  '.tv-cnm-btns{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}',
  '.tv-cnm-b1{padding:10px 14px;border-radius:10px;border:0;background:#2563eb;color:#fff;font-weight:700}',
  '.tv-cnm-b2{padding:10px 12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0}',
  '.tv-cnm-scr{position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1e293b}',
  '.tv-cnm-scr iframe,.tv-cnm-scr video{position:absolute;inset:0;width:100%;height:100%;border:0}',
  '.tv-cnm-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:14px;text-align:center;color:#94a3b8;font-size:13px}',
  '</style>',
  '<section id="tv-cnm-box">',
  '<div class="tv-cnm-top"><span class="tv-cnm-badge">ESPORTES • AO VIVO</span><span>Canal News Mundo</span></div>',
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
  '<script id="tv-cnm-js">',
  '(()=>{const K="cnm_tv_live_url";let linkAtual=localStorage.getItem(K)||"";let ultimoRender="";const ehAdmin=()=>{const txt=document.body.innerText||"";return Boolean(document.querySelector("[data-admin],.admin-panel,#painel-admin,.modo-admin"))||/\\bexcluir\\b|novo post|sair do admin|painel admin/i.test(txt);};const conv=u=>{u=(u||"").trim();const y=u.match(/(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/);if(y)return"https://www.youtube.com/embed/"+y[1]+"?rel=0";const t=u.match(/tiktok\\.com\\/@[^/]+\\/video\\/(\\d+)/);if(t)return"https://www.tiktok.com/embed/v2/"+t[1];return u;};const salvar=(u)=>{linkAtual=(u||"").trim();if(linkAtual)localStorage.setItem(K,linkAtual);else localStorage.removeItem(K);ultimoRender="";fetch("/api/esportes-live",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:linkAtual,ativo:Boolean(linkAtual)})}).catch(()=>{});pintar();};const run=()=>{const box=document.getElementById("tv-cnm-box");if(!box)return;const edit=box.querySelector("#tv-cnm-edit"),inp=box.querySelector("#tv-cnm-url"),go=box.querySelector("#tv-cnm-go"),clr=box.querySelector("#tv-cnm-clr"),scr=box.querySelector("#tv-cnm-scr");const main=document.querySelector("main")||document.body;if(box.parentNode!==main)main.appendChild(box);const pintar=()=>{const adm=ehAdmin();edit.classList.toggle("visivel",adm);if(adm&&document.activeElement!==inp&&!inp.value)inp.value=linkAtual;const u=(linkAtual||"").trim();const chave=u+"|"+adm;if(chave===ultimoRender)return;ultimoRender=chave;if(!u){scr.innerHTML=\'<div class="tv-cnm-msg">Sem transmissao no momento.</div>\';return;}const f=conv(u);const tag=/\\.(mp4|webm|ogg|m3u8)(\\?.*)?$/i.test(f)?"video":"iframe";const el=document.createElement(tag);el.src=f;if(tag==="video"){el.controls=true;el.playsInline=true;}else{el.allow="autoplay; fullscreen; picture-in-picture";el.allowFullscreen=true;}scr.innerHTML="";scr.appendChild(el);};go.onclick=()=>salvar(inp.value);clr.onclick=()=>salvar("");fetch("/api/esportes-live").then(r=>r.ok?r.json():null).then(d=>{if(d&&typeof d.url==="string"){linkAtual=d.url.trim();if(linkAtual)localStorage.setItem(K,linkAtual);ultimoRender="";}pintar();}).catch(()=>pintar());pintar();setInterval(pintar,1500);};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", htmlAdd + "\n</body>") : h + "\n" + htmlAdd;
fs.writeFileSync(f, h, "utf8");
console.log("Player corrigido e botoes de Live prontos!");
