const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 800;

let game;

function animate() {
  game = window.requestAnimationFrame(animate);
}
