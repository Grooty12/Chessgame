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
  if (selected.type === "Pawn") {
    pawnPotMove(selected.colour);
  } else if (selected.type === "King") {
    kingPotMove(selected.colour);
  } else if (selected.type === "Knight") {
    knightPotMove(selected.colour);
  } else if (selected.type === "Rook") {
    rookPotMove(selected.colour);
  } else if (selected.type === "Bishop") {
    bishopPotMove(selected.colour);
  } else if (selected.type == "Queen") {
    queenPotMove(selected.colour);
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
  if (pieces[s].hasMoved == false) {
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].type === "Rook") {
        if (pieces[i].hasMoved == false) {
          if ((pieces[i].y = pieces[s].y)) {
            if (pieces[i].x < pieces[s].x) {
              if (checkLine(pieces[s].x - 2 * P, pieces[s].y)) {
                kingMoves.push([-2, 0]);
                continue;
              }
            } else if (pieces[i].x > pieces[s].x) {
              if (checkLine(pieces[s].x + 2 * P, pieces[s].y)) {
                kingMoves.push([2, 0]);
                continue;
              }
            }
          } else {
            continue;
          }
        } else {
          continue;
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
      fill(0);
      circle(pmx + 50, pmy + 50, 50);
    } else {
      continue;
    }
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
