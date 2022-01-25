const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 800;

// characterMovement sprite sheet //

const stevenFrameLeft = new Image();
stevenFrameLeft.src = "../images/spritesheet-beta-test-3.png";

let game;

class Player {
  constructor() {
    this.x = 400;
    this.y = 100;
    this.w = 600;
    this.h = 600;
    this.velocity = 1;
    this.image = stevenFrameLeft;
    this.frames = 0;
  }

  draw() {
    ctx.drawImage(
      this.image,
      1002 * this.frames,
      0,
      1002,
      1002,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  update(direction) {
    if (direction === "ArrowLeft") {
      this.frames++;
      this.draw();
      if (this.frames > 28) {
        this.frames = 0;
      }
    }
    if (direction === "ArrowRight") {
      this.frames--;
      this.draw();
      if (this.frames < 0) {
        this.frames = 28;
      }
    }
  }
}

const steven = new Player();

function animate() {
  game = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  steven.draw();

  // function walkcycleLeft () {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height)

  // }
}

document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft":
      steven.update("ArrowLeft");
      break;
    case "ArrowRight":
      steven.update("ArrowRight");
      break;
  }
});

animate();
