const cartas = document.querySelectorAll('.carta');

const frutas = ['🍎','🍊','🍇','🍓','🍌'];
const jogo = frutas.concat(frutas);


jogo.sort(() => Math.random() - 0.5);

let primeiraCarta = null;
let bloqueio = false;
let acertos = 0;
let erros = 0;


const acertosHTML = document.getElementById('acertos');
const errosHTML = document.getElementById('erros');


for (let i = 0; i < cartas.length; i++) {
  cartas[i].textContent = jogo[i];
  cartas[i].addEventListener('click', virarCarta);
}


function atualizarPlacar() {
  acertosHTML.textContent = acertos;
  errosHTML.textContent = erros;
}


function virarCarta() {
  if (bloqueio) return;
  if (this.classList.contains('virada')) return;

  this.classList.add('virada');

  if (primeiraCarta === null) {
    primeiraCarta = this;
  } else {
    if (this.textContent === primeiraCarta.textContent) {
      
      acertos++;
      atualizarPlacar();
      primeiraCarta = null;

      
      if (acertos === frutas.length) {
        setTimeout(() => {
          alert(`Parabéns! Você venceu!\nAcertos: ${acertos}\nErros: ${erros}`);
        }, 300);
      }

    } else {
      
      erros++;
      atualizarPlacar();
      bloqueio = true;

      setTimeout(() => {
        this.classList.remove('virada');
        primeiraCarta.classList.remove('virada');
        primeiraCarta = null;
        bloqueio = false;
      }, 1000);
    }
  }
}

const botaoReiniciar = document.getElementById('reiniciar');
botaoReiniciar.addEventListener('click', reiniciarJogo);

function reiniciarJogo() {
  
  primeiraCarta = null;
  bloqueio = false;
  acertos = 0;
  erros = 0;
  atualizarPlacar();

  
  jogo.sort(() => Math.random() - 0.5);

  
  for (let i = 0; i < cartas.length; i++) {
    cartas[i].classList.remove('virada');
    cartas[i].textContent = jogo[i];
  }
}
