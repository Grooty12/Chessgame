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
    piecePos[this.x / P][this.y / P] = i;
  }
  update(x, y) {
    if (x < size) {
      piecePos[x / P][y / P] = piecePos[this.x / P][this.y / P];
      piecePos[this.x / P][this.y / P] = null;
    }
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
    piecePos[this.x / P][this.y / P] = i;
  }
  update(x, y) {
    if (x < size) {
      piecePos[x / P][y / P] = piecePos[this.x / P][this.y / P];
      piecePos[this.x / P][this.y / P] = null;
    }
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
    piecePos[this.x / P][this.y / P] = i;
  }
  update(x, y) {
    if (x < size) {
      piecePos[x / P][y / P] = piecePos[this.x / P][this.y / P];
      piecePos[this.x / P][this.y / P] = null;
    }
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
    piecePos[this.x / P][this.y / P] = i;
  }
  update(x, y) {
    if (x < size) {
      piecePos[x / P][y / P] = piecePos[this.x / P][this.y / P];
      piecePos[this.x / P][this.y / P] = null;
    }
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
    piecePos[this.x / P][this.y / P] = i;
  }
  update(x, y) {
    if (x < size) {
      piecePos[x / P][y / P] = piecePos[this.x / P][this.y / P];
      piecePos[this.x / P][this.y / P] = null;
    }
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
    piecePos[this.x / P][this.y / P] = i;
  }
  update(x, y) {
    if (x < size) {
      piecePos[x / P][y / P] = piecePos[this.x / P][this.y / P];
      piecePos[this.x / P][this.y / P] = null;
    }
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    this.img.position(this.x, this.y);
  }
}
