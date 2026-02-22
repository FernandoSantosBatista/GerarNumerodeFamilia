function gerarCodigo() {
  const areaInput = document.getElementById("area").value.trim();
  const casaInput = document.getElementById("casa").value.trim();

  if (!areaInput || !casaInput) {
    mostrarMensagem("Preencha a área e o número da casa", "erro");
    return;
  }

  // Remove qualquer caractere que não seja número
  const areaLimpa = areaInput.replace(/\D/g, '');
  const casaLimpa = casaInput.replace(/\D/g, '');

  if (!areaLimpa || !casaLimpa) {
    mostrarMensagem("Digite apenas números para área e casa", "erro");
    return;
  }

  // Escolha o padding desejado (descomente a opção que preferir)
  
  // Opção 1: sem padding fixo (mais flexível)
  const area = areaLimpa;
  const casa = casaLimpa;

  // Opção 2: área com 3 dígitos, casa com 4 dígitos (com zeros à esquerda)
  // const area = areaLimpa.padStart(3, "0");
  // const casa = casaLimpa.padStart(4, "0");

  const agora = new Date();

  // Formato solicitado: DDMMAAAAHHMM
  const dataHora =
    String(agora.getDate()).padStart(2, "0") +                // dia
    String(agora.getMonth() + 1).padStart(2, "0") +           // mês
    String(agora.getFullYear()) +                             // ano com 4 dígitos
    String(agora.getHours()).padStart(2, "0") +               // hora
    String(agora.getMinutes()).padStart(2, "0");              // minutos

  const codigo = dataHora + area + casa;

  // Mostra o resultado
  document.getElementById("resultado").innerHTML = `
    <div class="codigo-gerado">${codigo}</div>
  `;

  mostrarMensagem("Código gerado com sucesso!", "sucesso");

  // Botão de copiar (mantido igual)
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
