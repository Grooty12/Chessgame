let P,
  n = 8,
  size = 800;
let i = 3;
let wPawn;
function preLoad() {
  wPawn = loadImage("assets/White/Bishop.png");
}
function setup() {
  createCanvas(size, size);
  P = size / n;
  for (let i = 0; i * P <= size; i++) {
    for (let x = 0; x * P <= size; x++) {
      if ((i + x) % 2 == 0) {
        fill(255, 248, 220);
      } else {
        fill(101, 67, 33);
      }
      rect(x * P, i * P, P, P);
    }
  }
  image(wPawn, 100, 100);
  let pawns = new Pawn();
  pawns.show();
}

class Pawn {
  constructor() {
    print(i, n);
    if (i < n) {
      this.position = [i * P, (n - 1) * P];
      this.colour = "White";
      this.img = wPawn;
    } else {
      this.position = [(i - n) * P, P];
      this.colour = "Black";
      this.img = loadImage("assets/Black/Pawn.png");
    }
  }
  show() {
    print(this.position[0], this.position[1]);
    image(this.img, this.position[0], this.position[1]);
  }
}
function checkSquare() {}
