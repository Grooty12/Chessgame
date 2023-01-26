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
    if (pmx + 2 * P == selected.x || pmx - 2 * P == selected.x) {
      if (pmy + P == selected.y || pmy - P == selected.y) {
        pieces[s].update(pmx, pmy);
        removeTarget();
        pColour = pieces[s].colour;
      }
    } else if (pmy + 2 * P == selected.y || pmy - 2 * P == selected.y) {
      if (pmx + P == selected.x || pmx - P == selected.x) {
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
      (pmx != selected.x && pmy == selected.y) ||
      (pmy != selected.y && pmx == selected.x)
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
    fx = pmx - selected.x;
    fy = pmy - selected.y;
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
    fx = pmx - selected.x;
    fy = pmy - selected.y;
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
    if (abs(pmx - selected.x) == 2 * P) {
      if (pieces[s].hasMoved == false) {
        if (pmx - selected.x > 0) {
          for (let i = 0; i < pieces.length; i++) {
            if (
              pieces[i].x == 7 * P &&
              pieces[i].y == pieces[s].y &&
              pieces[i].hasMoved == false
            ) {
              if (checkLine(7 * P, pieces[s].y)) {
                pieces[s].update(pmx, pmy);
                pieces[i].update(pmx - P, pmy);
                pColour = pieces[s].colour;
                return;
              }
            }
          }
        } else if (pmx - selected.x < 0) {
          for (let i = 0; i < pieces.length; i++) {
            if (
              pieces[i].x == 0 * P &&
              pieces[i].y == pieces[s].y &&
              pieces[i].hasMoved == false
            ) {
              if (checkLine(0 * P, pieces[s].y)) {
                pieces[s].update(pmx, pmy);
                pieces[i].update(pmx + P, pmy);
                pColour = pieces[s].colour;
                return;
              }
            }
          }
        }
      }
    } else if (abs(pmx - selected.x) <= P && abs(pmy - selected.y) <= P) {
      pColour = pieces[s].colour;
      pieces[s].update(pmx, pmy);
      removeTarget();
    }
  }
}
