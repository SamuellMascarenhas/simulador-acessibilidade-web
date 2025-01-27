# Simulador de Acessibilidade Web

Este projeto tem como objetivo desenvolver um simulador de acessibilidade que permite testar e analisar sites externos quanto à sua conformidade com as melhores práticas de acessibilidade. O simulador oferece várias funcionalidades para simular diferentes tipos de deficiências visuais e analisar a estrutura de acessibilidade dos sites.

## Funcionalidades Principais

### 1. Campo para Inserir URL:
- O usuário insere um link de um site que deseja testar.
- O site é carregado em um **iframe** (se permitido pela política de segurança do site).

### 2. Aplicação de Filtros:
- **Daltonismo**:
  - Protanopia (deficiência no espectro vermelho).
  - Deuteranopia (deficiência no espectro verde).
  - Tritanopia (deficiência no espectro azul).
- **Baixa visão**:
  - Desfoque de imagem.
  - Contraste reduzido.
- **Simulação de Cegueira Total**:
  - Modo leitor de tela para simulação de cegueira total.

### 3. Análise de Contraste e Estrutura de Acessibilidade:
- **Validação do contraste de cores**:
  - Checagem de contraste entre o texto e o fundo.
- **Checagem de atributos alt em imagens**:
  - Verificação da presença de texto alternativo para imagens.
- **Verificação de estrutura semântica**:
  - Avaliação do uso correto de elementos como `<h1>`, `<nav>`, e `<button>`.

### 4. Relatórios e Sugestões:
- **Relatório sobre problemas detectados**:
  - Exemplo: falta de contraste, falta de rótulos ARIA, entre outros.
- **Sugestões de correção**:
  - Dicas e recomendações para melhorar a acessibilidade do site.

## Tecnologias Utilizadas

- **HTML/CSS**: Para construir a interface da aplicação.
- **JavaScript (DOM manipulation)**: Para aplicar filtros e interagir com o site carregado.
- **iframe**: Para exibir a página externa (se possível).
- **Canvas API**: Para aplicar filtros visuais personalizados.
- **Lighthouse API (opcional)**: Para gerar relatórios automáticos de acessibilidade.
- **CORS Proxy (se necessário)**: Para contornar restrições de segurança ao carregar sites em iframes.

## Desafios Técnicos e Soluções Possíveis

### 1. Política de Segurança (X-Frame-Options)
- Alguns sites não permitem serem carregados em iframes devido a restrições de segurança.
- **Solução**: Criar uma extensão de navegador ou usar um servidor proxy para contornar essas restrições.

### 2. Manipulação de DOM Externo
- Sites externos podem bloquear tentativas de manipulação via JavaScript.
- **Solução**: Utilizar a API de análise (como o **Lighthouse**) e criar uma interface amigável para exibir os resultados sem necessidade de manipular diretamente o conteúdo do site.
