// Variável global para guardar o último código gerado
let ultimoCodigo = "";

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

  const area = areaLimpa;
  const casa = casaLimpa;

  const agora = new Date();

  const dataHora =
    String(agora.getDate()).padStart(2, "0") +
    String(agora.getMonth() + 1).padStart(2, "0") +
    String(agora.getFullYear()) +
    String(agora.getHours()).padStart(2, "0") +
    String(agora.getMinutes()).padStart(2, "0");

  const codigo = dataHora + area + casa;
  ultimoCodigo = codigo;  // ← salva o código atual aqui

  // Mostra o resultado formatado
  document.getElementById("resultado").innerHTML = `
    <div class="codigo-formatado">
      ${codigo.slice(0,2)}/${codigo.slice(2,4)}/${codigo.slice(4,8)}-${codigo.slice(8,10)}:${codigo.slice(10,12)}-${codigo.slice(12,14)}-${codigo.slice(14)}
    </div>
  `;

  mostrarMensagem("Código gerado com sucesso!", "sucesso");

  // Cria ou atualiza o botão
  let btnCopiar = document.getElementById("btnCopiar");
  if (!btnCopiar) {
    btnCopiar = document.createElement("button");
    btnCopiar.id = "btnCopiar";
    btnCopiar.innerText = "Copiar Código";
    btnCopiar.className = "btn-copiar";
    
    // Evento fixo que sempre usa o valor mais recente
    btnCopiar.onclick = () => copiarCodigo(ultimoCodigo, btnCopiar);
    
    document.querySelector(".container").appendChild(btnCopiar);
  } else {
    btnCopiar.innerText = "Copiar Código";
    btnCopiar.disabled = false;
    // Não precisa recriar o onclick – ele já usa ultimoCodigo
  }
}

function copiarCodigo(codigo, botao) {
  if (!codigo) {
    mostrarMensagem("Nenhum código para copiar", "erro");
    return;
  }

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
      mostrarMensagem("Não foi possível copiar", "erro");
    });
}

// função mostrarMensagem continua igual...

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
