class Block {
  constructor(x, y, value, w, h) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sp = 5;
    this.destination = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.moving = false;
    this.texts = (w * 36) / 100;
  }

  show() {
    if (this.value != 0) {
      push();
      stroke(133, 94, 66);
      fill(248, 223, 161);
      if (this.moving) {
        this.x += this.direction.x * this.sp;
        this.y += this.direction.y * this.sp;
        if (this.x == this.destination.x && this.y == this.destination.y) {
          this.moving = false;
          //clack.play();
        }
      }
      rect(this.x, this.y, this.w, this.h);
      textAlign(CENTER, CENTER);
      textSize(this.texts);
      stroke(0);
      fill(0);
      text(this.value, this.x, this.y, this.w, this.h);
      pop();
    }
  }

  move(dest, dir) {
    this.moving = true;
    this.destination = dest;
    this.direction = dir;
  }
}
