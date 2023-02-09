function mouseReleased() {
  if (mouseX >= 0 && mouseX <= size && mouseY >= 0 && mouseY <= size) {
    pmx = mouseX - (mouseX % P);
    pmy = mouseY - (mouseY % P);
    checkSquare(pmx, pmy);
  } else {
    target = null;
    selected = null;
    s = null;
    t = null;
  }
}

function checkSquare(x, y) {
  if (pieces[s] == null) {
    s = piecePos[x / P][y / P];
    selected = pieces[s];
  } else if (pieces[s] != null) {
    if (pieces[s].colour != pColour) {
      checkTarget();
      if (pieces[s].type === "Pawn") {
        pawnMove(pieces[s].colour);
      } else if (pieces[s].type === "King") {
        kingMove(pieces[s].colour);
      } else if (pieces[s].type === "Knight") {
        knightMove(pieces[s].colour);
      } else if (pieces[s].type === "Rook") {
        rookMove(pieces[s].colour);
      } else if (pieces[s].type === "Bishop") {
        bishopMove(pieces[s].colour);
      } else if (pieces[s].type == "Queen") {
        queenMove(pieces[s].colour);
      }
    }
    selected = null;
    target = null;
    t = null;
    s = null;
  }
}

function checkTarget() {
  t = piecePos[pmx / P][pmy / P];
  target = pieces[t];
}

function checkLine(checkx, checky) {
  while (checkx != pieces[s].x || checky != pieces[s].y) {
    if (pmx > pieces[s].x) {
      checkx -= P;
    } else if (pmx < pieces[s].x) {
      checkx += P;
    }
    if (pmy > pieces[s].y) {
      checky -= P;
    } else if (pmy < pieces[s].y) {
      checky += P;
    }
    if (checkx == pieces[s].x && checky == pieces[s].y) {
      break;
    }
    if (checkIfOccupied(checkx, checky)) {
      return false;
    }
  }
  return true;
}

function checkIfOccupied(x, y) {
  if (piecePos[x / P][y / P] != null) {
    return true;
  }
  return false;
}

function removeTarget() {
  if (target != null) {
    if (pieces[t].colour === "Black") {
      if (deadBlack < 8) {
        pieces[t].update(size, (deadBlack * P) / 2);
      } else {
        pieces[t].update(size + P / 2, ((deadBlack - n) * P) / 2);
      }
      deadBlack++;
    } else {
      if (deadWhite < 8) {
        pieces[t].update(size, (deadWhite * P) / 2 + size / 2);
      } else {
        pieces[t].update(size + P / 2, ((deadWhite - n) * P) / 2 + size / 2);
      }
      deadWhite++;
    }
    pieces[t].img.size(P / 2, P / 2);
    pieces[t].isDead = true;
  }
}

function pawnUpgrade() {}
