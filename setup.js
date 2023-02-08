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
  potentialMoves = [],
  piecePos = [];
let pmx, pmy, mx, my, px, py;
let pawnMovesW = [];
let pawnMovesB = [];
let kingMoves = [];
let bishopMoves = [];
let knightMoves = [];
let rookMoves = [];
let rooks = [],
  kings = [],
  pawns = [],
  queens = [],
  bishops = [],
  knights = [];

function setup() {
  P = size / n;
  createCanvas(size + P, size + P);
  background(220);
  noStroke();
  for (let i = 0; i * P < size; i++) {
    let linePos = [];
    for (let x = 0; x * P < size; x++) {
      linePos.push(null);
      if ((i + x) % 2 == 0) {
        fill(255, 248, 220);
      } else {
        fill(101, 67, 33);
      }
      rect(x * P, i * P, P, P);
    }
    piecePos.push(linePos);
  }
  for (let i = 0; i < 2 * n; i++) {
    pieces[i] = new Pawn(i);
    pawns.push(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 2 + pq; i++) {
    pieces[i] = new King(i);
    kings.push(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Knight(i);
    knights.push(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Rook(i);
    rooks.push(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Bishop(i);
    bishops.push(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 2 + pq; i++) {
    pieces[i] = new Queen(i);
    queens.push(i);
    q++;
  }
  pq = q;
  pieces[null] = null;
  defineMoves();
  checkPotMoves();
}
