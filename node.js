class Node {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.difference = 0;
    this.depth = 0;
  }

  puzzleDiff(puz) {
    let diff = 0;
    const val = puz.values;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          this.puzzle.values[i][j] != val[i][j] &&
          this.puzzle.values[i][j] != 0
        ) {
          diff++;
        }
      }
    }
    return diff;
  }

  derivatives() {
    let p = [];
    let boards = [];
    p[0] = createVector(this.pos.x + 1, this.pos.y);
    p[1] = createVector(this.pos.x, this.pos.y + 1);
    p[2] = createVector(this.pos.x - 1, this.pos.y);
    p[3] = createVector(this.pos.x, this.pos.y - 1);
    for (let i = 0; i < 4; i++) {
      if (
        !(p[i].x < 0 || p[i].x >= this.gw || p[i].y < 0 || p[i].y >= this.gh)
      ) {
        let val = this.copyarr(this.values);
        let temp = val[p[i].y][p[i].x];
        val[p[i].y][p[i].x] = val[this.pos.y][this.pos.x];
        val[this.pos.y][this.pos.x] = temp;
        boards.push(new Puzzle(val, 100));
      }
    }
    return boards;
  }
}
