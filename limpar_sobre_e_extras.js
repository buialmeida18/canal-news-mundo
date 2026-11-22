const fs = require("fs");
const f = "public/index.html";
let h = fs.readFileSync(f, "utf8");

// Remove estilos e blocos adicionados de sobre, modal, rodape extra e scripts correspondentes
h = h
  .replace(/<style id="(cnm-infos-pro-style|cnm-fix-modal-pos-style|cnm-sobre-pagina-style|cnm-secao-padrao-style|cnm-sobre-interativo-style)">[\s\S]*?<\/style>/g, "")
  .replace(/<(div|section|script) id="(cnm-sobre-modal|cnm-pagina-sobre|cnm-secao-sobre|cnm-sobre-interativo-js|cnm-sobre-lista-js|cnm-infos-pro-js|cnm-fix-modal-pos-js|cnm-sobre-pagina-js|cnm-secao-padrao-js)">[\s\S]*?<\/\1>/g, "")
  .replace(/<div class="cnm-rodape-final">[\s\S]*?<\/div><\/div>/g, "")
  .replace(/<div class="cnm-info-interativa">[\s\S]*?<\/div><\/div>/g, "");

fs.writeFileSync(f, h, "utf8");
console.log("Blocos extras de Sobre e rodape removidos com sucesso!");
