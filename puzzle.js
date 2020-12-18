class Puzzle {
  constructor(values, size) {
    /* Grid contains the Block objects while values contains the numbers */
    this.grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.values = values;
    this.gw = 3;
    this.gh = 3;
    this.width = size / this.gw;
    this.height = size / this.gh;
    for (let i = 0; i < this.gw; i++) {
      for (let j = 0; j < this.gh; j++) {
        if (values[i][j] == 0) {
          this.pos = createVector(i, j);
        }
        this.grid[i][j] = new Block(
          j * this.width,
          i * this.height,
          values[i][j],
          this.width,
          this.height
        );
      }
    }
  }

  move(v, h) {
    let i = this.pos.y + v;
    let j = this.pos.x + h;
    if (i >= this.gh || j >= this.gh || i < 0 || j < 0) {
      console.log("nel");
    } else {
      let temp = this.grid[i][j];
      if (!temp.moving) {
        this.grid[i][j].move(
          createVector(this.pos.x * this.width, this.pos.y * this.height),
          createVector(-h, -v)
        );
        this.grid[i][j] = this.grid[this.pos.y][this.pos.x];
        this.grid[this.pos.y][this.pos.x] = temp;
        this.values[i][j] = this.values[this.pos.y][this.pos.x];
        this.values[this.pos.y][this.pos.x] = temp.value;
        this.pos.x = j;
        this.pos.y = i;
      }
    }
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

  copyarr(val) {
    let res = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (let indexi = 0; indexi < 3; indexi++) {
      for (let indexj = 0; indexj < 3; indexj++) {
        res[indexi][indexj] = val[indexi][indexj];
      }
    }
    return res;
  }

  show() {
    //68, 48, 34
    fill(133, 94, 66);
    rect(0, 0, this.gw * this.width, this.gh * this.height);
    for (let i = 0; i < this.gh; i++) {
      for (let j = 0; j < this.gw; j++) {
        this.grid[i][j].show();
      }
    }
  }
}
