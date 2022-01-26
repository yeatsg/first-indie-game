const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

// Images characterMovement sprite sheet //

const stevenFrameLeft = new Image();
stevenFrameLeft.src = "../images/walkcycle-spritesheet-1.png";

const backgroundPlate = new Image();
backgroundPlate.src = "../images/background-beta-test.png";

const razorbladeSprites = new Image();
razorbladeSprites.src = "../images/razor-spritesheet.png";

// variables for class objects //

let limbStages = 1;
let endBackground = false;
let startBackground = false;
let scrollOffset = 0;

let canMoveL = false;
let canMoveR = false;

// OBJECT CLASSES ALL //

// player class //

class Player {
  constructor() {
    this.x = 700;
    this.y = 150;
    this.w = 500;
    this.h = 500;
    this.velocity = 5;
    this.image = stevenFrameLeft;
    this.frames = 0;
    this.slices = 1;
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
    if (endBackground || startBackground) {
      console.log("START OR END status in effect");
    } else {
      if (direction === "ArrowLeft") {
        this.frames++;
        if (this.frames > 28) {
          this.frames = 1;
        }
        this.x += this.velocity;
        if (canMoveL === true) {
          this.velocity = -5;
        } else {
          this.velocity = 0;
        }
        this.draw();
      }

      if (direction === "ArrowRight") {
        this.frames--;
        if (this.frames < 1) {
          this.frames = 28;
        }
        this.x += this.velocity;
        if (canMoveR) {
          this.velocity = 5;
        } else {
          this.velocity = 0;
        }
        this.draw();
      }
    }
  }
}

//razorblade object class//

class Object {
  constructor(y) {
    this.x = -1000;
    this.y = y;
    this.image = razorbladeSprites;
    this.w = 400;
    this.h = 400;
    this.velocity = 20;
    this.frames = 0;
  }

  draw() {
    ctx.drawImage(
      this.image,
      500 * this.frames,
      0,
      500,
      500,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  update() {
    this.frames++;
    if (this.frames > 8) {
      this.frames = 0;
    }
    this.x += this.velocity;
    this.draw();
  }

  // update() {

  // }
}

// generic object classes //

class GenericObject {
  constructor(x, y, image, w, h) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.w = w;
    this.h = h;
    this.velocity = 0;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  update(direction) {
    if (limbStages !== 4 && scrollOffset > 3100) {
      console.log("reset");
    }
    if (direction === "ArrowLeft") {
      scrollOffset += 5;
      this.x += this.velocity;
      if (!canMoveL) {
        this.velocity = 5;
      } else {
        this.velocity = 0;
      }
      this.draw();
    }

    if (direction === "ArrowRight") {
      scrollOffset -= 5;
      this.x += this.velocity;
      if (!canMoveR) {
        this.velocity = -5;
      } else {
        this.velocity = 0;
      }
      this.draw();
    }
  }
}

// vital variables //

let game;

const steven = new Player();
const background = new GenericObject(
  canvas.width * -3,
  0,
  backgroundPlate,
  canvas.width * 4,
  canvas.height
);

const razorblade = new Object(100);

// animation begins //

function animate() {
  game = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  razorblade.update();
  steven.draw();

  if (steven.x > 300) {
    canMoveL = true;
  } else {
    canMoveL = false;
  }

  if (steven.x < 600) {
    canMoveR = true;
  } else {
    canMoveR = false;
  }

  if (scrollOffset > 3900) {
    console.log("You win!");
  }
}

document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft":
      steven.update("ArrowLeft");
      background.update("ArrowLeft");
      break;
    case "ArrowRight":
      steven.update("ArrowRight");
      background.update("ArrowRight");
      break;
  }
});

animate();
