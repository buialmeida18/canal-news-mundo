const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="tv-cnm-style">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(tv-cnm-box|tv-cnm-js)">[\s\S]*?<\/\1>/g, "");

const htmlAdd = [
  '<style id="tv-cnm-style">',
  '#tv-cnm-box{display:block;margin:16px auto 20px;padding:15px;border-radius:18px;background:linear-gradient(180deg,#151b28 0%,#0b0f17 100%);border:1.5px solid #f59e0b;color:#f8fafc;box-shadow:0 12px 28px rgba(245,158,11,.14)}',
  '.tv-cnm-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;font-size:13px;font-weight:800}',
  '.tv-cnm-badge{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(90deg,#ea580c,#f59e0b);color:#090d16;padding:5px 11px;border-radius:999px;font-size:11px;font-weight:900;letter-spacing:.4px}',
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
  '<script id="tv-cnm-js">',
  '(()=>{const K="cnm_tv_live_url";let linkAtual=localStorage.getItem(K)||"";let ultimoRender="";const ehAdmin=()=>{const txt=document.body.innerText||"";return Boolean(document.querySelector("[data-admin],.admin-panel,#painel-admin,.modo-admin"))||/\\bexcluir\\b|novo post|sair do admin|painel admin/i.test(txt);};const conv=u=>{u=(u||"").trim();const y=u.match(/(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/);if(y)return"https://www.youtube.com/embed/"+y[1]+"?rel=0";const t=u.match(/tiktok\\.com\\/@[^/]+\\/video\\/(\\d+)/);if(t)return"https://www.tiktok.com/embed/v2/"+t[1];return u;};const salvar=(u)=>{linkAtual=(u||"").trim();if(linkAtual)localStorage.setItem(K,linkAtual);else localStorage.removeItem(K);ultimoRender="";fetch("/api/esportes-live",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:linkAtual,ativo:Boolean(linkAtual)})}).catch(()=>{});pintar();};const run=()=>{const box=document.getElementById("tv-cnm-box");if(!box)return;const edit=box.querySelector("#tv-cnm-edit"),inp=box.querySelector("#tv-cnm-url"),go=box.querySelector("#tv-cnm-go"),clr=box.querySelector("#tv-cnm-clr"),scr=box.querySelector("#tv-cnm-scr");const main=document.querySelector("main")||document.body;if(box.parentNode!==main)main.appendChild(box);const pintar=()=>{const adm=ehAdmin();edit.classList.toggle("visivel",adm);if(adm&&document.activeElement!==inp&&!inp.value)inp.value=linkAtual;const u=(linkAtual||"").trim();const chave=u+"|"+adm;if(chave===ultimoRender)return;ultimoRender=chave;if(!u){scr.innerHTML=\'<div class="tv-cnm-msg">Sem transmissao no momento.</div>\';return;}const f=conv(u);const tag=/\\.(mp4|webm|ogg|m3u8)(\\?.*)?$/i.test(f)?"video":"iframe";const el=document.createElement(tag);el.src=f;if(tag==="video"){el.controls=true;el.playsInline=true;}else{el.allow="autoplay; fullscreen; picture-in-picture";el.allowFullscreen=true;}scr.innerHTML="";scr.appendChild(el);};go.onclick=()=>salvar(inp.value);clr.onclick=()=>salvar("");fetch("/api/esportes-live").then(r=>r.ok?r.json():null).then(d=>{if(d&&typeof d.url==="string"){linkAtual=d.url.trim();if(linkAtual)localStorage.setItem(K,linkAtual);ultimoRender="";}pintar();}).catch(()=>pintar());pintar();setInterval(pintar,1500);};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", htmlAdd + "\n</body>") : h + "\n" + htmlAdd;
fs.writeFileSync(f, h, "utf8");
console.log("Visual atualizado com destaque laranja/ambar!");
