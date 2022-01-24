const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 800;

const stevenFrames = 

let game;


class player {
  constructor(){
    this.x = 700
    this.y = 100
  }
}



function animate() {
  game = window.requestAnimationFrame(animate);





  function walkcycleLeft () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

  }

}

document.addEventListener ("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft":
      driver.move("ArrowLeft");
      break;
    case "ArrowRight":
      driver.move("ArrowRight");
      break;
}
});