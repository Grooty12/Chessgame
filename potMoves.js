function checkPotMoves() {
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].type === "Knight" || pieces[i].type === "King") {
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
function checkOutOfBounds(X, Y) {
  if (X >= 0 && X < size && Y >= 0 && Y < size) {
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
  for (let i = 0; i < kingMoves.length; i++) {
    pmx = px + kingMoves[i][0] * P;
    pmy = py + kingMoves[i][1] * P;
    if (!checkOutOfBounds(pmx, pmy)) {
      checkTarget();
    } else {
      continue;
    }
    if (target == null || target.colour != colour) {
      print(pmx, pmy);
      potentialMoves.push([pmx, pmy]);
    }
  }
  pieces[s].updateMoves(potentialMoves);
}
