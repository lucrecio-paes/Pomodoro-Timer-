// Acessa input Ação
let acao = document.getElementById("acao");
// acessa input pausa
let pausa = document.getElementById("pausa");
//acessa input sessões
let sessoes = document.getElementById("sessoes");

let segundos;

//acessa audios
var bell = new Audio("./audio/bell.mp3");
var volta = new Audio("./audio/volta.mp3");
var final = new Audio("./audio/final.mp3");

//acessa lofi e botões de controle pause e play
var lofi = document.getElementById("lofi");
var pause = document.getElementById("pause");
var play = document.getElementById("play");

//função para pausa a musica tirar o botão pause e colocar o play
function pausar() {
  lofi.pause();
  play.style.setProperty("display", "block", "important");
  pause.style.setProperty("display", "none", "important");
}
// Função para tocar a musica tirar o botão play e colocar o pause
function executar() {
  lofi.play();
  play.style.setProperty("display", "none", "important");
  pause.style.setProperty("display", "block", "important");
}

//função para iniciar a contagem
function iniciar() {
  //verifica se os campos ação pausa e sessões estão preenchidos
  if (acao.value <= 0) {
    document.getElementById("erro_acao").innerHTML = "Adicione os minutos";
    acao.focus();
  } else if (pausa.value <= 0) {
    document.getElementById("erro_pausa").innerHTML = "Adicione a pausa";
    pausa.focus();
  } else if (sessoes.value <= 0) {
    document.getElementById("erro_sessoes").innerHTML = "Adicione as sessões";
    sessoes.focus();
  } else {
    // tocar a musica
    lofi.play();
    //mostrar o botão pausa
    pause.style.setProperty("display", "block", "important");

    //adicionar em forma de string os valores dos inputs no LocalStorage
    localStorage.setItem("acao", String(acao.value));
    localStorage.setItem("pausa", String(pausa.value));
    localStorage.setItem("sessoes", String(sessoes.value));

    //esconder a div de config (inputs e botão iniciar)
    document
      .getElementById("config")
      .style.setProperty("display", "none", "important");

    //mostrar div timer, com titulo relogio e quantidade de sessões
    document
      .getElementById("timer")
      .style.setProperty("display", "block", "important");

    momentoAcao();
  }
}

// função para contar o tempo determinado no input ação

function momentoAcao() {
  //pega o valor das sessões no localStorage e coloca na varial sessoes_valor
  let sessoes_valor = localStorage.getItem("sessoes");

  //verifica se a sessoes_valor é diferente de 1
  if (sessoes_valor != "1") {
    document.getElementById("title_sessao").innerHTML =
      sessoes_valor + " sessões restantes";
  } else {
    document.getElementById("title_sessao").innerHTML =
      sessoes_valor + " sessão restante";
  }

  let title = document.getElementById("title");
  title.innerHTML = "AÇÂO! FOQUE NA SUA TAREFA!";
  title.style.fontSize = "25pt";
  title.style.fontWeight = "bold";
  title.style.setProperty("color", "#28a745", "important");

  //pega o valor de acao do localStorage, ja convertendo para Number e adicionando a variavel sessoes_valor

  min = Number(localStorage.getItem("acao"));

  // o valor inicia com menos 1
  min = min - 1;

  //os segundos iniciam com 59
  segundos = 59;

  // adiciona o valor de min ao h2 que contem a tag minutes_ok

  document.getElementById("minutes_ok").innerHTML = min;
  // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
  document.getElementById("seconds_ok").innerHTML = segundos;

  // Adiciona a variável min_interval a função setInterval que vai execultar a função minTimer de 60 em 60 segundos
  var min_interval = setInterval(minTimer, 60000);
  // Adiciona a variável seg_interval a função setInterval que vai execultar a função segTimer de 1 em 1 segundo
  var seg_interval = setInterval(segTimer, 1000);

  // Função que será execultada de 60 em 60 segundos
  function minTimer() {
    // Durante essa execução o valor de min diminuira 1
    min = min - 1;
    // Adiciona o valor de min ao h2 que contem a tag minutes_ok
    document.getElementById("minutes_ok").innerHTML = min;
  }

  // Função que será execultada de 1 em 1 segundo
  function segTimer() {
    // Durante essa execução o valor de segundos diminuira 1
    segundos = segundos - 1;
    // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
    document.getElementById("seconds_ok").innerHTML = segundos;

    // Verificação se o valor de segundos é menor ou igual a 0
    if (segundos <= 0) {
      // Verificação se o valor de min é menor ou igual a 0
      if (min <= 0) {
        // Se acabar os minutos, o intervalo min_interval e seg_interval será parado e limpo
        clearInterval(min_interval);
        clearInterval(seg_interval);

        // Som bell será executado
        bell.play();

        // Função momentoPausa é acionada
        momentoPausa();
      }

      // Se não acabar os minutos a variável segundos recebe mais 60 segundos e começa os intervalos de novo.
      segundos = 60;
    }
  }
}

// Função para contar o tempo determinado no input de pausa
function momentoPausa() {
  // Aciona a tag h3 que possui o id 'title'
  let title = document.getElementById("title");
  // Adiciona o valor 'PAUSA' ao HTML
  title.innerHTML = "PAUSA";
  // Muda o tamanho da fonte para 25pt
  title.style.fontSize = "25pt";
  // Muda a grossura do texto para bold
  title.style.fontWeight = "bold";
  // Muda a cor do texto para vermelha (#dc3545)
  title.style.setProperty("color", "#dc3545", "important");

  // Pega o valor de pausa do localStorage, já convertendo para Number e adicionando a variável min_pausa
  min_pausa = Number(localStorage.getItem("pausa"));

  // O valor já incia com menos 1
  min_pausa = min_pausa - 1;
  // Os seguntos iniciam com 59
  segundos = 59;

  // Adiciona o valor de min_pausa ao h2 que contem a tag minutes_ok
  document.getElementById("minutes_ok").innerHTML = min_pausa;
  // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
  document.getElementById("seconds_ok").innerHTML = segundos;

  // Adiciona a variável min_interval a função setInterval que vai execultar a função minTimer de 60 em 60 segundos
  var min_interval = setInterval(minTimer, 60000);
  // Adiciona a variável seg_interval a função setInterval que vai execultar a função segTimer de 1 em 1 segundo
  var seg_interval = setInterval(segTimer, 1000);

  // Função que será execultada de 60 em 60 segundos
  function minTimer() {
    // Durante essa execução o valor de min_pausa diminuira 1
    min_pausa = min_pausa - 1;
    // Adiciona o valor de min ao h2 que contem a tag minutes_ok
    document.getElementById("minutes_ok").innerHTML = min_pausa;
  }

  // Função que será execultada de 1 em 1 segundo
  function segTimer() {
    // Durante essa execução o valor de segundos diminuira 1
    segundos = segundos - 1;
    // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
    document.getElementById("seconds_ok").innerHTML = segundos;

    // Verificação se o valor de segundos é menor ou igual a 0
    if (segundos <= 0) {
      // Verificação se o valor de min é menor ou igual a 0
      if (min_pausa <= 0) {
        // Se acabar os minutos, pegar o valor de sessões que está no localStorage já convertendo para number e adicionando a variável ses
        ses = Number(localStorage.getItem("sessoes"));
        // Diminumindo o valor de sessões com menos 1
        ses = ses - 1;
        // Devonvendo para o localStorage o valor atualizado em forma de String.
        localStorage.setItem("sessoes", String(ses));
        // Se acabar os minutos, o intervalo min_interval e seg_interval será parado e limpo
        clearInterval(min_interval);
        clearInterval(seg_interval);

        // Verificando se o valor de ses é menor ou igual a 0
        if (ses <= 0) {
          // Toca o audio final
          final.play();
          // Limpa o localStorage
          localStorage.clear();

          // Esconde o config
          document
            .getElementById("config")
            .style.setProperty("display", "none", "important");
          // Esconde o Timer
          document
            .getElementById("timer")
            .style.setProperty("display", "none", "important");
          // Mostra a mensagem de finalização e o botão de inicio
          document
            .getElementById("fim")
            .style.setProperty("display", "block", "important");
        } else {
          // Senão toca o audio volta
          volta.play();
          // chama a função de momentoAcao novamente para reiniciar o ciclo
          momentoAcao();
        }
      }
      // Se os minutos não acabarem adiciona mais 60 aos segundos e começa de novo.
      segundos = 60;
    }
  }
}
