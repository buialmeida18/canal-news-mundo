const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;
const SENHA_ADMIN = process.env.CNM_SENHA || "Brasil@123321";

const DB_FILE = path.join(__dirname, "noticias.json");
const UPLOADS_DIR = path.join(__dirname, "public", "uploads");
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(express.json({ limit: "80mb" }));
app.use(express.static(PUBLIC_DIR));

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function exigirSenha(req, res, next) {
  const senhaEnviada = req.headers["x-admin-senha"] || "";
  if (senhaEnviada !== SENHA_ADMIN) {
    return res.status(401).json({ erro: "Senha de administrador incorreta." });
  }
  next();
}

function formatarDataHora() {
  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR");
  const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${data} ${hora}`;
}

function lerNoticias() {
  if (!fs.existsSync(DB_FILE)) {
    const iniciais = [
      {
        id: 1,
        categoria: "Mundo",
        titulo: "Canal News Mundo agora tem visual de portal e atualização em tempo real",
        resumo: "Publique notícias, matérias, fotos e vídeos direto pela tela sem editar código.",
        data: formatarDataHora(),
        imagem: "",
        videoUrl: "https://www.tiktok.com/@canalnewsmundo"
      }
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(iniciais, null, 2));
    return iniciais;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function salvarNoticias(lista) {
  fs.writeFileSync(DB_FILE, JSON.stringify(lista, null, 2));
}

const paginasSecao = ["/mundo", "/esportes", "/tecnologia", "/geral"];
paginasSecao.forEach((rota) => {
  app.get(rota, (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
  });
});

app.get("/gerar-icone", (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gerar Ícone — Canal News Mundo</title>
  <style>
    body {
      background: #0b0d12;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 20px;
    }
    canvas {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      box-shadow: 0 12px 30px rgba(0,0,0,0.65);
    }
    button {
      background: #ef233c;
      color: #fff;
      border: none;
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
    p {
      max-width: 360px;
      text-align: center;
      font-size: 0.95rem;
      color: #e5e7eb;
    }
  </style>
</head>
<body>
  <h2>Ícone Redondo — Canal News Mundo</h2>
  <canvas id="tela" width="512" height="512"></canvas>
  <button id="btn-salvar" type="button">Salvar Ícones PNG (512 e 192)</button>
  <p id="msg">Prévia com faixa vermelha NEWS, globo da Terra em marca d'água no preto e bordas coloridas.</p>

  <script>
    const canvas = document.getElementById("tela");
    const ctx = canvas.getContext("2d");

    function desenharIcone() {
      ctx.clearRect(0, 0, 512, 512);

      const gradBorda = ctx.createLinearGradient(0, 0, 512, 512);
      gradBorda.addColorStop(0, "#ef233c");
      gradBorda.addColorStop(0.35, "#f59e0b");
      gradBorda.addColorStop(0.7, "#22c55e");
      gradBorda.addColorStop(1, "#3b82f6");

      // Recorte circular do ícone
      ctx.save();
      ctx.beginPath();
      ctx.arc(256, 256, 236, 0, Math.PI * 2);
      ctx.clip();

      // Fundo preto principal
      ctx.fillStyle = "#090b10";
      ctx.fillRect(0, 0, 512, 512);

      // Globo da Terra como marca d'água dentro da área preta
      ctx.save();
      const gx = 256;
      const gy = 308;
      const gr = 128;

      const gradTerra = ctx.createRadialGradient(gx - 30, gy - 35, 15, gx, gy, gr);
      gradTerra.addColorStop(0, "rgba(59, 130, 246, 0.28)");
      gradTerra.addColorStop(0.65, "rgba(34, 197, 94, 0.16)");
      gradTerra.addColorStop(1, "rgba(15, 23, 42, 0.22)");

      ctx.fillStyle = gradTerra;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Meridianos e paralelos do globo
      ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(gx, gy, 64, gr, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(gx - gr, gy);
      ctx.lineTo(gx + gr, gy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(gx - 102, gy - 64);
      ctx.quadraticCurveTo(gx, gy - 36, gx + 102, gy - 64);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(gx - 102, gy + 64);
      ctx.quadraticCurveTo(gx, gy + 36, gx + 102, gy + 64);
      ctx.stroke();

      // Silhuetas estilizadas tipo continentes em marca d'água
      ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
      ctx.beginPath();
      ctx.ellipse(gx - 35, gy - 22, 30, 20, -0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(gx + 38, gy + 24, 34, 24, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Faixa vermelha superior com o nome NEWS
      ctx.fillStyle = "#ef233c";
      ctx.fillRect(0, 0, 512, 168);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 72px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NEWS", 256, 92);

      ctx.restore();

      // Bordas coloridas ao redor do círculo
      ctx.strokeStyle = gradBorda;
      ctx.lineWidth = 22;
      ctx.beginPath();
      ctx.arc(256, 256, 236, 0, Math.PI * 2);
      ctx.stroke();
    }

    desenharIcone();

    document.getElementById("btn-salvar").addEventListener("click", async () => {
      const msg = document.getElementById("msg");
      msg.textContent = "Salvando ícones PNG no servidor...";

      const icon512 = canvas.toDataURL("image/png");

      const mini = document.createElement("canvas");
      mini.width = 192;
      mini.height = 192;
      const mctx = mini.getContext("2d");
      mctx.drawImage(canvas, 0, 0, 192, 192);
      const icon192 = mini.toDataURL("image/png");

      const res = await fetch("/api/salvar-icone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ icon512, icon192 })
      });

      if (res.ok) {
        msg.textContent = "Ícones salvos! Remova os atalhos antigos da tela inicial e adicione novamente pela página principal (/).";
      } else {
        msg.textContent = "Erro ao salvar os ícones no servidor.";
      }
    });
  </script>
</body>
</html>`);
});

app.post("/api/salvar-icone", (req, res) => {
  try {
    const { icon512, icon192 } = req.body || {};
    if (!icon512 || !icon192) {
      return res.status(400).json({ erro: "Dados dos ícones ausentes." });
    }
    const b512 = icon512.replace(/^data:image\/png;base64,/, "");
    const b192 = icon192.replace(/^data:image\/png;base64,/, "");

    fs.writeFileSync(path.join(PUBLIC_DIR, "icon-512.png"), Buffer.from(b512, "base64"));
    fs.writeFileSync(path.join(PUBLIC_DIR, "icon-192.png"), Buffer.from(b192, "base64"));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao gravar PNGs." });
  }
});

app.get("/api/noticias", (req, res) => {
  res.json(lerNoticias());
});

app.post("/api/noticias", exigirSenha, (req, res) => {
  const { titulo, categoria, resumo, videoUrl, videoBase64, nomeVideo, imagemUrl, imagemBase64, nomeArquivo } = req.body;

  if (!titulo || !resumo) {
    return res.status(400).json({ erro: "Preencha pelo menos o título e a matéria." });
  }

  let imagemFinal = imagemUrl ? imagemUrl.trim() : "";

  if (imagemBase64 && nomeArquivo) {
    const ext = path.extname(nomeArquivo).toLowerCase() || ".jpg";
    const permitidas = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const extSegura = permitidas.includes(ext) ? ext : ".jpg";
    const nomeLimpo = `img-${Date.now()}${extSegura}`;
    const base64Limpo = imagemBase64.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(path.join(UPLOADS_DIR, nomeLimpo), Buffer.from(base64Limpo, "base64"));
    imagemFinal = `/uploads/${nomeLimpo}`;
  }

  let videoFinal = videoUrl ? videoUrl.trim() : "";

  if (videoBase64 && nomeVideo) {
    const extVid = path.extname(nomeVideo).toLowerCase() || ".mp4";
    const permitidasVid = [".mp4", ".webm", ".mov", ".m4v"];
    const extVidSegura = permitidasVid.includes(extVid) ? extVid : ".mp4";
    const nomeVidLimpo = `vid-${Date.now()}${extVidSegura}`;
    const base64VidLimpo = videoBase64.replace(/^data:video\/[\w.+-]+;base64,/, "");
    fs.writeFileSync(path.join(UPLOADS_DIR, nomeVidLimpo), Buffer.from(base64VidLimpo, "base64"));
    videoFinal = `/uploads/${nomeVidLimpo}`;
  }

  const noticias = lerNoticias();
  const nova = {
    id: Date.now(),
    categoria: categoria || "Geral",
    titulo: titulo.trim(),
    resumo: resumo.trim(),
    data: formatarDataHora(),
    imagem: imagemFinal,
    videoUrl: videoFinal
  };

  noticias.unshift(nova);
  salvarNoticias(noticias);

  res.status(201).json(nova);
});

app.delete("/api/noticias/:id", exigirSenha, (req, res) => {
  const idAlvo = Number(req.params.id);
  const noticias = lerNoticias();
  const removida = noticias.find((item) => item.id === idAlvo);

  if (!removida) {
    return res.status(404).json({ erro: "Notícia não encontrada." });
  }

  if (removida.imagem && removida.imagem.startsWith("/uploads/")) {
    const caminhoImg = path.join(PUBLIC_DIR, removida.imagem);
    if (fs.existsSync(caminhoImg)) {
      fs.unlinkSync(caminhoImg);
    }
  }

  if (removida.videoUrl && removida.videoUrl.startsWith("/uploads/")) {
    const caminhoVid = path.join(PUBLIC_DIR, removida.videoUrl);
    if (fs.existsSync(caminhoVid)) {
      fs.unlinkSync(caminhoVid);
    }
  }

  const restantes = noticias.filter((item) => item.id !== idAlvo);
  salvarNoticias(restantes);
  res.json({ ok: true });
});


const ESP_LIVE_FILE = path.join(__dirname, "esportes_live.json");
const lerEspLive = () => {
  try {
    if (fs.existsSync(ESP_LIVE_FILE)) return JSON.parse(fs.readFileSync(ESP_LIVE_FILE, "utf8"));
  } catch (e) {}
  return { url: "", liberado: false, links: [{ nome: "YouTube", url: "https://www.youtube.com/live" }, { nome: "TikTok", url: "https://www.tiktok.com/@canalnewsmundo" }, { nome: "TV Ao Vivo", url: "https://www.youtube.com/live/L_sWm8l" }] };
};
app.get("/api/esportes-live", (req, res) => res.json(lerEspLive()));
app.post("/api/esportes-live", (req, res) => {
  const atual = lerEspLive();
  const body = req.body || {};
  const proximo = {
    url: typeof body.url === "string" ? body.url.trim() : atual.url,
    liberado: typeof body.liberado === "boolean" ? body.liberado : atual.liberado,
    links: Array.isArray(body.links) ? body.links : atual.links
  };
  fs.writeFileSync(ESP_LIVE_FILE, JSON.stringify(proximo, null, 2), "utf8");
  res.json(proximo);
});


app.get("/tv-esporte", (req, res) => res.sendFile(require("path").join(__dirname, "public", "tv-esporte.html")));

app.get("/tv-sport", (req, res) => res.sendFile(require("path").join(__dirname, "public", "tv-sport.html")));
app.listen(PORT, () => {
  console.log(`Canal News Mundo rodando em http://localhost:${PORT}`);
});
