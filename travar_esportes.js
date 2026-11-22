const fs = require("fs");
const path = require("path");

const srvPath = "server.js";
if (fs.existsSync(srvPath)) {
  let srv = fs.readFileSync(srvPath, "utf8");
  if (!srv.includes("/api/esportes-live")) {
    const rota = [
      '',
      'const ESP_LIVE_FILE = path.join(__dirname, "esportes_live.json");',
      'const lerEspLive = () => {',
      '  try {',
      '    if (fs.existsSync(ESP_LIVE_FILE)) return JSON.parse(fs.readFileSync(ESP_LIVE_FILE, "utf8"));',
      '  } catch (e) {}',
      '  return { url: "", liberado: false, links: [{ nome: "YouTube", url: "https://www.youtube.com/live" }, { nome: "TikTok", url: "https://www.tiktok.com/@canalnewsmundo" }, { nome: "TV Ao Vivo", url: "https://www.youtube.com/live/L_sWm8l" }] };',
      '};',
      'app.get("/api/esportes-live", (req, res) => res.json(lerEspLive()));',
      'app.post("/api/esportes-live", (req, res) => {',
      '  const atual = lerEspLive();',
      '  const body = req.body || {};',
      '  const proximo = {',
      '    url: typeof body.url === "string" ? body.url.trim() : atual.url,',
      '    liberado: typeof body.liberado === "boolean" ? body.liberado : atual.liberado,',
      '    links: Array.isArray(body.links) ? body.links : atual.links',
      '  };',
      '  fs.writeFileSync(ESP_LIVE_FILE, JSON.stringify(proximo, null, 2), "utf8");',
      '  res.json(proximo);',
      '});',
      ''
    ].join("\n");

    if (srv.includes("app.listen(")) {
      srv = srv.replace(/app\.listen\(/, rota + "\napp.listen(");
      fs.writeFileSync(srvPath, srv, "utf8");
      console.log("Rota /api/esportes-live adicionada ao server.js");
    }
  }
}

const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");
h = h.replace(/<style id="tv-cnm-style">[\s\S]*?<\/style>/g, "")
     .replace(/<(section|script) id="(tv-cnm-box|tv-cnm-js)">[\s\S]*?<\/\1>/g, "");

const htmlAdd = [
  '<style id="tv-cnm-style">',
  '#tv-cnm-box{display:block;margin:12px auto 16px;padding:12px;border-radius:14px;background:#0b1324;border:1px solid #2563eb;color:#f8fafc}',
  '.tv-cnm-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;font-size:12px;font-weight:700}',
  '.tv-cnm-badge{background:#7f1d1d;color:#fecaca;padding:4px 9px;border-radius:999px;font-size:11px}',
  '.tv-cnm-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}',
  '.tv-cnm-linkbtn{display:inline-block;padding:7px 11px;border-radius:8px;border:1px solid #334155;background:#111c33;color:#93c5fd;font-size:12px;font-weight:700;text-decoration:none}',
  '.tv-cnm-mini{padding:7px 10px;border-radius:8px;border:1px solid #475569;background:#1e293b;color:#f8fafc;font-size:12px;font-weight:700}',
  '.tv-cnm-admin{display:none;margin-top:8px;padding-top:8px;border-top:1px solid #1e293b}',
  '.tv-cnm-admin.ativo{display:block}',
  '.tv-cnm-cfg{display:none;margin-top:8px;padding:10px;border-radius:10px;background:#070d19;border:1px dashed #475569}',
  '.tv-cnm-cfg.aberta{display:block}',
  '.tv-cnm-cfg-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}',
  '.tv-cnm-cfg-in{flex:1 1 120px;padding:8px;border-radius:8px;border:1px solid #334155;background:#0b1324;color:#fff;font-size:12px}',
  '.tv-cnm-in{width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #334155;background:#050a14;color:#fff;margin-bottom:8px;font-size:13px}',
  '.tv-cnm-btns{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}',
  '.tv-cnm-b1{padding:9px 14px;border-radius:10px;border:0;background:#2563eb;color:#fff;font-weight:700;font-size:13px}',
  '.tv-cnm-b2{padding:9px 12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-size:13px}',
  '.tv-cnm-scr{position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1e293b}',
  '.tv-cnm-scr iframe,.tv-cnm-scr video{position:absolute;inset:0;width:100%;height:100%;border:0}',
  '.tv-cnm-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:14px;text-align:center;color:#94a3b8;font-size:13px}',
  '.tv-cnm-ext{display:none;margin-top:8px;color:#60a5fa;font-weight:700;font-size:13px;text-decoration:none}',
  '</style>',
  '<section id="tv-cnm-box">',
  '<div class="tv-cnm-top"><span class="tv-cnm-badge">ESPORTES • AO VIVO</span><span>Canal News Mundo</span></div>',
  '<div id="tv-cnm-links" class="tv-cnm-bar"></div>',
  '<div id="tv-cnm-admin" class="tv-cnm-admin">',
  '<input id="tv-cnm-url" class="tv-cnm-in" type="text" placeholder="Cole link do YouTube, TikTok ou TV ao vivo..."/>',
  '<div class="tv-cnm-btns">',
  '<button id="tv-cnm-go" class="tv-cnm-b1" type="button">Carregar Jogo</button>',
  '<button id="tv-cnm-perm" class="tv-cnm-b1" type="button">Acesso: BLOQUEADO</button>',
  '<button id="tv-cnm-clr" class="tv-cnm-b2" type="button">Limpar</button>',
  '<button id="tv-cnm-cfgbtn" class="tv-cnm-b2" type="button">Configurar</button>',
  '</div>',
  '<div id="tv-cnm-cfg" class="tv-cnm-cfg">',
  '<div id="tv-cnm-cfg-rows"></div>',
  '<div class="tv-cnm-btns" style="margin-bottom:0">',
  '<button id="tv-cnm-add" class="tv-cnm-b2" type="button">+ Botao</button>',
  '<button id="tv-cnm-save" class="tv-cnm-b1" type="button">Salvar Links</button>',
  '</div>',
  '</div>',
  '</div>',
  '<div id="tv-cnm-scr" class="tv-cnm-scr"><div class="tv-cnm-msg">Transmissao bloqueada pelo administrador.</div></div>',
  '<a id="tv-cnm-ext" class="tv-cnm-ext" href="#" target="_blank" rel="noopener noreferrer">Abrir link externo</a>',
  '</section>',
  '<script id="tv-cnm-js">',
  '(()=>{const PADRAO=[{nome:"YouTube",url:"https://www.youtube.com/live"},{nome:"TikTok",url:"https://www.tiktok.com/@canalnewsmundo"},{nome:"TV Ao Vivo",url:"https://www.youtube.com/live/L_sWm8l"}];let estado={url:"",liberado:false,links:PADRAO};const ehAdmin=()=>{const txt=document.body.innerText||"";return Boolean(document.querySelector("[data-admin],.admin-panel,#painel-admin,.modo-admin"))||/sair do admin|painel admin|novo post|publicar not/i.test(txt);};const conv=u=>{u=(u||"").trim();const y=u.match(/(?:youtube\\.com\\/(?:watch\\?v=|live\\/|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{6,})/);if(y)return"https://www.youtube.com/embed/"+y[1]+"?autoplay=1&rel=0";const t=u.match(/tiktok\\.com\\/@[^/]+\\/video\\/(\\d+)/);if(t)return"https://www.tiktok.com/embed/v2/"+t[1];return u;};const salvarServidor=async(patch)=>{try{const r=await fetch("/api/esportes-live",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(patch)});if(r.ok)estado=await r.json();}catch(e){estado={...estado,...patch};}pintar();};const run=()=>{const box=document.getElementById("tv-cnm-box");if(!box)return;const linksWrap=box.querySelector("#tv-cnm-links"),adminWrap=box.querySelector("#tv-cnm-admin"),inp=box.querySelector("#tv-cnm-url"),go=box.querySelector("#tv-cnm-go"),perm=box.querySelector("#tv-cnm-perm"),clr=box.querySelector("#tv-cnm-clr"),cfgBtn=box.querySelector("#tv-cnm-cfgbtn"),cfg=box.querySelector("#tv-cnm-cfg"),cfgRows=box.querySelector("#tv-cnm-cfg-rows"),addBtn=box.querySelector("#tv-cnm-add"),saveBtn=box.querySelector("#tv-cnm-save"),scr=box.querySelector("#tv-cnm-scr"),ext=box.querySelector("#tv-cnm-ext");const main=document.querySelector("main")||document.body;if(box.parentNode!==main)main.appendChild(box);const paintCfg=(arr)=>{cfgRows.innerHTML="";arr.forEach(item=>{const row=document.createElement("div");row.className="tv-cnm-cfg-row";const n=document.createElement("input");n.className="tv-cnm-cfg-in nome";n.placeholder="Nome";n.value=item.nome||"";const u=document.createElement("input");u.className="tv-cnm-cfg-in url";u.placeholder="https://...";u.value=item.url||"";row.appendChild(n);row.appendChild(u);cfgRows.appendChild(row);});};window.__pintarEsportesLive=pintar=()=>{const adm=ehAdmin();adminWrap.classList.toggle("ativo",adm);perm.textContent=estado.liberado?"Acesso: LIBERADO":"Acesso: BLOQUEADO";if(document.activeElement!==inp)inp.value=estado.url||"";linksWrap.innerHTML="";(estado.links||PADRAO).forEach(item=>{const a=document.createElement("a");a.className="tv-cnm-linkbtn";a.href=item.url||"#";a.target="_blank";a.rel="noopener noreferrer";a.textContent=item.nome||"Link";linksWrap.appendChild(a);});if(!estado.liberado&&!adm){scr.innerHTML=\'<div class="tv-cnm-msg">Transmissao bloqueada no momento.</div>\';ext.style.display="none";return;}const u=(estado.url||"").trim();if(!u){scr.innerHTML=\'<div class="tv-cnm-msg">Nenhuma transmissao carregada.</div>\';ext.style.display="none";return;}ext.href=u;ext.style.display="inline-block";const f=conv(u);const tag=/\\.(mp4|webm|ogg|m3u8)(\\?.*)?$/i.test(f)?"video":"iframe";const el=document.createElement(tag);el.src=f;if(tag==="video"){el.controls=true;el.autoplay=true;el.playsInline=true;}else{el.allow="autoplay; fullscreen; picture-in-picture";el.allowFullscreen=true;}scr.innerHTML="";scr.appendChild(el);};go.onclick=()=>salvarServidor({url:inp.value.trim(),liberado:true});perm.onclick=()=>salvarServidor({liberado:!estado.liberado});clr.onclick=()=>salvarServidor({url:"",liberado:false});cfgBtn.onclick=()=>{const abrir=!cfg.classList.contains("aberta");cfg.classList.toggle("aberta",abrir);if(abrir)paintCfg(estado.links||PADRAO);};addBtn.onclick=()=>{const cur=Array.from(cfgRows.querySelectorAll(".tv-cnm-cfg-row")).map(r=>({nome:r.querySelector(".nome").value,url:r.querySelector(".url").value}));cur.push({nome:"",url:""});paintCfg(cur);};saveBtn.onclick=()=>{const novos=Array.from(cfgRows.querySelectorAll(".tv-cnm-cfg-row")).map(r=>({nome:r.querySelector(".nome").value.trim(),url:r.querySelector(".url").value.trim()})).filter(x=>x.nome||x.url);salvarServidor({links:novos.length?novos:PADRAO});cfg.classList.remove("aberta");};fetch("/api/esportes-live").then(r=>r.ok?r.json():estado).then(d=>{estado={...estado,...d};pintar();}).catch(()=>pintar());setInterval(pintar,1200);};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();',
  '</script>'
].join("\n");

h = h.includes("</body>") ? h.replace("</body>", htmlAdd + "\n</body>") : h + "\n" + htmlAdd;
fs.writeFileSync(f, h, "utf8");
console.log("Travamento e permissao de Esportes configurados!");
