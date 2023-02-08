function checkPotMoves() {
  for (let i = 0; i < pieces.length; i++) {
    potentialMoves = [];
    if (
      pieces[i].type === "King" ||
      pieces[i].type === "Knight" ||
      pieces[i].type === "Pawn" ||
      pieces[i].type === "Rook"
    ) {
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
          pmx = pieces[s].x - 4 * P;
          pmy = pieces[s].y;
          if (checkLine(pmx, pmy)) {
            kingMoves.push([-2, 0]);
            break;
          }
        } else if (pieces[rooks[i]].x > pieces[s].x) {
          pmx = pieces[s].x + 3 * P;
          pmy = pieces[s].y;
          if (checkLine(pmx, pmy)) {
            kingMoves.push([2, 0]);
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
  pieces[s].updateMoves(potentialMoves);
}

function pawnPotMove(colour) {
  if (colour == "White") {
    var pawnR = [0, -1];
  } else {
    var pawnR = [0, 1];
  }
  pmx = px + pawnR[0] * P;
  pmy = py + pawnR[1] * P;
  if (!checkOutOfBounds(pmx, pmy)) {
    target = null;
    t = null;
    checkTarget();
  } else {
    return;
  }
  if (target == null) {
    potentialMoves.push([pmx, pmy]);
  }
  for (let i = -1; i <= 1; i += 2) {
    pmx = px + 1 * P * i;
    pmy = py + 1 * P * pawnR[1];
    if (checkOutOfBounds(pmx, pmy) || piecePos[pmx / P][pmy / P] == null) {
      continue;
    } else if (pieces[piecePos[pmx / P][pmy / P]].colour != colour) {
      potentialMoves.push([pmx, pmy]);
    }
  }
  if (pieces[s].hasMoved == false) {
    pmx = px;
    pmy = py + 2 * P * pawnR[1];
    if (
      !checkOutOfBounds(pmx, pmy) &&
      checkLine(pmx, pmy) &&
      piecePos[pmx / P][pmy / P] == null
    ) {
      potentialMoves.push([pmx, pmy]);
    }
  }
  pieces[s].updateMoves(potentialMoves);
}

function rookPotMove(colour) {
  for (let i = 1; i <= 7; i++) {
    pmy = px;
    pmx = px + i * P;
    if (!checkOutOfBounds(pmx, pmy)) {
    } else {
      break;
    }
    fill(50);
    circle(pmx + 50, pmy + 50, 50);
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
