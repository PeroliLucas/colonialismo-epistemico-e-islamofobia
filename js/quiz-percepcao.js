let perguntas = [];
let indiceAtual = 0;

const textoPergunta = document.getElementById("texto-pergunta");
const botoes = document.querySelectorAll(".opcao");
const contador = document.getElementById("contador");
const feedback = document.getElementById("feedback");
const explicacaoEl = document.getElementById("explicacao");
const botaoProxima = document.getElementById("proxima");

/* ==============================
   CARREGAR PERGUNTAS
============================== */

fetch("../../data/perguntas.json")
  .then(res => res.json())
  .then(dados => {
    perguntas = dados;
    iniciarQuiz();
  })
  .catch(err => {
    textoPergunta.innerText = "Erro ao carregar o quiz.";
    console.error(err);
  });

/* ==============================
   INICIAR QUIZ
============================== */

function iniciarQuiz() {
  indiceAtual = 0;
  mostrarPergunta();
}

/* ==============================
   MOSTRAR PERGUNTA
============================== */

function mostrarPergunta() {
  const pergunta = perguntas[indiceAtual];

  textoPergunta.innerText = pergunta.texto;
  contador.innerText = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

  feedback.classList.add("oculto");

  botoes.forEach(botao => {
    botao.classList.remove("selecionada");
    botao.disabled = false;
  });
}

/* ==============================
   SELEÇÃO DE RESPOSTA
============================== */

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    const respostaUsuario = botao.dataset.resposta;
    const respostaEsperada = perguntas[indiceAtual].categoria;

    botoes.forEach(b => b.disabled = true);
    botao.classList.add("selecionada");

    mostrarFeedback(respostaUsuario, respostaEsperada);
  });
});

/* ==============================
   FEEDBACK INTELIGENTE
============================== */

function mostrarFeedback(respostaUsuario, respostaEsperada) {
  let introducao = "";

  if (respostaEsperada === "metamanchete") {
    introducao = "Aqui, a proposta não é classificar a manchete.";
  } else if (respostaUsuario === respostaEsperada) {
    introducao = "Essa leitura é possível — e faz sentido dentro de uma análise crítica.";
  } else {
    introducao = "Muita gente faria essa mesma leitura. Isso revela como certos enquadramentos foram naturalizados.";
  }

  explicacaoEl.innerHTML = `
    <strong>${introducao}</strong><br><br>
    ${perguntas[indiceAtual].explicacao}
  `;

  feedback.classList.remove("oculto");
}

/* ==============================
   PRÓXIMA PERGUNTA
============================== */

botaoProxima.addEventListener("click", () => {
  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarQuiz();
  }
});

/* ==============================
   FINAL DO QUIZ
============================== */

function finalizarQuiz() {
  textoPergunta.innerHTML = `
    <strong>Quiz concluído.</strong><br><br>
    Se algumas manchetes pareceram difíceis de classificar,
    isso não é um erro — é parte do exercício crítico.
  `;

  document.querySelector(".alternativas").style.display = "none";
  feedback.classList.remove("oculto");

  explicacaoEl.innerHTML = `
    Ao longo do quiz, você analisou como escolhas linguísticas
    moldam percepções sobre o Islã e pessoas muçulmanas.<br><br>
    Desenvolver leitura crítica da mídia é perceber
    que narrativas não apenas informam — elas formam sentidos.
  `;

  botaoProxima.style.display = "none";
  contador.innerText = "Reflexão final";
}
