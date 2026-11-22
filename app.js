const listaEl = document.getElementById("lista-noticias");
const buscaEl = document.getElementById("busca");
const categoriaEl = document.getElementById("filtro-categoria");
const formEl = document.getElementById("form-noticia");
const statusEl = document.getElementById("status-post");
const painelPostEl = document.getElementById("painel-postagem");
const btnAdmin = document.getElementById("btn-admin");
const btnTogglePost = document.getElementById("btn-toggle-post");
const btnFecharPost = document.getElementById("btn-fechar-post");
const btnMenu = document.getElementById("btn-menu");
const menuGaveta = document.getElementById("menu-gaveta");
const statusTempoRealEl = document.getElementById("status-tempo-real");
const btnNovidadesEl = document.getElementById("btn-novidades");

const modalLeituraEl = document.getElementById("modal-leitura");
const modalCategoriaEl = document.getElementById("modal-categoria");
const modalCorpoEl = document.getElementById("modal-corpo");
const modalRelacionadosEl = document.getElementById("modal-lista-relacionados");
const btnFecharModalEl = document.getElementById("btn-fechar-modal");

const corTemaEl = document.getElementById("cor-tema");
const controleBrilhoEl = document.getElementById("controle-brilho");
const valorBrilhoEl = document.getElementById("valor-brilho");
const btnResetVisualEl = document.getElementById("btn-reset-visual");

const mapaRotasSecao = {
  "/": "todas",
  "/mundo": "Mundo",
  "/esportes": "Esportes",
  "/tecnologia": "Tecnologia",
  "/geral": "Geral"
};

const mapaLinksSecao = {
  todas: "/",
  Mundo: "/mundo",
  Esportes: "/esportes",
  Tecnologia: "/tecnologia",
  Geral: "/geral"
};

let todasNoticias = [];
let noticiasPendentes = null;
let ultimoHash = "";
let senhaSessao = sessionStorage.getItem("cnm_senha_admin") || "";

function obterSecaoDaUrl() {
  const caminho = window.location.pathname.toLowerCase();
  if (mapaRotasSecao[caminho]) {
    return mapaRotasSecao[caminho];
  }
  const params = new URLSearchParams(window.location.search);
  return params.get("secao") || "todas";
}

function navegarParaSecao(cat) {
  const destino = mapaLinksSecao[cat] || "/";
  const adminQuery = querAcessoAdmin() ? "?admin=1" : "";
  window.location.href = `${destino}${adminQuery}`;
}

function querAcessoAdmin() {
  const params = new URLSearchParams(window.location.search);
  return params.get("admin") === "1" || sessionStorage.getItem("cnm_ver_admin") === "1";
}

function estaLogadoAdmin() {
  return Boolean(senhaSessao);
}

function atualizarInterfaceAdmin() {
  const logado = estaLogadoAdmin();
  const podeMostrarBotaoAdmin = logado || querAcessoAdmin();

  if (btnAdmin) {
    btnAdmin.classList.toggle("oculto", !podeMostrarBotaoAdmin);
    btnAdmin.textContent = logado ? "Sair Admin" : "Modo Admin";
    btnAdmin.classList.toggle("ativo", logado);
  }
  if (btnTogglePost) {
    btnTogglePost.classList.toggle("oculto", !logado);
  }
  if (!logado && painelPostEl) {
    painelPostEl.classList.add("oculto");
  }
  renderizarNoticias();
}

function pedirSenhaAdmin() {
  if (senhaSessao) return senhaSessao;
  const digitada = prompt("Digite a senha de administrador do Canal News Mundo:");
  if (!digitada) return "";
  senhaSessao = digitada.trim();
  sessionStorage.setItem("cnm_senha_admin", senhaSessao);
  sessionStorage.setItem("cnm_ver_admin", "1");
  atualizarInterfaceAdmin();
  return senhaSessao;
}

if (btnAdmin) {
  btnAdmin.addEventListener("click", () => {
    if (estaLogadoAdmin()) {
      senhaSessao = "";
      sessionStorage.removeItem("cnm_senha_admin");
      sessionStorage.removeItem("cnm_ver_admin");
      atualizarInterfaceAdmin();
      alert("Modo Admin encerrado.");
      return;
    }
    const senha = pedirSenhaAdmin();
    if (!senha) {
      alert("Senha não informada.");
    }
  });
}

function aplicarVisual(corHex, brilhoPct) {
  const corValida = /^#[0-9a-fA-F]{6}$/.test(corHex) ? corHex : "#ef233c";
  const brilhoNum = Math.min(125, Math.max(65, Number(brilhoPct) || 100));

  document.documentElement.style.setProperty("--vermelho", corValida);
  document.documentElement.style.setProperty("--vermelho-vivo", corValida);
  document.documentElement.style.setProperty(
    "--vermelho-escuro",
    `color-mix(in srgb, ${corValida} 62%, #000000)`
  );
  document.documentElement.style.setProperty("--brilho-tela", (brilhoNum / 100).toFixed(2));

  if (corTemaEl) corTemaEl.value = corValida;
  if (controleBrilhoEl) controleBrilhoEl.value = String(brilhoNum);
  if (valorBrilhoEl) valorBrilhoEl.textContent = `${brilhoNum}%`;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", corValida);

  localStorage.setItem("cnm_cor_tema", corValida);
  localStorage.setItem("cnm_brilho", String(brilhoNum));
}

function carregarPreferenciasVisuais() {
  const corSalva = localStorage.getItem("cnm_cor_tema") || "#ef233c";
  const brilhoSalvo = localStorage.getItem("cnm_brilho") || "100";
  aplicarVisual(corSalva, brilhoSalvo);
}

if (corTemaEl) {
  corTemaEl.addEventListener("input", (e) => {
    aplicarVisual(e.target.value, controleBrilhoEl ? controleBrilhoEl.value : 100);
  });
}

if (controleBrilhoEl) {
  controleBrilhoEl.addEventListener("input", (e) => {
    aplicarVisual(corTemaEl ? corTemaEl.value : "#ef233c", e.target.value);
  });
}

document.querySelectorAll(".chip-cor").forEach((btn) => {
  btn.addEventListener("click", () => {
    aplicarVisual(btn.dataset.cor, controleBrilhoEl ? controleBrilhoEl.value : 100);
  });
});

if (btnResetVisualEl) {
  btnResetVisualEl.addEventListener("click", () => {
    aplicarVisual("#ef233c", 100);
  });
}

btnMenu.addEventListener("click", () => {
  menuGaveta.classList.toggle("oculto");
});

document.querySelectorAll(".menu-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const catEscolhida = btn.dataset.cat;
    menuGaveta.classList.add("oculto");
    navegarParaSecao(catEscolhida);
  });
});

btnTogglePost.addEventListener("click", () => {
  const senha = pedirSenhaAdmin();
  if (!senha) {
    alert("Acesso restrito ao administrador.");
    return;
  }
  const selectForm = document.getElementById("categoria");
  if (selectForm && categoriaEl.value !== "todas") {
    selectForm.value = categoriaEl.value;
  }
  painelPostEl.classList.remove("oculto");
  menuGaveta.classList.add("oculto");
  document.getElementById("titulo").focus();
});

btnFecharPost.addEventListener("click", () => {
  painelPostEl.classList.add("oculto");
});

function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderizarNoticias() {
  const termo = buscaEl.value.trim().toLowerCase();
  const cat = categoriaEl.value;
  const logado = estaLogadoAdmin();

  const filtradas = todasNoticias.filter((item) => {
    const bateCat = cat === "todas" || item.categoria === cat;
    const bateTexto =
      (item.titulo || "").toLowerCase().includes(termo) ||
      (item.resumo || "").toLowerCase().includes(termo) ||
      (item.categoria || "").toLowerCase().includes(termo);
    return bateCat && bateTexto;
  });

  if (filtradas.length === 0) {
    listaEl.innerHTML = "<p>Nenhuma notícia encontrada com esse filtro.</p>";
    return;
  }

  listaEl.innerHTML = filtradas
    .map((item, indice) => {
      const ehDestaque = indice === 0 && !termo;
      return `
      <article class="card-noticia ${ehDestaque ? "card-destaque" : ""}">
        <div>
          ${
            item.imagem
              ? `<img class="img-noticia" loading="lazy" src="${escaparHtml(item.imagem)}" alt="${escaparHtml(item.titulo)}" />`
              : ""
          }
          ${
            item.videoUrl && item.videoUrl.startsWith("/uploads/")
              ? `<video class="video-noticia" src="${escaparHtml(item.videoUrl)}" controls playsinline preload="metadata"></video>`
              : ""
          }
          <div class="card-corpo">
            <div class="card-meta">
              <div>
                <span class="chapeu">${escaparHtml(item.categoria || "Geral")}</span>
                ${ehDestaque ? `<span class="selo-manchete">Destaque</span>` : ""}
              </div>
              <span class="data-hora">${escaparHtml(item.data || "")}</span>
            </div>
            <h2 class="titulo-clicavel" onclick="abrirLeitura(${item.id})">${escaparHtml(item.titulo)}</h2>
            <p>${escaparHtml(item.resumo)}</p>
          </div>
        </div>
        <div class="card-rodape">
          <button class="btn-acao btn-ler" type="button" onclick="abrirLeitura(${item.id})">Ler matéria</button>
          ${
            item.videoUrl && !item.videoUrl.startsWith("/uploads/")
              ? `<a class="btn-acao btn-video" href="${escaparHtml(item.videoUrl)}" target="_blank" rel="noopener">Assistir vídeo</a>`
              : ""
          }
          <button class="btn-acao btn-compartilhar" type="button" onclick="compartilharNoticia(${item.id})">Compartilhar</button>
          ${
            logado
              ? `<button class="btn-acao btn-excluir" type="button" onclick="excluirNoticia(${item.id})">Excluir</button>`
              : ""
          }
        </div>
      </article>
    `;
    })
    .join("");
}

window.abrirLeitura = function (id) {
  const item = todasNoticias.find((n) => n.id === id);
  if (!item || !modalLeituraEl) return;

  modalCategoriaEl.textContent = item.categoria || "Geral";
  modalCorpoEl.innerHTML = `
    <span class="data-hora">${escaparHtml(item.data || "")}</span>
    <h2>${escaparHtml(item.titulo)}</h2>
    ${
      item.imagem
        ? `<img class="img-noticia" src="${escaparHtml(item.imagem)}" alt="${escaparHtml(item.titulo)}" />`
        : ""
    }
    ${
      item.videoUrl && item.videoUrl.startsWith("/uploads/")
        ? `<video class="video-noticia" src="${escaparHtml(item.videoUrl)}" controls playsinline preload="metadata"></video>`
        : ""
    }
    <p>${escaparHtml(item.resumo)}</p>
    <div class="card-rodape" style="padding:0;">
      ${
        item.videoUrl && !item.videoUrl.startsWith("/uploads/")
          ? `<a class="btn-acao btn-video" href="${escaparHtml(item.videoUrl)}" target="_blank" rel="noopener">Assistir vídeo</a>`
          : ""
      }
      <button class="btn-acao btn-compartilhar" type="button" onclick="compartilharNoticia(${item.id})">Compartilhar</button>
    </div>
  `;

  const relacionados = todasNoticias
    .filter((n) => n.id !== item.id)
    .slice(0, 3);

  modalRelacionadosEl.innerHTML = relacionados.length
    ? relacionados
        .map(
          (rel) => `
          <button type="button" class="relacionado-item" onclick="abrirLeitura(${rel.id})">
            <strong>${escaparHtml(rel.titulo)}</strong>
            <span>${escaparHtml(rel.categoria || "Geral")} • ${escaparHtml(rel.data || "")}</span>
          </button>
        `
        )
        .join("")
    : "<p class='data-hora'>Mais matérias em breve.</p>";

  modalLeituraEl.classList.remove("oculto");
  modalLeituraEl.scrollTop = 0;
};

if (btnFecharModalEl) {
  btnFecharModalEl.addEventListener("click", () => {
    modalLeituraEl.classList.add("oculto");
  });
}

if (modalLeituraEl) {
  modalLeituraEl.addEventListener("click", (e) => {
    if (e.target === modalLeituraEl) {
      modalLeituraEl.classList.add("oculto");
    }
  });
}

if (btnNovidadesEl) {
  btnNovidadesEl.addEventListener("click", () => {
    if (noticiasPendentes) {
      todasNoticias = noticiasPendentes;
      noticiasPendentes = null;
      btnNovidadesEl.classList.add("oculto");
      renderizarNoticias();
    }
  });
}

window.compartilharNoticia = async function (id) {
  const item = todasNoticias.find((n) => n.id === id);
  if (!item) return;

  const texto = `${item.titulo} — Canal News Mundo\n${item.resumo}${item.videoUrl ? `\n${item.videoUrl}` : ""}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: item.titulo, text: texto });
      return;
    } catch (_) {}
  }

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(texto);
    alert("Notícia copiada para compartilhar!");
  }
};

window.excluirNoticia = async function (id) {
  const senha = pedirSenhaAdmin();
  if (!senha) return;
  if (!confirm("Deseja realmente apagar esta notícia?")) return;

  try {
    const res = await fetch(`/api/noticias/${id}`, {
      method: "DELETE",
      headers: { "x-admin-senha": senha }
    });
    if (res.status === 401) {
      senhaSessao = "";
      sessionStorage.removeItem("cnm_senha_admin");
      atualizarInterfaceAdmin();
      alert("Senha incorreta.");
      return;
    }
    if (res.ok) {
      noticiasPendentes = null;
      if (btnNovidadesEl) btnNovidadesEl.classList.add("oculto");
      await carregarNoticias(true, true);
    }
  } catch (_) {
    alert("Não foi possível apagar agora.");
  }
};

async function carregarNoticias(silencioso = false, forcarRender = false) {
  try {
    const res = await fetch("/api/noticias", { cache: "no-store" });
    const dados = await res.json();
    const novoHash = JSON.stringify(dados);

    if (novoHash !== ultimoHash) {
      const primeiraCarga = ultimoHash === "";
      ultimoHash = novoHash;

      if (primeiraCarga || forcarRender || window.scrollY < 120) {
        todasNoticias = dados;
        noticiasPendentes = null;
        if (btnNovidadesEl) btnNovidadesEl.classList.add("oculto");
        renderizarNoticias();
      } else {
        noticiasPendentes = dados;
        if (btnNovidadesEl) btnNovidadesEl.classList.remove("oculto");
      }
    }

    if (statusTempoRealEl) {
      statusTempoRealEl.textContent = "● Servidor conectado";
    }
  } catch (err) {
    if (statusTempoRealEl) {
      statusTempoRealEl.textContent = "○ Servidor parado";
    }
    if (!silencioso) {
      listaEl.innerHTML = "<p>Não foi possível carregar as notícias agora.</p>";
    }
  }
}

function lerArquivoBase64(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = reject;
    leitor.readAsDataURL(arquivo);
  });
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const senha = pedirSenhaAdmin();
  if (!senha) {
    statusEl.textContent = "Senha obrigatória para publicar.";
    return;
  }

  statusEl.textContent = "Publicando em tempo real...";

  const titulo = document.getElementById("titulo").value;
  const categoria = document.getElementById("categoria").value;
  const resumo = document.getElementById("resumo").value;
  const videoUrl = document.getElementById("videoUrl").value;
  const videoArquivo = document.getElementById("videoArquivo").files[0];
  const imagemUrl = document.getElementById("imagemUrl").value;
  const arquivo = document.getElementById("imagemArquivo").files[0];

  let videoBase64 = "";
  let nomeVideo = "";

  if (videoArquivo) {
    videoBase64 = await lerArquivoBase64(videoArquivo);
    nomeVideo = videoArquivo.name;
  }

  let imagemBase64 = "";
  let nomeArquivo = "";

  if (arquivo) {
    imagemBase64 = await lerArquivoBase64(arquivo);
    nomeArquivo = arquivo.name;
  }

  try {
    const res = await fetch("/api/noticias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-senha": senha
      },
      body: JSON.stringify({
        titulo,
        categoria,
        resumo,
        videoUrl,
        videoBase64,
        nomeVideo,
        imagemUrl,
        imagemBase64,
        nomeArquivo
      })
    });

    const dados = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        senhaSessao = "";
        sessionStorage.removeItem("cnm_senha_admin");
        atualizarInterfaceAdmin();
      }
      statusEl.textContent = dados.erro || "Erro ao publicar.";
      return;
    }

    formEl.reset();
    statusEl.textContent = "Publicado e atualizado na tela!";
    await carregarNoticias(true, true);
    setTimeout(() => {
      statusEl.textContent = "";
      painelPostEl.classList.add("oculto");
    }, 1000);
  } catch (err) {
    statusEl.textContent = "Erro de conexão com o servidor.";
  }
});

buscaEl.addEventListener("input", () => {
  if (buscaEl.value.trim().toLowerCase() === "admin") {
    buscaEl.value = "";
    sessionStorage.setItem("cnm_ver_admin", "1");
    atualizarInterfaceAdmin();
    pedirSenhaAdmin();
    return;
  }
  renderizarNoticias();
});

categoriaEl.addEventListener("change", () => {
  navegarParaSecao(categoriaEl.value);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

const secaoInicial = obterSecaoDaUrl();
if (categoriaEl) {
  categoriaEl.value = secaoInicial;
}

carregarPreferenciasVisuais();
atualizarInterfaceAdmin();
carregarNoticias();
setInterval(() => carregarNoticias(true), 4000);
