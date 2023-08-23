$(document).ready(function() {
  // Variáveis do jogo
  var numeroAdivinhar = Math.floor(Math.random() * 100) + 1; // Número a ser adivinhado
  var tentativasRestantes = 10; // Tentativas restantes
  var jogoTerminado = false; // Indicador de fim de jogo

  // Manipulação do botão "Verificar"
  $('#submit').on('click', function() {
    if (jogoTerminado) {
      return; // Sai da função se o jogo já tiver terminado
    }

    var adivinhar = parseInt($('#adivinhar').val()); // Palpite do jogador

    // Verificar se o palpite é válido
    if (isNaN(adivinhar) || adivinhar < 1 || adivinhar > 100) {
      $('#result').text('Digite um número válido entre 1 e 100.');
      return;
    }

    tentativasRestantes--; // Reduzir tentativas restantes

    // Verificar se o palpite é correto
    if (adivinhar === numeroAdivinhar) {
      $('#result').text('Parabéns! Você acertou o número em ' + (10 - tentativasRestantes) + ' tentativas!');
      $('#secretNumber').text(numeroAdivinhar).css('color', 'green').css('text-shadow', 'none');
      jogoTerminado = true; // Finalizar o jogo
      $('#submit').prop('disabled', true); // Desativar botão de verificar
      $('#restart').show(); // Exibir botão de reiniciar
    } else {
      var difference = Math.abs(numeroAdivinhar - adivinhar);
      var message = '';

      // Determinar mensagem com base na diferença
      if (difference <= 1) {
        message = 'Está queimando!';
      } else if (difference <= 5) {
        message = 'Está pegando fogo!';
      } else if (difference <= 15) {
        message = 'Está quente!';
      } else if (difference <= 30) {
        message = 'Está morno.';
      } else {
        message = 'Está congelando.';
      }

      // Indicar se o jogador deve tentar um número maior ou menor
      if (adivinhar < numeroAdivinhar) {
        message += ' Tente um número maior.';
      } else {
        message += ' Tente um número menor.';
      }

      $('#result').text(message + ' Tentativas restantes: ' + tentativasRestantes);
    }

    // Verificar se o jogo acabou
    if (tentativasRestantes === 0) {
      $('#result').text('Fim do jogo. O número correto era ' + numeroAdivinhar + '.');
      $('#secretNumber').text(numeroAdivinhar).css('color', 'red').css('text-shadow', 'none');
      jogoTerminado = true; // Finalizar o jogo
      $('#submit').prop('disabled', true); // Desativar botão de verificar
      $('#restart').show(); // Exibir botão de reiniciar
    }
  });

  // Reiniciar o jogo ao clicar no botão "Jogar Novamente"
  $('#restart').on('click', function() {
    numeroAdivinhar = Math.floor(Math.random() * 100) + 1; // Gerar novo número a ser adivinhado
    tentativasRestantes = 10; // Resetar tentativas restantes
    jogoTerminado = false; // Resetar indicador de fim de jogo
    $('#result').text(''); // Limpar resultado
    $('#adivinhar').val(''); // Limpar campo de palpite
    $('#submit').prop('disabled', false); // Ativar botão de verificar
    $('#restart').hide(); // Esconder botão de reiniciar
    $('#secretNumber').text('???').css('color', 'transparent').css('text-shadow', '0 0 5px rgba(0, 0, 0, 0.5)'); // Resetar número embaçado
  });

  // Atualizar a exibição do número embaçado de acordo com o número de dígitos
  function updateSecretNumberDisplay() {
    var numDigits = numeroAdivinhar.toString().length;
    var blurredNumber = '?'.repeat(numDigits);
    $('#secretNumber').text(blurredNumber);
  }

  updateSecretNumberDisplay(); // Chamar a função inicialmente
});
