const cards = document.querySelectorAll(".card-rotated");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    rotateElement(e, card); // Aplica a rotação em cada card
  });

  card.addEventListener("mouseout", () => {
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
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
  element.style.setProperty("--rotateX", offsetX + "deg");
  element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}
