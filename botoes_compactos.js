const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

h = h.replace(/<style id="tv-cnm-style">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(tv-cnm-box|tv-cnm-js)">[\s\S]*?<\/\1>/g, "");

const htmlAdd = [
  '<style id="tv-cnm-style">',
  '#tv-cnm-box{display:block;margin:12px auto 16px;padding:12px;border-radius:14px;background:#0b1324;border:1px solid #2563eb;color:#f8fafc}',
  '.tv-cnm-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;font-size:12px;font-weight:700}',
  '.tv-cnm-badge{background:#7f1d1d;color:#fecaca;padding:4px 9px;border-radius:999px;font-size:11px}',
  '.tv-cnm-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}',
  '.tv-cnm-linkbtn{display:inline-block;padding:7px 11px;border-radius:8px;border:1px solid #334155;background:#111c33;color:#93c5fd;font-size:12px;font-weight:700;text-decoration:none}',
  '.tv-cnm-mini{padding:7px 10px;border-radius:8px;border:1px solid #475569;background:#1e293b;color:#f8fafc;font-size:12px;font-weight:700}',
  '.tv-cnm-area{display:none;margin-top:10px}',
  '.tv-cnm-area.aberta{display:block}',
  '.tv-cnm-cfg{display:none;margin-top:10px;padding:10px;border-radius:10px;background:#070d19;border:1px dashed #475569}',
  '.tv-cnm-cfg.aberta{display:block}',
  '.tv-cnm-cfg-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}',
  '.tv-cnm-cfg-in{flex:1 1 120px;padding:8px;border-radius:8px;border:1px solid #334155;background:#0b1324;color:#fff;font-size:12px}',
  '.tv-cnm-in{width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #334155;background:#050a14;color:#fff;margin-bottom:8px;font-size:13px}',
  '.tv-cnm-btns{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}',
  '.tv-cnm-b1{padding:9px 14px;border-radius:10px;border:0;background:#2563eb;color:#fff;font-weight:700;font-size:13px}',
  '.tv-cnm-b2{padding:9px 12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-size:13px}',
  '.tv-cnm-scr{position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1e293b}',
  '.tv-cnm-scr iframe,.tv-cnm-scr video{position:absolute;inset:0;width:100%;height:100%;border:0}',
  '.tv-cnm-ext{display:none;margin-top:8px;color:#60a5fa;font-weight:700;font-size:13px;text-decoration:none}',
  '</style>',
  '<section id="tv-cnm-box">',
  '<div class="tv-cnm-top"><span class="tv-cnm-badge">ESPORTES • AO VIVO</span><span>Canal News Mundo</span></div>',
  '<div class="tv-cnm-bar">',
  '<div id="tv-cnm-links" style="display:flex;flex-wrap:wrap;gap:6px;"></div>',
  '<button id="tv-cnm-toggle" class="tv-cnm-mini" type="button">Player</button>',
  '<button id="tv-cnm-cfgbtn" class="tv-cnm-mini" type="button">Configurar</button>',
  '</div>',
  '<div id="tv-cnm-cfg" class="tv-cnm-cfg">',
  '<div id="tv-cnm-cfg-rows"></div>',
  '<div class="tv-cnm-btns" style="margin-bottom:0">',
  '<button id="tv-cnm-add" class="tv-cnm-b2" type="button">+ Botão</button>',
  '<button id="tv-cnm-save" class="tv-cnm-b1" type="button">Salvar Links</button>',
  '</div>',
  '</div>',
  '<div id="tv-cnm-area" class="tv-cnm-area">',
  '<input id="tv-cnm-url" class="tv-cnm-in" type="text" placeholder="Cole link do YouTube, TikTok ou TV ao vivo..."/>',
  '<div class="tv-cnm-btns"><button id="tv-cnm-go" class="tv-cnm-b1" type="button">Carregar Jogo</button><button id="tv-cnm-clr" class="tv-cnm-b2" type="button">Limpar</button></div>',
  '<div id="tv-cnm-scr" class="tv-cnm-scr"></div>',
  '<a id="tv-cnm-ext" class="tv-cnm-ext" href="#" target="_blank" rel="noopener noreferrer">Abrir link externo</a>',
  '</div>',
  '</section>',
  '<script id="tv-cnm-js">',
  '(()=>{const K_URL="cnm_tv_live",K_LINKS="cnm_tv_links";const PADRAO=[{nome:"YouTube",url:"https://www.youtube.com/live"},{nome:"TikTok",url:"https://www.tiktok.com/@canalnewsmundo"},{nome:"TV Ao Vivo",url:"https://www.youtube.com/live/L_sWm8l"}];const getLinks=()=>{try{const d=JSON.parse(localStorage.getItem(K_LINKS));return Array.isArray(d)&&d.length?d:PADRAO;}catch(e){return PADRAO;}};const conv=u=>{u=(u||"").trim();const y=u.match(/(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/);if(y)return"https://www.youtube.com/embed/"+y[1]+"?autoplay=1&rel=0";const t=u.match(/tiktok\\.com\\/@[^/]+\\/video\\/(\\d+)/);if(t)return"https://www.tiktok.com/embed/v2/"+t[1];return u;};const run=()=>{const box=document.getElementById("tv-cnm-box");if(!box)return;const linksWrap=box.querySelector("#tv-cnm-links"),area=box.querySelector("#tv-cnm-area"),cfg=box.querySelector("#tv-cnm-cfg"),cfgRows=box.querySelector("#tv-cnm-cfg-rows"),tog=box.querySelector("#tv-cnm-toggle"),cfgBtn=box.querySelector("#tv-cnm-cfgbtn"),addBtn=box.querySelector("#tv-cnm-add"),saveBtn=box.querySelector("#tv-cnm-save"),inp=box.querySelector("#tv-cnm-url"),go=box.querySelector("#tv-cnm-go"),clr=box.querySelector("#tv-cnm-clr"),scr=box.querySelector("#tv-cnm-scr"),ext=box.querySelector("#tv-cnm-ext");const main=document.querySelector("main")||document.body;if(box.parentNode!==main)main.appendChild(box);const paintLinks=()=>{const arr=getLinks();linksWrap.innerHTML="";arr.forEach(item=>{const a=document.createElement("a");a.className="tv-cnm-linkbtn";a.href=item.url||"#";a.target="_blank";a.rel="noopener noreferrer";a.textContent=item.nome||"Link";linksWrap.appendChild(a);});};const paintCfg=(arr)=>{cfgRows.innerHTML="";arr.forEach(item=>{const row=document.createElement("div");row.className="tv-cnm-cfg-row";const n=document.createElement("input");n.className="tv-cnm-cfg-in nome";n.placeholder="Nome (ex: TikTok)";n.value=item.nome||"";const u=document.createElement("input");u.className="tv-cnm-cfg-in url";u.placeholder="https://...";u.value=item.url||"";row.appendChild(n);row.appendChild(u);cfgRows.appendChild(row);});};const show=u=>{u=(u||"").trim();scr.innerHTML="";if(!u){ext.style.display="none";return;}ext.href=u;ext.style.display="inline-block";const f=conv(u);const tag=/\\.(mp4|webm|ogg|m3u8)(\\?.*)?$/i.test(f)?"video":"iframe";const el=document.createElement(tag);el.src=f;if(tag==="video"){el.controls=true;el.autoplay=true;el.playsInline=true;}else{el.allow="autoplay; fullscreen; picture-in-picture";el.allowFullscreen=true;}scr.appendChild(el);};tog.onclick=()=>{area.classList.toggle("aberta");};cfgBtn.onclick=()=>{const abrir=!cfg.classList.contains("aberta");cfg.classList.toggle("aberta",abrir);if(abrir)paintCfg(getLinks());};addBtn.onclick=()=>{const cur=Array.from(cfgRows.querySelectorAll(".tv-cnm-cfg-row")).map(r=>({nome:r.querySelector(".nome").value,url:r.querySelector(".url").value}));cur.push({nome:"",url:""});paintCfg(cur);};saveBtn.onclick=()=>{const novos=Array.from(cfgRows.querySelectorAll(".tv-cnm-cfg-row")).map(r=>({nome:r.querySelector(".nome").value.trim(),url:r.querySelector(".url").value.trim()})).filter(x=>x.nome||x.url);localStorage.setItem(K_LINKS,JSON.stringify(novos.length?novos:PADRAO));paintLinks();cfg.classList.remove("aberta");};paintLinks();const sv=localStorage.getItem(K_URL)||"";if(sv){inp.value=sv;show(sv);area.classList.add("aberta");}go.onclick=()=>{const v=inp.value.trim();if(!v)return;localStorage.setItem(K_URL,v);show(v);area.classList.add("aberta");};clr.onclick=()=>{localStorage.removeItem(K_URL);inp.value="";show("");};};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", htmlAdd + "\n</body>") : h + "\n" + htmlAdd;
fs.writeFileSync(f, h, "utf8");
console.log("Botoes compactos e configuracao aplicados!");
