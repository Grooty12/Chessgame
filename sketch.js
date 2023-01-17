let brickIMG = [
    [0, 0, 100, 100], // Blank
    [0, 0, 255 / (277 / 95), 277 / (277 / 95)], // King
    [0, 0, 291 / (291 / 95), 272 / (291 / 95)], // Queen
    [0, 0, 212 / (247 / 95), 247 / (247 / 95)], // Rook
    [0, 0, 271 / (291 / 95), 291 / (291 / 95)], // Bishop
    [0, 0, 252 / (252 / 95), 249 / (252 / 95)], // Knight
    [0, 0, 180 / (247 / 95), 247 / (247 / 95)], // Pawn
  ],
  square = [],
  squarePressed1,
  squarePressed2,
  pressed = 0,
  move = 1;
function preload() {
  brickIMG[0][2] = loadImage("assets/Blank.png");
  brickIMG[1][0] = loadImage("assets/Black/King.png");
  brickIMG[1][1] = loadImage("assets/White/King.png");
  brickIMG[2][0] = loadImage("assets/Black/Queen.png");
  brickIMG[2][1] = loadImage("assets/White/Queen.png");
  brickIMG[3][0] = loadImage("assets/Black/Rook.png");
  brickIMG[3][1] = loadImage("assets/White/Rook.png");
  brickIMG[4][0] = loadImage("assets/Black/Bishop.png");
  brickIMG[4][1] = loadImage("assets/White/Bishop.png");
  brickIMG[5][0] = loadImage("assets/Black/Knight.png");
  brickIMG[5][1] = loadImage("assets/White/Knight.png");
  brickIMG[6][0] = loadImage("assets/Black/Pawn.png");
  brickIMG[6][1] = loadImage("assets/White/Pawn.png");
}
function setup() {
  createCanvas(windowWidth, 900);
  imageMode(CENTER);
  noStroke();
  drawBoard();
  makeBricks();
  drawBricks();
}

function drawBoard() {
  for (let j = 0; j * 100 < 800; j++) {
    for (let i = 0; i * 100 < 800; i++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          fill(181, 136, 99);
        } else {
          fill(240, 217, 181);
        }
      } else {
        if (j % 2 == 1) {
          fill(181, 136, 99);
        } else {
          fill(240, 217, 181);
        }
      }
      rect(i * 100, j * 100, 100, 100);
    }
  }
}

function makeBricks() {
  for (let i = 0; i < 64; i++) {
    square[i] = new Bricks(0, 2, i);
  }
  for (let i = 0; i < 2; i++) {
    // King
    square[4 + (60 - 4) * i].update(1, i);
    // Queen
    square[3 + (59 - 3) * i].update(2, i);
    // Rook, bishop, and knight
    for (let j = 0; j < 2; j++) {
      for (let x = 0; x < 3; x++) {
        square[0 + x + 56 * i + (7 - 2 * x) * j].update(3 + x, i);
      }
    }
    // Pawns
    for (let j = 0; j < 8; j++) {
      square[8 + 40 * i + j].update(6, i);
    }
  }
}
function drawBricks() {
  for (let i = 0; i < 64; i++) {
    square[i].show();
  }
}

class Bricks {
  constructor(brickType, brickColour, brickSquare) {
    this.type = brickType;
    this.colour = brickColour;
    this.y = floor(brickSquare / 8) * 100;
    this.x = (brickSquare - (this.y / 100) * 8) * 100;
  }
  update(brickTypes, brickColour) {
    this.type = brickTypes;
    this.colour = brickColour;
  }

  show() {
    image(
      brickIMG[this.type][this.colour],
      this.x + 50,
      this.y + 50,
      brickIMG[this.type][2],
      brickIMG[this.type][3]
    );
  }
}

function mousePressed() {
  if (
    mouseButton === LEFT &&
    mouseX > 0 &&
    mouseX < 800 &&
    mouseY > 0 &&
    mouseY < 800
  ) {
    if (pressed == 0) {
      squarePressed1 = floor(mouseX / 100) + floor(mouseY / 100) * 8;
      if (
        square[squarePressed1].colour < 2 &&
        move % 2 == square[squarePressed1].colour
      ) {
        print("First square pressed is: ", squarePressed1);
        drawBoard();
        fill(255, 255, 0);
        rect(floor(mouseX / 100) * 100, floor(mouseY / 100) * 100, 100, 100);
        drawBricks();
        pressed = 1;
      } else {
        print("Not Valid Square");
        return;
      }
    } else if (pressed == 1) {
      squarePressed2 = floor(mouseX / 100) + floor(mouseY / 100) * 8;
      if (squarePressed1 == squarePressed2) {
        pressed = 0;
        drawBoard();
        drawBricks();
        return;
      }
      moveBricks();
      print("Second square pressed is: ", squarePressed2);
    }
  }
}

function moveBricks() {
  if (square[squarePressed1].type == 6) {
    movePawn();
  }
}

function movePawn() {
  print(square[squarePressed1]);
  print(square[squarePressed2]);
  square[squarePressed2].update(
    square[squarePressed1].type,
    square[squarePressed2].colour
  );
  square[squarePressed1].update(0, 2);
  print(square[squarePressed1]);
  print(square[squarePressed2]);
}
