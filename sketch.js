let P,
  n = 8,
  size = 800,
  selected = null,
  target = null,
  s,
  t;
let pmx, pmy, mx, my;
let wPawn = "assets/White/Pawn.png";
let bPawn = "assets/Black/Pawn.png";
let wKing = "assets/White/King.png";
let bKing = "assets/Black/King.png";
let pawns = [],
  kings = [];
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
    pawns[i] = new Pawn(i);
  }
  for (let i = 0; i < 2; i++) {
    kings[i] = new King(i);
  }
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
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    this.img.position(this.x, this.y);
    print("Updated");
  }
}
class King {
  constructor(i) {
    if (i == 0) {
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
    print("Updated");
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
    print("Fuck dig cunt, du er udenfor brættet");
  }
}

function checkSquare(x, y) {
  if (selected == null) {
    for (let i = 0; i < pawns.length; i++) {
      if (pawns[i].x == x && pawns[i].y == y) {
        selected = pawns[i];
        print(x, y);
        print(selected);
        s = i;
      }
    }
    for (let i = 0; i < kings.length; i++) {
      if (kings[i].x == x && kings[i].y == y) {
        selected = kings[i];
        print(x, y);
        print(selected);
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
  for (let i = 0; i < pawns.length; i++) {
    if (pawns[i].x == pmx && pawns[i].y == pmy) {
      if (pawns[i].colour === selected.colour) {
        return;
      } else {
        target = pawns[i];
        t = i;
        return;
      }
    }
  }
}
function pawnMove(colour) {
  print("Move");
  if (target != null) {
    print(target.type, target.colour, target.x, target.y);
  }
  print(pawns[s]);
  if (colour === "White") {
    print("white");
    var move = 1;
  } else {
    var move = -1;
  }
  if (pmy + P * move == pawns[s].y) {
    print("yes2");
    if (target == null) {
      print("Ingen modstander");
      if (pmx == pawns[s].x) {
        print("rykket");
        pawns[s].update(pmx, pmy);
      }
    } else if (target.colour != colour) {
      print("Sort modstander");
      if (pmx + P == pawns[s].x) {
        print("attackleft");
        pawns[s].update(pmx, pmy);
        pawns[t].update(800, 100);
      } else if (pmx - P == pawns[s].x) {
        print("attackright");
        pawns[s].update(pmx, pmy);
        pawns[t].update(800, 100);
      }
    }
  }
}
