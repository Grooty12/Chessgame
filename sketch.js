let P,
  pq,
  n = 8,
  size = 800,
  selected = null,
  target = null,
  s,
  t,
  q = 0,
  pieces = [];
let pmx, pmy, mx, my;
let wPawn = "assets/White/Pawn.png";
let bPawn = "assets/Black/Pawn.png";
let wKing = "assets/White/King.png";
let bKing = "assets/Black/King.png";
function setup() {
  createCanvas(size, size);
  noStroke();
  P = size / n;
  for (let i = 0; i * P < size; i++) {
    for (let x = 0; x * P <= size; x++) {
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
}

class Pawn {
  constructor(i) {
    if (i < n) {
      this.x = i * P;
      this.y = (n - 2) * P;
      this.colour = "White";
      this.img = createImg(wPawn);
    } else {
      this.x = (i - n) * P;
      this.y = P;
      this.colour = "Black";
      this.img = createImg(bPawn);
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
      this.img = createImg(wKing);
    } else {
      this.x = 4 * P;
      this.y = 0;
      this.colour = "Black";
      this.img = createImg(bKing);
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
class Rook {
  constructor(i) {}
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
    print("Fuck dig cunt, du er udenfor brættet");
  }
}

function checkSquare(x, y) {
  if (selected == null) {
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].x == x && pieces[i].y == y) {
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
      if (pieces[i].colour === selected.colour) {
        return;
      } else {
        target = pieces[i];
        t = i;
        return;
      }
    }
  }
}
function removeTarget() {
  print("Fjerner mål");
  pieces[t].update(800, 100);
  pieces[t].isDead = true;
}
function pawnMove(colour) {
  if (target != null) {
  }
  if (colour === "White") {
    var move = 1;
  } else {
    var move = -1;
  }
  if (pmy + P * move == pieces[s].y) {
    if (target == null) {
      if (pmx == pieces[s].x) {
        pieces[s].update(pmx, pmy);
      }
    } else if (target.colour != colour) {
      if (pmx + P == pieces[s].x) {
        pieces[s].update(pmx, pmy);
        removeTarget();
      } else if (pmx - P == pieces[s].x) {
        pieces[s].update(pmx, pmy);
        removeTarget();
      }
    }
  }
}
function kingMove(colour) {
  if (target == null || target.colour != colour) {
    if (
      pmx + 100 == selected.x ||
      pmx == selected.x ||
      pmx - 100 == selected.x
    ) {
      if (
        pmy + 100 == selected.y ||
        pmy == selected.y ||
        pmy - 100 == selected.y
      ) {
        pieces[s].update(pmx, pmy);
      }
      if (target != null && target.colour != colour) {
        removeTarget();
      }
    }
  }
}
