function checkPotMoves() {
  potentialMoves = [];
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].type === "King" || pieces[i].type === "Knight") {
      potMoves(pieces[i].x, pieces[i].y, i);
    }
  }
}

function potMoves(X, Y, i) {
  selected = pieces[i];
  s = i;
  px = X;
  py = Y;
  checkPotSquare(px, py);
}

function checkPotSquare() {
  if (pieces[s].type === "Pawn") {
    pawnPotMove(pieces[s].colour);
  } else if (pieces[s].type === "King") {
    kingPotMove(pieces[s].colour);
  } else if (pieces[s].type === "Knight") {
    knightPotMove(pieces[s].colour);
  } else if (pieces[s].type === "Rook") {
    rookPotMove(pieces[s].colour);
  } else if (pieces[s].type === "Bishop") {
    bishopPotMove(pieces[s].colour);
  } else if (pieces[s].type == "Queen") {
    queenPotMove(pieces[s].colour);
  }
  selected = null;
  target = null;
  t = null;
  s = null;
}
function checkOutOfBounds(fX, fY) {
  if (fX >= 0 && fX < size && fY >= 0 && fY < size) {
    return false;
  } else {
    target = null;
    t = null;
    return true;
  }
}

function knightPotMove(colour) {
  for (let i = 0; i < knightMoves.length; i++) {
    pmx = px + knightMoves[i][0] * P;
    pmy = py + knightMoves[i][1] * P;
    if (!checkOutOfBounds(pmx, pmy)) {
      target = null;
      t = null;
      checkTarget();
    } else {
      continue;
    }
    if (target == null || target.colour != colour) {
      potentialMoves.push([pmx, pmy]);
    }
  }
  pieces[s].updateMoves(potentialMoves);
}

function kingPotMove(colour) {
  defineMoves();
  pmx = pieces[s].x;
  pmy = pieces[s].y;
  if (pieces[s].hasMoved == false) {
    for (let i = 0; i < rooks.length; i++) {
      if (
        pieces[rooks[i]].hasMoved == false &&
        pieces[rooks[i]].y == pieces[s].y
      ) {
        if (pieces[rooks[i]].x < pieces[s].x) {
          pmx = pieces[s].x - 2 * P;
          pmy = pieces[s].y;
          if (checkLine(pmx, pmy)) {
            kingMoves.push(-2, 0);
            break;
          }
        } else if (pieces[rooks[i]].x > pieces[s].x) {
          pmx = pieces[s].x + 2 * P;
          pmy = pieces[s].y;
          if (checkLine(pmx, pmy)) {
            kingMoves.push(2, 0);
            break;
          }
        }
      } else {
        continue;
      }
    }
  }
  for (let i = 0; i < kingMoves.length; i++) {
    pmx = px + kingMoves[i][0] * P;
    pmy = py + kingMoves[i][1] * P;
    if (!checkOutOfBounds(pmx, pmy)) {
      target = null;
      t = null;
      checkTarget();
    } else {
      continue;
    }
    if (target == null || target.colour != colour) {
      potentialMoves.push([pmx, pmy]);
    } else {
      continue;
    }
  }
  for (let i = 0; i < potentialMoves.length; i++) {
    fill(0);
    circle(potentialMoves[i][0] + 50, potentialMoves[i][1] + 50, 50);
  }
  pieces[s].updateMoves(potentialMoves);
}

function pawnPotMove(colour) {
  if (colour == "White") {
    var pawnR = [[0, -1]];
  } else {
    var pawnMoves = [[0, 1]];
  }
  var pawnMoves = [[0, 1 * pawnR]];
  pmx = px + pawnMoves[i][0] * P;
  pmy = px + pawnMoves[i][1] * P;
  if (!checkOutOfBounds(pmx, pmy)) {
    target = null;
    t = null;
  }
}

function defineMoves() {
  knightMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ];
  kingMoves = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
}
