let P,
  pq,
  n = 8,
  size = 800,
  selected = null,
  target = null,
  occupied = false,
  s,
  t,
  fy,
  fx,
  q = 0,
  dw = 0,
  db = 0,
  pieces = [],
  pColour = "Black";
let pmx, pmy, mx, my;
function setup() {
  P = size / n;
  createCanvas(size + P, size + P);
  background(220);
  noStroke();
  for (let i = 0; i * P < size; i++) {
    for (let x = 0; x * P < size; x++) {
      if ((i + x) % 2 == 0) {
        fill(255, 248, 220);
      } else {
        fill(101, 67, 33);
      }
      rect(x * P, i * P, P, P);
    }
  }
  for (let i = 0; i < 2 * n; i++) {
    pieces[i] = new Pawn(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 2 + pq; i++) {
    pieces[i] = new King(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Knight(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Rook(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 4 + pq; i++) {
    pieces[i] = new Bishop(i);
    q++;
  }
  pq = q;
  for (let i = pq; i < 2 + pq; i++) {
    pieces[i] = new Queen(i);
    q++;
  }
  pq = q;
}

class Pawn {
  constructor(i) {
    if (i < n) {
      this.x = i * P;
      this.y = (n - 2) * P;
      this.colour = "White";
      this.img = createImg("assets/White/Pawn.png");
    } else {
      this.x = (i - n) * P;
      this.y = P;
      this.colour = "Black";
      this.img = createImg("assets/Black/Pawn.png");
    }
    this.type = "Pawn";
    this.img.size(P, P);
    this.img.position(this.x, this.y);
    this.hasMoved = false;
    this.isDead = false;
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    this.img.position(this.x, this.y);
  }
}
class King {
  constructor(i) {
    if (i == pq) {
      this.x = 4 * P;
      this.y = (n - 1) * P;
      this.colour = "White";
      this.img = createImg("assets/White/King.png");
    } else {
      this.x = 4 * P;
      this.y = 0;
      this.colour = "Black";
      this.img = createImg("assets/Black/King.png");
    }
    this.type = "King";
    this.img.size(P, P);
    this.hasMoved = false;
    this.img.position(this.x, this.y);
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    this.img.position(this.x, this.y);
  }
}
class Knight {
  constructor(i) {
    if (i <= pq + 1) {
      this.x = P + (i - pq) * 5 * P;
      this.y = (n - 1) * P;
      this.colour = "White";
      this.img = createImg("assets/White/Knight.png");
    } else {
      this.x = P + (i - pq - 2) * 5 * P;
      this.y = 0;
      this.colour = "Black";
      this.img = createImg("assets/Black/Knight.png");
    }
    this.type = "Knight";
    this.img.size(P, P);
    this.img.position(this.x, this.y);
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.img.position(this.x, this.y);
  }
}
class Rook {
  constructor(i) {
    if (i <= pq + 1) {
      this.x = (i - pq) * 7 * P;
      this.y = (n - 1) * P;
      this.colour = "White";
      this.img = createImg("assets/White/Rook.png");
    } else {
      this.x = (i - pq - 2) * 7 * P;
      this.y = 0;
      this.colour = "Black";
      this.img = createImg("assets/Black/Rook.png");
    }
    this.type = "Rook";
    this.hasMoved = false;
    this.img.size(P, P);
    this.img.position(this.x, this.y);
  }
  update(x, y) {
    this.hasMoved = true;
    this.x = x;
    this.y = y;
    this.img.position(this.x, this.y);
  }
}
class Bishop {
  constructor(i) {
    if (i <= pq + 1) {
      this.x = 2 * P + (i - pq) * 3 * P;
      this.y = (n - 1) * P;
      this.colour = "White";
      this.img = createImg("assets/White/Bishop.png");
    } else {
      this.x = 2 * P + (i - pq - 2) * 3 * P;
      this.y = 0;
      this.colour = "Black";
      this.img = createImg("assets/Black/Bishop.png");
    }
    this.type = "Bishop";
    this.img.size(P, P);
    this.img.position(this.x, this.y);
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.img.position(this.x, this.y);
  }
}
class Queen {
  constructor(i) {
    if (i == pq) {
      this.x = 3 * P;
      this.y = (n - 1) * P;
      this.colour = "White";
      this.img = createImg("assets/White/Queen.png");
    } else {
      this.x = 3 * P;
      this.y = 0;
      this.colour = "Black";
      this.img = createImg("assets/Black/Queen.png");
    }
    this.type = "Queen";
    this.img.size(P, P);
    this.img.position(this.x, this.y);
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    this.img.position(this.x, this.y);
  }
}
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
      occupied = false;
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
