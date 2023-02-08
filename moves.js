function pawnMove(colour) {
  if (colour === "White") {
    var move = 1;
  } else {
    var move = -1;
  }
  if (pmy + P * move == pieces[s].y) {
    if (target == null) {
      if (pmx == pieces[s].x) {
        pieces[s].update(pmx, pmy);
        pColour = pieces[s].colour;
      }
    } else if (target.colour != colour) {
      if (pmx + P == pieces[s].x) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      } else if (pmx - P == pieces[s].x) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    }
  } else if (pieces[s].hasMoved == false && pmy + P * move * 2 == pieces[s].y) {
    if (checkLine(pmx, pmy) && target == null) {
      pieces[s].update(pmx, pmy);
      removeTarget();
      pColour = pieces[s].colour;
    }
  }
}

function knightMove(colour) {
  if (target == null || target.colour != colour) {
    if (pmx + 2 * P == pieces[s].x || pmx - 2 * P == pieces[s].x) {
      if (pmy + P == pieces[s].y || pmy - P == pieces[s].y) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    } else if (pmy + 2 * P == pieces[s].y || pmy - 2 * P == pieces[s].y) {
      if (pmx + P == pieces[s].x || pmx - P == pieces[s].x) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    }
  }
}

function rookMove(colour) {
  if (target == null || target.colour != colour) {
    if (
      (pmx != pieces[s].x && pmy == pieces[s].y) ||
      (pmy != pieces[s].y && pmx == pieces[s].x)
    ) {
      if (checkLine(pmx, pmy)) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    }
  }
}

function bishopMove(colour) {
  if (target == null || target.colour != colour) {
    fx = pmx - pieces[s].x;
    fy = pmy - pieces[s].y;
    if (abs(fx) == abs(fy)) {
      if (checkLine(pmx, pmy)) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    }
  }
}

function queenMove(colour) {
  if (target == null || target.colour != colour) {
    fx = pmx - pieces[s].x;
    fy = pmy - pieces[s].y;
    if (abs(fx) == abs(fy) || fx == 0 || fy == 0) {
      if (checkLine(pmx, pmy)) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    }
  }
}

function kingMove(colour) {
  if (target == null || target.colour != colour) {
    if (abs(pmx - pieces[s].x) == 2 * P) {
      if (pieces[s].hasMoved == false) {
        if (pmx - pieces[s].x > 0) {
          for (let i = 0; i < rooks.length; i++) {
            if (
              pieces[rooks[i]].x == 7 * P &&
              pieces[rooks[i]].y == pieces[s].y &&
              pieces[rooks[i]].hasMoved == false
            ) {
              if (checkLine(7 * P, pieces[s].y)) {
                pieces[s].update(pmx, pmy);
                pieces[rooks[i]].update(pmx - P, pmy);
                pColour = pieces[s].colour;
                return;
              }
            }
          }
        } else if (pmx - pieces[s].x < 0) {
          for (let i = 0; i < rooks.length; i++) {
            if (
              pieces[rooks[i]].x == 0 * P &&
              pieces[rooks[i]].y == pieces[s].y &&
              pieces[rooks[i]].hasMoved == false
            ) {
              if (checkLine(0 * P, pieces[s].y)) {
                pieces[s].update(pmx, pmy);
                pieces[rooks[i]].update(pmx + P, pmy);
                pColour = pieces[s].colour;
                return;
              }
            }
          }
        }
      }
    } else if (abs(pmx - pieces[s].x) <= P && abs(pmy - pieces[s].y) <= P) {
      pColour = pieces[s].colour;
      pieces[s].update(pmx, pmy);
      removeTarget();
    }
  }
}
