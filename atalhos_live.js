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
  '.tv-cnm-doms{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}',
  '.tv-cnm-dom{padding:6px 10px;border-radius:8px;border:1px solid #334155;background:#111c33;color:#93c5fd;font-size:12px;font-weight:700;text-decoration:none}',
  '.tv-cnm-in{width:100%;box-sizing:border-box;padding:11px;border-radius:10px;border:1px solid #334155;background:#050a14;color:#fff;margin-bottom:10px}',
  '.tv-cnm-btns{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}',
  '.tv-cnm-b1{padding:10px 14px;border-radius:10px;border:0;background:#2563eb;color:#fff;font-weight:700}',
  '.tv-cnm-b2{padding:10px 12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0}',
  '.tv-cnm-scr{position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1e293b}',
  '.tv-cnm-scr iframe,.tv-cnm-scr video{position:absolute;inset:0;width:100%;height:100%;border:0}',
  '.tv-cnm-ext{display:none;margin-top:8px;color:#60a5fa;font-weight:700;text-decoration:none}',
  '</style>',
  '<section id="tv-cnm-box">',
  '<div class="tv-cnm-top"><span class="tv-cnm-badge">ESPORTES • AO VIVO</span><span>Canal News Mundo</span></div>',
  '<div class="tv-cnm-doms">',
  '<a class="tv-cnm-dom" href="https://www.youtube.com/live" target="_blank" rel="noopener noreferrer">YouTube Live</a>',
  '<a class="tv-cnm-dom" href="https://studio.youtube.com/" target="_blank" rel="noopener noreferrer">YT Studio / Live</a>',
  '<a class="tv-cnm-dom" href="https://www.tiktok.com/live" target="_blank" rel="noopener noreferrer">TikTok Live</a>',
  '<a class="tv-cnm-dom" href="https://www.tiktok.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer">@canalnewsmundo</a>',
  '</div>',
  '<input id="tv-cnm-url" class="tv-cnm-in" type="text" placeholder="Cole link do YouTube, TikTok ou TV ao vivo..."/>',
  '<div class="tv-cnm-btns"><button id="tv-cnm-go" class="tv-cnm-b1" type="button">Carregar Jogo</button><button id="tv-cnm-clr" class="tv-cnm-b2" type="button">Limpar</button></div>',
  '<div id="tv-cnm-scr" class="tv-cnm-scr"></div>',
  '<a id="tv-cnm-ext" class="tv-cnm-ext" href="#" target="_blank" rel="noopener noreferrer">Abrir link externo</a>',
  '</section>',
  '<script id="tv-cnm-js">',
  '(()=>{const K="cnm_tv_live";const conv=u=>{u=(u||"").trim();const y=u.match(/(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/);if(y)return"https://www.youtube.com/embed/"+y[1]+"?autoplay=1&rel=0";const t=u.match(/tiktok\\.com\\/@[^/]+\\/video\\/(\\d+)/);if(t)return"https://www.tiktok.com/embed/v2/"+t[1];return u;};const run=()=>{const box=document.getElementById("tv-cnm-box");if(!box)return;const inp=box.querySelector("#tv-cnm-url"),go=box.querySelector("#tv-cnm-go"),clr=box.querySelector("#tv-cnm-clr"),scr=box.querySelector("#tv-cnm-scr"),ext=box.querySelector("#tv-cnm-ext");const main=document.querySelector("main")||document.body;if(box.parentNode!==main)main.appendChild(box);const show=u=>{u=(u||"").trim();scr.innerHTML="";if(!u){ext.style.display="none";return;}ext.href=u;ext.style.display="inline-block";const f=conv(u);const tag=/\\.(mp4|webm|ogg|m3u8)(\\?.*)?$/i.test(f)?"video":"iframe";const el=document.createElement(tag);el.src=f;if(tag==="video"){el.controls=true;el.autoplay=true;el.playsInline=true;}else{el.allow="autoplay; fullscreen; picture-in-picture";el.allowFullscreen=true;}scr.appendChild(el);};const sv=localStorage.getItem(K)||"";if(sv){inp.value=sv;show(sv);}go.onclick=()=>{const v=inp.value.trim();if(!v)return;localStorage.setItem(K,v);show(v);};clr.onclick=()=>{localStorage.removeItem(K);inp.value="";show("");};};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", htmlAdd + "\n</body>") : h + "\n" + htmlAdd;
fs.writeFileSync(f, h, "utf8");
console.log("Atalhos de live adicionados! Tamanho:", fs.statSync(f).size);
