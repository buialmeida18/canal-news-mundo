const fs = require("fs");
const p = ["public/index.html", "index.html"].find((f) => fs.existsSync(f));
if (!p) { console.error("HTML nao encontrado"); process.exit(1); }
let h = fs.readFileSync(p, "utf8");
h = h.replace(/<!-- INÍCIO: BLOCO ESPORTES AO VIVO[\s\S]*?<!-- FIM: BLOCO ESPORTES AO VIVO[\s\S]*?-->\s*/g, "");
h = h.replace(/<style id="estilo-esportes-aovivo[^"]*">[\s\S]*?<\/style>\s*/g, "");
h = h.replace(/<script id="script-esportes-aovivo[^"]*">[\s\S]*?<\/script>\s*/g, "");
const bloco = `
<style id="estilo-esportes-aovivo-mascara">
#painel-esportes-aovivo{display:none;margin:14px auto 18px;padding:14px;border-radius:14px;background:linear-gradient(160deg,#111927 0%,#0b111c 100%);border:1px solid rgba(59,130,246,.45);box-shadow:0 8px 24px rgba(0,0,0,.5);position:relative;z-index:5}
#painel-esportes-aovivo.ativo{display:block!important}
.aovivo-cabecalho{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}
.aovivo-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:rgba(220,38,38,.2);border:1px solid rgba(248,113,113,.5);color:#FCA5A5;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.aovivo-ponto{width:8px;height:8px;border-radius:50%;background:#EF4444;box-shadow:0 0 8px #EF4444}
.aovivo-titulo{color:#F8FAFC;font-size:15px;font-weight:700;margin:0 0 10px}
.aovivo-controles{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.aovivo-input{flex:1 1 220px;min-width:0;padding:11px 12px;border-radius:10px;border:1px solid rgba(148,163,184,.4);background:#0f172a;color:#FFF;font-size:14px}
.aovivo-btn-carregar{padding:11px 15px;border-radius:10px;border:none;background:linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%);color:#FFF;font-size:13px;font-weight:700;cursor:pointer}
.aovivo-btn-limpar{padding:11px 12px;border-radius:10px;border:1px solid rgba(148,163,184,.28);background:rgba(30,41,59,.85);color:#CBD5E1;font-size:13px;font-weight:600;cursor:pointer}
.aovivo-player-box{position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#05080f;border:1px solid rgba(148,163,184,.22)}
.aovivo-player-box iframe,.aovivo-player-box video{position:absolute;top:0;left:0;width:100%;height:100%;border:0;z-index:1}
.aovivo-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:16px;color:#94A3B8;font-size:13px;line-height:1.5;z-index:1}
#mascara-canto-aovivo{display:none;position:absolute;left:72%;top:76%;width:24%;height:18%;background:#0b111c;border:1px solid rgba(148,163,184,.45);border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,.65);z-index:4;pointer-events:none}
#mascara-canto-aovivo.visivel{display:block}
.mascara-controles-box{margin-top:12px;padding:11px 12px;border-radius:11px;background:rgba(15,23,42,.85);border:1px solid rgba(148,163,184,.2)}
.mascara-topo{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.mascara-titulo{font-size:12px;font-weight:700;color:#E2E8F0}
.mascara-btn-toggle{padding:6px 11px;border-radius:8px;border:1px solid rgba(96,165,250,.45);background:rgba(37,99,235,.22);color:#93C5FD;font-size:12px;font-weight:700;cursor:pointer}
.mascara-btn-toggle.ativa{background:#2563EB;color:#FFF;border-color:#3B82F6}
.mascara-sliders{display:grid;grid-template-columns:1fr;gap:8px}
.mascara-linha-slider{display:flex;align-items:center;gap:8px;font-size:11px;color:#94A3B8}
.mascara-linha-slider span:first-child{width:68px;color:#CBD5E1;font-weight:600}
.mascara-linha-slider input[type="range"]{flex:1;accent-color:#3B82F6}
.mascara-linha-slider span:last-child{width:40px;text-align:right;color:#E2E8F0}
.aovivo-rodape{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:10px;font-size:12px;color:#94A3B8}
.aovivo-link-externo{color:#60A5FA;text-decoration:none;font-weight:600}
</style>
<section id="painel-esportes-aovivo" aria-label="Transmissão de Esportes Ao Vivo">
<div class="aovivo-cabecalho"><span class="aovivo-badge"><span class="aovivo-ponto"></span> Esportes • Ao Vivo</span><span style="font-size:12px;color:#94A3B8;">Canal News Mundo</span></div>
<h3 class="aovivo-titulo">Transmissão do Jogo Ao Vivo</h3>
<div class="aovivo-controles">
<input type="text" inputmode="url" autocomplete="off" autocapitalize="off" spellcheck="false" id="input-link-jogo-aovivo" class="aovivo-input" placeholder="Cole aqui o link do jogo ao vivo (YouTube ou player)..."/>
<button type="button" id="btn-carregar-jogo-aovivo" class="aovivo-btn-carregar">Carregar Jogo</button>
<button type="button" id="btn-limpar-jogo-aovivo" class="aovivo-btn-limpar">Limpar</button>
</div>
<div class="aovivo-player-box" id="box-player-esportes">
<div class="aovivo-placeholder">Cole o link da transmissão acima e toque em <strong>Carregar Jogo</strong> para assistir direto na seção Esportes.</div>
<div id="mascara-canto-aovivo" aria-hidden="true"></div>
</div>
<div class="mascara-controles-box">
<div class="mascara-topo"><span class="mascara-titulo">Máscara de Cobertura na Tela</span><button type="button" id="btn-toggle-mascara" class="mascara-btn-toggle">Ativar Máscara</button></div>
<div class="mascara-sliders">
<label class="mascara-linha-slider"><span>Horizontal</span><input type="range" id="range-mascara-x" min="0" max="80" value="72"/><span id="val-mascara-x">72%</span></label>
<label class="mascara-linha-slider"><span>Vertical</span><input type="range" id="range-mascara-y" min="0" max="82" value="76"/><span id="val-mascara-y">76%</span></label>
<label class="mascara-linha-slider"><span>Largura</span><input type="range" id="range-mascara-w" min="8" max="60" value="24"/><span id="val-mascara-w">24%</span></label>
<label class="mascara-linha-slider"><span>Altura</span><input type="range" id="range-mascara-h" min="6" max="40" value="18"/><span id="val-mascara-h">18%</span></label>
</div>
</div>
<div class="aovivo-rodape"><span>Dica: links do YouTube Live funcionam direto na tela.</span><a id="link-externo-jogo-aovivo" class="aovivo-link-externo" href="#" target="_blank" rel="noopener noreferrer" style="display:none;">Abrir transmissão externa ↗</a></div>
</section>
<script id="script-esportes-aovivo-mascara">
(function(){
const CHAVE_STORAGE="canal_news_mundo_esportes_live_url",CHAVE_MASCARA="canal_news_mundo_esportes_mascara_cfg";
const norm=(u)=>{const s=(u||"").trim();if(!s)return"";const m=s.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);return m&&m[1]?"https://www.youtube.com/embed/"+m[1]+"?autoplay=1&rel=0":s;};
const ehVid=(u)=>/\.(mp4|webm|ogg)(\?.*)?$/i.test(u);
const emEsp=()=>{const h=decodeURIComponent(location.hash||"").toLowerCase(),pt=decodeURIComponent(location.pathname||"").toLowerCase(),sel=Array.from(document.querySelectorAll("select")).some(s=>((s.value||"").toLowerCase().includes("esporte")||(s.options&&s.selectedIndex>=0&&(s.options[s.selectedIndex].textContent||"").toLowerCase().includes("esporte"))));return h.includes("esporte")||pt.includes("esporte")||sel;};
function init(){
const painel=document.getElementById("painel-esportes-aovivo");if(!painel)return;
const input=painel.querySelector("#input-link-jogo-aovivo"),btnCarregar=painel.querySelector("#btn-carregar-jogo-aovivo"),btnLimpar=painel.querySelector("#btn-limpar-jogo-aovivo"),boxPlayer=painel.querySelector("#box-player-esportes"),linkExterno=painel.querySelector("#link-externo-jogo-aovivo"),mascara=painel.querySelector("#mascara-canto-aovivo"),btnToggle=painel.querySelector("#btn-toggle-mascara"),rX=painel.querySelector("#range-mascara-x"),rY=painel.querySelector("#range-mascara-y"),rW=painel.querySelector("#range-mascara-w"),rH=painel.querySelector("#range-mascara-h"),vX=painel.querySelector("#val-mascara-x"),vY=painel.querySelector("#val-mascara-y"),vW=painel.querySelector("#val-mascara-w"),vH=painel.querySelector("#val-mascara-h");
let cfg={ativa:false,x:72,y:76,w:24,h:18};
try{const sc=JSON.parse(localStorage.getItem(CHAVE_MASCARA)||"null");if(sc&&typeof sc==="object")cfg=Object.assign(cfg,sc);}catch(_){}
function aplMasc(){rX.value=cfg.x;rY.value=cfg.y;rW.value=cfg.w;rH.value=cfg.h;vX.textContent=cfg.x+"%";vY.textContent=cfg.y+"%";vW.textContent=cfg.w+"%";vH.textContent=cfg.h+"%";mascara.style.left=cfg.x+"%";mascara.style.top=cfg.y+"%";mascara.style.width=cfg.w+"%";mascara.style.height=cfg.h+"%";mascara.classList.toggle("visivel",Boolean(cfg.ativa));btnToggle.classList.toggle("ativa",Boolean(cfg.ativa));btnToggle.textContent=cfg.ativa?"Máscara Ativa":"Ativar Máscara";try{localStorage.setItem(CHAVE_MASCARA,JSON.stringify(cfg));}catch(_){}}
btnToggle.addEventListener("click",(e)=>{e.stopPropagation();cfg.ativa=!cfg.ativa;aplMasc();});
[[rX,"x"],[rY,"y"],[rW,"w"],[rH,"h"]].forEach(([el,k])=>el.addEventListener("input",(e)=>{e.stopPropagation();cfg[k]=Number(el.value);aplMasc();}));
aplMasc();
let pos=false;
function posOnce(){if(pos)return;const st=Array.from(document.querySelectorAll("div,span,p")).find(el=>(el.textContent||"").includes("Servidor conectado"));if(st&&st.parentNode&&st.nextSibling!==painel){st.parentNode.insertBefore(painel,st.nextSibling);pos=true;}}
function render(orig){const l=(orig||"").trim(),f=norm(l),mid=!l?'<div class="aovivo-placeholder">Cole o link da transmissão acima e toque em <strong>Carregar Jogo</strong> para assistir direto na seção Esportes.</div>':ehVid(f)?'<video src="'+f.replace(/"/g,"&quot;")+'" controls autoplay playsinline></video>':'<iframe src="'+f.replace(/"/g,"&quot;")+'" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>';if(!l){linkExterno.style.display="none";}else{linkExterno.href=l;linkExterno.style.display="inline-block";}boxPlayer.innerHTML=mid;boxPlayer.appendChild(mascara);aplMasc();}
const salvo=localStorage.getItem(CHAVE_STORAGE)||"";if(salvo){input.value=salvo;render(salvo);}
["pointerdown","touchstart","mousedown","click"].forEach(ev=>input.addEventListener(ev,e=>e.stopPropagation()));
input.addEventListener("input",()=>localStorage.setItem(CHAVE_STORAGE,input.value));
btnCarregar.addEventListener("click",(e)=>{e.stopPropagation();const v=input.value.trim();if(!v)return;localStorage.setItem(CHAVE_STORAGE,v);render(v);});
btnLimpar.addEventListener("click",(e)=>{e.stopPropagation();localStorage.removeItem(CHAVE_STORAGE);input.value="";render("");});
let man=null;
function sync(){if(document.activeElement===input)return;posOnce();painel.classList.toggle("ativo",man!==null?man:emEsp());}
document.addEventListener("change",(e)=>{if(e.target===input)return;man=null;sync();},true);
document.addEventListener("click",(e)=>{if(painel.contains(e.target))return;const a=e.target.closest("button,a,span,div,li,option");if(!a)return;const t=(a.textContent||"").trim().toLowerCase();if(t==="esportes"||t==="esporte"){man=true;sync();}else if(["todas as notícias","todas as noticias","mundo","tecnologia","geral"].includes(t)){man=false;sync();}},true);
sync();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
</script>
`;
h = h.includes("</body>") ? h.replace("</body>", bloco + "\n</body>") : h + "\n" + bloco;
fs.writeFileSync(p, h, "utf8");
console.log("Mascara aplicada em:", p);
