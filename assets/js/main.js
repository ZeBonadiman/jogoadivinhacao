$(document).ready(function() {
  var numberToGuess = Math.floor(Math.random() * 100) + 1;
  var attemptsLeft = 10;
  var gameOver = false;

  $('#submit').on('click', function() {
      if (gameOver) {
          return;
      }

      var guess = parseInt($('#guess').val());

      if (isNaN(guess) || guess < 1 || guess > 100) {
          $('#result').text('Digite um número válido entre 1 e 100.');
          return;
      }

      attemptsLeft--;

      if (guess === numberToGuess) {
          $('#result').text('Parabéns! Você acertou o número em ' + (10 - attemptsLeft) + ' tentativas!');
          $('#secretNumber').text(numberToGuess).css('color', 'green').css('text-shadow', 'none');
          gameOver = true;
          $('#submit').prop('disabled', true);
          $('#restart').show();
      } else {
          var difference = Math.abs(numberToGuess - guess);
          var message = '';

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

          if (guess < numberToGuess) {
              message += ' Tente um número maior.';
          } else {
              message += ' Tente um número menor.';
          }

          $('#result').text(message + ' Tentativas restantes: ' + attemptsLeft);
      }

      if (attemptsLeft === 0) {
          $('#result').text('Fim do jogo. O número correto era ' + numberToGuess + '.');
          $('#secretNumber').text(numberToGuess).css('color', 'red').css('text-shadow', 'none');
          gameOver = true;
          $('#submit').prop('disabled', true);
          $('#restart').show();
      }
  });

  $('#restart').on('click', function() {
      numberToGuess = Math.floor(Math.random() * 100) + 1;
      attemptsLeft = 10;
      gameOver = false;
      $('#result').text('');
      $('#guess').val('');
      $('#submit').prop('disabled', false);
      $('#restart').hide();
      $('#secretNumber').text('???').css('color', 'transparent').css('text-shadow', '0 0 5px rgba(0, 0, 0, 0.5)');
  });

  // Atualizar a exibição do número embaçado de acordo com o número de dígitos
  function updateSecretNumberDisplay() {
      var numDigits = numberToGuess.toString().length;
      var blurredNumber = '?'.repeat(numDigits);
      $('#secretNumber').text(blurredNumber);
  }

  updateSecretNumberDisplay(); // Chamar a função inicialmente
});