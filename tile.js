class tile {

  constructor(x, y) {
    this.state = 0;
    this.tw = width/3;
    this.th = height/3;
    this.x = x;
    this.y = y;
    this.border = 20;
  }

  setState(s) {
    this.state = s;
    this.show(s);
  }

  show(p) {
    noStroke();
    if (this.state == 1) {
      fill(100, 100, 222);
    } else if (this.state == -1) {
      fill(222, 100, 100);
    } else {
      noFill();
    }
    rect(this.x*this.tw+this.border, this.y*this.th+this.border, this.tw-this.border*2, this.th-this.border*2, 10);
  }
}