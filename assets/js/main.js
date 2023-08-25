$(document).ready(function() {
    // Variáveis do jogo
    var numeroAdivinhar = Math.floor(Math.random() * 200) + 1; // Número a ser adivinhado
    var tentativasRestantes = 10; // Tentativas restantes
    var jogoTerminado = false; // Indicador de fim de jogo
  
    // Manipulação do botão "Verificar"
    $('#submit').on('click', function() {
      if (jogoTerminado) {
        return; // Sai da função se o jogo já tiver terminado
      }
  
      var adivinhar = parseInt($('#adivinhar').val()); // Palpite do jogador
  
      // Verificar se o palpite é válido
      if (isNaN(adivinhar) || adivinhar < 1 || adivinhar > 200) {
        $('#result').text('Digite um número válido entre 1 e 200.');
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
        var diferente = Math.abs(numeroAdivinhar - adivinhar);
        var mensagem = '';
  
        // Determinar mensagem com base na diferença
        if (diferente <= 1) {
          mensagem = 'Está queimando!';
        } else if (diferente <= 5) {
          mensagem = 'Está pegando fogo!';
        } else if (diferente <= 15) {
          mensagem = 'Está quente!';
        } else if (diferente <= 30) {
          mensagem = 'Está morno.';
        } else {
          mensagem = 'Está congelando.';
        }
  
        // Indicar se o jogador deve tentar um número maior ou menor
        if (adivinhar < numeroAdivinhar) {
          mensagem += ' Tente um número maior.';
        } else {
          mensagem += ' Tente um número menor.';
        }
  
        $('#result').text(mensagem + ' Tentativas restantes: ' + tentativasRestantes);
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
      numeroAdivinhar = Math.floor(Math.random() * 200) + 1; // Gerar novo número a ser adivinhado
      tentativasRestantes = 10; // Resetar tentativas restantes
      jogoTerminado = false; // Resetar indicador de fim de jogo
      $('#result').text(''); // Limpar resultado
      $('#adivinhar').val(''); // Limpar campo de palpite
      $('#submit').prop('disabled', false); // Ativar botão de verificar
      $('#restart').hide(); // Esconder botão de reiniciar
      $('#secretNumber').text('???').css('color', 'transparent').css('text-shadow', '0 0 5px rgba(0, 0, 0, 0.5)'); // Resetar número embaçado
    });
  
    // Atualizar a exibição do número embaçado de acordo com o número de dígitos
    function mostraDisplay() {
      var numDigit = numeroAdivinhar.toString().length;
      var numeroVerm = '?'.repeat(numDigit);
      $('#secretNumber').text(numeroVerm );
    }
  
    mostraDisplay(); // Chamar a função inicialmente
  });
