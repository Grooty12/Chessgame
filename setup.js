let P /*Size of a single square*/,
  q = 0 /*Tells what number a piece is in the array when it is created*/,
  pq /*Previous q value, used to */,
  n = 8 /* Number of rows and columns in the grid */,
  size = 800 /*Total size of the grid, excluding sideline showing dead pieces */,
  selected = null /*Selected piece*/,
  target = null /*Targeted piece*/,
  s /*The index value the selected piece has*/,
  t /*The index value the targeted piece has*/,
  fy /* */,
  fx /* */,
  deadWhite = 0 /*A counter for how many dead white pieces*/,
  deadBlack = 0 /*A counter for how mant dead black pieces*/,
  pieces = [] /*An array that contains all the pieces*/,
  pColour =
    "Black" /*Colour of the previous move. Starts with black, so white starts*/,
  piecePos = [] /* Index value of the pices based on coordinations*/,
  pmx /*A rounded down to nearest hundreds value for the mouse's x-position*/,
  pmy /*A rounded down to nearest hundreds value for the mouse's y-position*/,
  rooks = [] /* Index value of all Rooks, below for all other pieces */,
  kings = [],
  pawns = [],
  queens = [],
  bishops = [],
  knights = [],
  queenButton,
  bishopButton,
  knightButton,
  rookButton;

function setup() {
  P = size / n;
  createCanvas(size + P, size + P);
  background(220);
  noStroke();
  for (let i = 0; i * P < size; i++) {
    /* Creates board */
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

  queenButton = createImg("assets/Black/Queen.png");
  queenButton.position(60, size + 10);
  queenButton.size(P - 20, P - 20);

  bishopButton = createImg("assets/Black/Bishop.png");
  bishopButton.position(2 * P + 60, size + 10);
  bishopButton.size(P - 20, P - 20);

  knightButton = createImg("assets/Black/Knight.png");
  knightButton.position(4 * P + 60, size + 10);
  knightButton.size(P - 20, P - 20);

  rookButton = createImg("assets/Black/Rook.png");
  rookButton.position(6 * P + 60, size + 10);
  rookButton.size(P - 20, P - 20);
}
