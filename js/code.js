const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

// Images characterMovement sprite sheet //

const stevenSliceOne = new Image();
stevenSliceOne.src = "../images/walkcycle-slice1.png";
const stevenSliceTwo = new Image();
stevenSliceTwo.src = "../images/walkcycle-slice2.png";
const stevenSliceThree = new Image();
stevenSliceThree.src = "../images/walkcycle-slice3.png";
const stevenSliceFour = new Image();
stevenSliceFour.src = "../images/walkcycle-slice4.png";

const backgroundPlate = new Image();
backgroundPlate.src = "../images/background-test-2.png";

const razorbladeSprites = new Image();
razorbladeSprites.src = "../images/razor-spritesheet.png";

const musicalScore = new Audio();
musicalScore.src = "../audio/ost-hallway-loop.mp3";
musicalScore.loop = true;

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
    this.frames = 0;
    this.slices = 1;
    this.image = stevenSliceOne;
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
    // if (endBackground || startBackground) {
    //   console.log("START OR END status in effect");
    // } else {

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
  collisionResponse() {
    if (limbStages === 1) {
      this.image = stevenSliceOne;
    } else if (limbStages === 2) {
      this.image = stevenSliceTwo;
    } else if (limbStages === 3) {
      this.image = stevenSliceThree;
    } else if (limbStages === 4) {
      this.image = stevenSliceFour;
    } else if (limbStages > 4) {
      limbStages = 4;
    } else {
      limbStages === 1;
    }
  }
  // }
}

//razorblade object class//

class Object {
  constructor() {
    this.x = -1000;
    this.y = 80;
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
    if (limbStages < 4) {
      this.frames++;
      if (this.frames > 8) {
        this.frames = 0;
      }
    }
  }

  update() {
    this.draw();
    if (limbStages === 1 && scrollOffset > 1200) {
      this.x += this.velocity;
    }
    if (limbStages === 2 && scrollOffset > 2100) {
      this.velocity = 20;
      this.x += this.velocity;
    }
    if (limbStages === 3 && scrollOffset > 2500) {
      this.velocity = 20;
      this.x += this.velocity;
    }
  }

  collisionResponse() {
    if (limbStages === 1) {
      this.y = 50;
    } else if (limbStages === 2) {
      this.x = -500;
      this.y = 150;
      this.velocity = 0;
    } else if (limbStages === 3) {
      this.x = -500;
      this.y = 225;
      this.velocity = 0;
      // Might be able to delete the code below //
    } else if (limbStages === 4) {
      this.x = -500;
      this.y = -500;
      this.velocity = 0;
    }
  }
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
    if (this.x < canvas.width * -3) {
      this.velocity = 0;
    } else if (this.x > 0) {
      this.velocity = 0;
    } else {
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
}
// vital variables //

let game;

const steven = new Player();
const razorblade = new Object();
const background = new GenericObject(
  canvas.width * -3,
  0,
  backgroundPlate,
  canvas.width * 4,
  canvas.height
);

// animation begins //

function animate() {
  game = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  razorblade.update();
  steven.draw();
  musicalScore.play();

  // Move barricade/functionality//

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

  // Collision functioning

  didCollide = detectCollision(steven, razorblade);
  if (didCollide) {
    limbStages++;
    razorblade.collisionResponse();
    steven.collisionResponse();
  }

  // Win conditions

  if (scrollOffset > 3300) {
    console.log("You win!");
  }

  // next win condition
  if (background.x < -3001) {
    console.log("You win for real!");
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

function detectCollision(player, obj) {
  if (
    player.x + player.w / 2 < obj.x + obj.w &&
    player.x + player.w / 2 > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    return true;
  } else {
    return false;
  }
}

animate();
