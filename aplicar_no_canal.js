const fs = require("fs");
const path = require("path");

const candidatos = [
  path.join(process.cwd(), "public", "index.html"),
  path.join(process.cwd(), "index.html")
];

const arquivo = candidatos.find((p) => fs.existsSync(p));
if (!arquivo) {
  console.error("index.html nao encontrado em ~/canal-news-mundo");
  process.exit(1);
}

let html = fs.readFileSync(arquivo, "utf8");

html = html.replace(/<style id="estilo-redes-rodape">[\s\S]*?<\/style>\s*/g, "");
html = html.replace(/<div class="menu-redes-rodape" id="rodape-menu-hamburguer">[\s\S]*?<\/script>\s*/g, "");

const estilo = `
<style id="estilo-redes-rodape">
.menu-redes-rodape {
  margin-top: auto;
  padding: 18px 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.22);
}
.menu-redes-titulo {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.88;
  margin-bottom: 12px;
}
.menu-redes-lista {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.rede-icone-btn {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  text-decoration: none;
  transition: transform 0.15s ease, background-color 0.15s ease;
}
.rede-icone-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
.rede-icone-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.26);
}
.rede-icone-btn.ativo {
  background: rgba(255, 255, 255, 0.24);
}
.menu-rodape-creditos {
  margin-top: 14px;
  font-size: 12px;
  opacity: 0.75;
}
</style>
`;

const bloco = `
<div class="menu-redes-rodape" id="rodape-menu-hamburguer">
  <div class="menu-redes-titulo">REDES SOCIAIS</div>
  <div class="menu-redes-lista">
    <a id="link-tiktok" class="rede-icone-btn ativo" href="https://www.tiktok.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
    </a>
    <a id="link-youtube" class="rede-icone-btn ativo" href="https://www.youtube.com/@canalnewsmundo" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
    </a>
    <a id="link-facebook" class="rede-icone-btn" href="#facebook" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.6v3.2h2.8V22h3.1z"/></svg>
    </a>
    <a id="link-instagram" class="rede-icone-btn" href="#instagram" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
    </a>
  </div>
  <div class="menu-rodape-creditos"><span>Canal News Mundo</span></div>
</div>
`;

const script = `
<script id="script-redes-rodape">
(function() {
  const REDES_CANAL = {
    tiktok: "https://www.tiktok.com/@canalnewsmundo",
    youtube: "https://www.youtube.com/@canalnewsmundo",
    facebook: "",
    instagram: ""
  };

  function encaixarNoMenu() {
    const bloco = document.getElementById("rodape-menu-hamburguer");
    if (!bloco) return;

    const candidatos = Array.from(document.querySelectorAll("nav, aside, div, section"));
    const alvo = candidatos.find((el) => {
      const txt = (el.innerText || "").toLowerCase();
      const temSecoes = txt.includes("esportes") || txt.includes("mundo") || txt.includes("tecnologia");
      const naoEhBody = el.tagName !== "BODY" && el.tagName !== "HTML";
      const tamanhoMenu = el.offsetHeight > 120 && el.offsetWidth < window.innerWidth * 0.95;
      return naoEhBody && temSecoes && tamanhoMenu;
    }) || document.querySelector(".menu-hamburguer, .hamburger-menu, .drawer-menu, .sidebar-menu, nav");

    if (alvo && !alvo.contains(bloco)) {
      alvo.appendChild(bloco);
    }
  }

  function ativarLinks() {
    const lista = [
      { id: "link-tiktok", url: REDES_CANAL.tiktok, nome: "TikTok" },
      { id: "link-youtube", url: REDES_CANAL.youtube, nome: "YouTube" },
      { id: "link-facebook", url: REDES_CANAL.facebook, nome: "Facebook" },
      { id: "link-instagram", url: REDES_CANAL.instagram, nome: "Instagram" }
    ];
    lista.forEach(({ id, url, nome }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (url && url.trim() !== "") {
        el.href = url.trim();
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        el.classList.add("ativo");
        el.onclick = null;
      } else {
        el.href = "javascript:void(0)";
        el.removeAttribute("target");
        el.classList.remove("ativo");
        el.onclick = (e) => {
          e.preventDefault();
          alert(nome + " sera conectado em breve.");
        };
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    encaixarNoMenu();
    ativarLinks();
  });
  setTimeout(encaixarNoMenu, 400);
})();
</script>
`;

html = html.includes("</head>")
  ? html.replace("</head>", estilo + "\n</head>")
  : estilo + "\n" + html;

html = html.includes("</body>")
  ? html.replace("</body>", bloco + "\n" + script + "\n</body>")
  : html + "\n" + bloco + "\n" + script;

fs.writeFileSync(arquivo, html, "utf8");
console.log("Atualizado com sucesso em:", arquivo);
