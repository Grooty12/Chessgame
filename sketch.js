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

function checkLine(checkx, checky) {
  while (checkx != selected.x || checky != selected.y) {
    if (pmx > selected.x) {
      checkx -= P;
    } else if (pmx < selected.x) {
      checkx += P;
    }
    if (pmy > selected.y) {
      checky -= P;
    } else if (pmy < selected.y) {
      checky += P;
    }
    if (checkx == selected.x && checky == selected.y) {
      break;
    }
    if (checkIfOccupied(checkx, checky)) {
      return false;
    }
  }
  return true;
}
function checkIfOccupied(x, y) {
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].x == x && pieces[i].y == y) {
      return true;
    }
  }
  return false;
}

function checkSquare(x, y) {
  if (selected == null) {
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].x == x && pieces[i].y == y && pColour != pieces[i].colour) {
        selected = pieces[i];
        s = i;
      }
    }
  } else if (selected != null) {
    checkTarget();
    if (selected.type === "Pawn") {
      pawnMove(selected.colour);
    } else if (selected.type === "King") {
      kingMove(selected.colour);
    } else if (selected.type === "Knight") {
      knightMove(selected.colour);
    } else if (selected.type === "Rook") {
      rookMove(selected.colour);
    } else if (selected.type === "Bishop") {
      bishopMove(selected.colour);
    } else if (selected.type == "Queen") {
      queenMove(selected.colour);
    }
    selected = null;
    target = null;
    t = null;
    s = null;
  }
}

function checkTarget() {
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].x == pmx && pieces[i].y == pmy) {
      target = pieces[i];
      t = i;
      return;
    }
  }
}
function removeTarget() {
  if (target != null) {
    if (pieces[t].colour === "Black") {
      if (db < 8) {
        pieces[t].update(size, (db * P) / 2);
      } else {
        pieces[t].update(size + P / 2, ((db - n) * P) / 2);
      }
      db++;
    } else {
      if (dw < 8) {
        pieces[t].update(size, (dw * P) / 2 + size / 2);
      } else {
        pieces[t].update(size + P / 2, ((dw - n) * P) / 2 + size / 2);
      }
      dw++;
    }
    pieces[t].img.size(P / 2, P / 2);
    pieces[t].isDead = true;
  }
}
