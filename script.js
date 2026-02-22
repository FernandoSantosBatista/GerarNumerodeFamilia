function gerarCodigo() {
  const areaInput = document.getElementById("area").value.trim();
  const casaInput = document.getElementById("casa").value.trim();

  if (!areaInput || !casaInput) {
    mostrarMensagem("Preencha a área e o número da casa", "erro");
    return;
  }

  const areaLimpa = areaInput.replace(/\D/g, '');
  const casaLimpa = casaInput.replace(/\D/g, '');

  if (!areaLimpa || !casaLimpa) {
    mostrarMensagem("Digite apenas números para área e casa", "erro");
    return;
  }

  const area = areaLimpa;   // ou .padStart(3, "0") se quiser fixo
  const casa = casaLimpa;   // ou .padStart(4, "0")

  const agora = new Date();

  // Novo formato: DD MM AA AA (sem separadores)
  const dataHora =
    String(agora.getDate()).padStart(2, "0") +          // dia
    String(agora.getMonth() + 1).padStart(2, "0") +     // mês
    agora.getFullYear();                                // ano completo

  const codigo = dataHora + area + casa;

  document.getElementById("resultado").innerHTML = `
    <div class="codigo-gerado">${codigo}</div>
  `;

  mostrarMensagem("Código gerado com sucesso!", "sucesso");

  // Mostra ou atualiza o botão de copiar
  let btnCopiar = document.getElementById("btnCopiar");
  if (!btnCopiar) {
    btnCopiar = document.createElement("button");
    btnCopiar.id = "btnCopiar";
    btnCopiar.innerText = "Copiar Código";
    btnCopiar.className = "btn-copiar";
    btnCopiar.onclick = () => copiarCodigo(codigo, btnCopiar);
    document.querySelector(".container").appendChild(btnCopiar);
  } else {
    btnCopiar.innerText = "Copiar Código";
    btnCopiar.disabled = false;
  }
}

function copiarCodigo(codigo, botao) {
  navigator.clipboard.writeText(codigo)
    .then(() => {
      botao.innerText = "Copiado!";
      botao.style.background = "#2e7d32";
      setTimeout(() => {
        botao.innerText = "Copiar Código";
        botao.style.background = "#2196F3";
      }, 2000);
    })
    .catch(err => {
      console.error("Erro ao copiar:", err);
      mostrarMensagem("Não foi possível copiar automaticamente", "erro");
    });
}

function mostrarMensagem(texto, tipo) {
  const msgEl = document.getElementById("mensagem");
  msgEl.innerText = texto;
  msgEl.className = "mensagem " + tipo;

  // Remove a mensagem depois de 4 segundos
  setTimeout(() => {
    msgEl.innerText = "";
    msgEl.className = "mensagem";
  }, 4000);
}
