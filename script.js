// Função para mostrar mensagens de feedback
function mostrarFeedback(mensagem, tipo = "sucesso") {
  const feedbackDiv = document.getElementById("feedbackMsg");
  feedbackDiv.textContent = mensagem;
  feedbackDiv.classList.remove("sucesso", "erro");
  feedbackDiv.classList.add(tipo);
  feedbackDiv.style.display = "block";

  setTimeout(() => {
    feedbackDiv.style.display = "none";
  }, 3000); // Mensagem desaparece após 3 segundos
}

// Função para carregar o site no iframe
function carregarSite() {
  const url = document.getElementById("urlInput").value.trim();
  const iframe = document.getElementById("siteFrame");
  const loading = document.getElementById("loading");
  const carregarBtn = document.getElementById("carregarBtn");

  if (!url) {
    mostrarFeedback("Por favor, insira uma URL válida.", "erro");
    return;
  }

  // Exibir loading e desabilitar botão
  loading.style.display = "block";
  carregarBtn.disabled = true;
  document.getElementById("initialImage").style.display = "none"; // Oculta a imagem de acessibilidade
  iframe.style.display = "none";

  iframe.onload = function () {
    loading.style.display = "none";
    iframe.style.display = "block";
    mostrarFeedback("Site carregado com sucesso!", "sucesso");
    carregarBtn.disabled = false;

    // Habilita os controles após carregamento
    habilitarControles(true);
  };

  iframe.onerror = function () {
    loading.style.display = "none";
    mostrarFeedback("Erro ao carregar o site. Verifique a URL.", "erro");
    carregarBtn.disabled = false;

    // Desabilita os controles em caso de erro
    habilitarControles(false);
  };

  iframe.src = url;
}

// Função para habilitar ou desabilitar os botões de controle
function habilitarControles(ativar) {
  const botoes = document.querySelectorAll("#controles button");
  botoes.forEach((botao) => {
    botao.disabled = !ativar;
  });
}

// Função para aplicar os filtros de acessibilidade
function aplicarFiltro(tipoFiltro) {
  const iframe = document.getElementById("siteFrame");
  if (!iframe.src) {
    mostrarFeedback("Por favor, carregue um site primeiro.", "erro");
    return;
  }

  switch (tipoFiltro) {
    case "daltonismo":
      iframe.style.filter = "grayscale(100%)";
      break;
    case "baixa-visao":
      iframe.style.filter = "blur(4px) contrast(0.7)";
      break;
    case "cegueira":
      iframe.style.visibility = "hidden";
      break;
  }
  mostrarFeedback(`Filtro ${tipoFiltro} aplicado!`, "sucesso");
}

// Função para resetar os filtros
function resetarFiltro() {
  const iframe = document.getElementById("siteFrame");
  if (!iframe.src) {
    mostrarFeedback("Por favor, carregue um site primeiro.", "erro");
    return;
  }

  iframe.style.filter = "none";
  iframe.style.visibility = "visible";
  mostrarFeedback("Filtros resetados.", "sucesso");
}

// Função para gerar o relatório de acessibilidade
function gerarRelatorio() {
  const iframe = document.getElementById("siteFrame");
  if (!iframe.src) {
    mostrarFeedback("Por favor, carregue um site primeiro.", "erro");
    return;
  }

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  if (!iframeDoc) {
    mostrarFeedback(
      "Erro: Não foi possível acessar o conteúdo do site.",
      "erro"
    );
    return;
  }

  let relatorio = "";

  // Simulação de verificação de contraste
  const problemasDeContraste = verificarContraste(iframeDoc);
  relatorio += `<p><strong>Problemas de Contraste:</strong> ${problemasDeContraste.length} encontrado(s).</p>`;

  // Simulação de verificação de imagens sem ALT
  const imagensSemAlt = verificarImagensAlt(iframeDoc);
  relatorio += `<p><strong>Imagens sem ALT:</strong> ${imagensSemAlt.length} encontrada(s).</p>`;

  // Exibindo o relatório
  document.getElementById("conteudoRelatorio").innerHTML = relatorio;
  document.getElementById("secaoRelatorio").style.display = "block";
  mostrarFeedback("Relatório gerado com sucesso!", "sucesso");
}

// Simulação das funções de verificação
function verificarContraste(doc) {
  // Simulação: retorna elementos aleatórios como problema
  return doc.querySelectorAll("p, h1, h2").length > 5
    ? ["Problema encontrado"]
    : [];
}

function verificarImagensAlt(doc) {
  return Array.from(doc.querySelectorAll("img")).filter((img) => !img.alt);
}

// Inicialmente, desabilitar os controles
habilitarControles(false);
