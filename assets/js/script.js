import { Application } from "https://cdn.skypack.dev/@splinetool/runtime@0.9.416";

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/p8MVOAhrGFHxby46/scene.splinecode');

// Rotação card

const cards = document.querySelectorAll(".card-rotated");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    rotateElement(e, card); // Aplica a rotação em cada card
  });

  card.addEventListener("mouseout", () => {
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
    card.style.setProperty("--scale", 1);
  });
});


function rotateElement(event, element) {
  // Posição do mouse
  const x = event.clientX;
  const y = event.clientY;

  // Encontrando o meio do elemento
  const rect = element.getBoundingClientRect();
  const middleX = rect.left + rect.width / 2;
  const middleY = rect.top + rect.height / 2;

  // Calculando o deslocamento do meio do elemento como uma porcentagem
  const offsetX = ((x - middleX) / middleX) * 45;
  const offsetY = ((y - middleY) / middleY) * 45;

  // Definindo as propriedades de rotação
  element.style.setProperty("--scale", 1.1);
  element.style.setProperty("--rotateX", offsetX + "deg");
  element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}


// Inicializa o GSAP e ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Seleciona a div e aplica a animação
gsap.fromTo(
    ".target", // Alvo da animação
    { opacity: 0, y: -50 }, // Estado inicial (invisível e deslocado para cima)
    { 
    opacity: 1, 
    y: 0, 
    duration: 1, // Duração da animação em segundos
    scrollTrigger: {
        trigger: ".target", // Elemento que aciona a animação
        start: "top 80%", // Ponto de início (quando o topo da div atinge 80% da altura da viewport)
        toggleActions: "play none none none" // Executa a animação somente uma vez
    }
    }
);

// Seleciona a div e aplica a animação
gsap.fromTo(
    ".target-card", // Alvo da animação
    { opacity: 0, y: -50 }, // Estado inicial (invisível e deslocado para cima)
    { 
    opacity: 1, 
    y: 0, 
    duration: 1, // Duração da animação em segundos
    scrollTrigger: {
        trigger: ".target-card", // Elemento que aciona a animação
        start: "top 80%", // Ponto de início (quando o topo da div atinge 80% da altura da viewport)
        toggleActions: "play none none none" // Executa a animação somente uma vez
    }
    }
);

    // Seleciona todos os cards
    const descriptionDiv = document.getElementById('product-description');
    const descriptionTitle = document.getElementById('description-title');
    const descriptionText = document.getElementById('description-text');
    let activeCard = null; // Referência ao card ativo

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (activeCard === card) {
          // Se o card clicado já está ativo, restaura tudo
          cards.forEach(otherCard => otherCard.classList.remove('hidden', 'active'));
          descriptionDiv.classList.remove('active'); // Esconde a descrição
          activeCard = null; // Reseta o card ativo
        } else {
          // Oculta todos os outros cards
          cards.forEach(otherCard => {
            if (otherCard !== card) {
              otherCard.classList.add('hidden');
              otherCard.classList.remove('active');
            }
          });

          // Marca o card clicado como ativo
          card.classList.add('active');
          card.scrollIntoView();

          // Atualiza o conteúdo da div de descrição
          const title = card.querySelector('.card-title').textContent;
          const description = card.getAttribute('data-description');
          descriptionTitle.innerHTML = title;
          descriptionText.innerHTML = description;

          // Exibe a div de descrição
          descriptionDiv.classList.add('active');
          activeCard = card; // Define o card ativo
        }
      });
    });
