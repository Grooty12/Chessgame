let P,
  pq,
  n = 8,
  size = 800,
  selected = null,
  target = null,
  s,
  t,
  fy,
  fx,
  q = 0,
  dw = 0,
  db = 0,
  pieces = [],
  pColour = "Black",
  k = [],
  potentialMoves = [];
let pmx, pmy, mx, my, px, py;
let pawnMoves = [];
let kingMoves = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];
let bishopMoves = [];
let knightMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [-1, 2],
  [1, -2],
  [-1, -2],
];
let rookMoves = [];

function setup() {
  P = size / n;
  createCanvas(size + P, size + P);
  background(220);
  noStroke();
  for (let i = 0; i * P < size; i++) {
    for (let x = 0; x * P < size; x++) {
      if ((i + x) % 2 == 0) {
        fill(255, 248, 220);
      } else {
        fill(101, 67, 33);
      }
      rect(x * P, i * P, P, P);
    }
  }
  for (let i = 0; i < 2 * n; i++) {
    pieces[i] = new Pawn(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 2 + pq; i++) {
    pieces[i] = new King(i);
    k.push(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Knight(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Rook(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Bishop(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 2 + pq; i++) {
    pieces[i] = new Queen(i);
    q++;
  }
  pq = q;
  checkPotMoves();
}