let selected = 0;
let tiles = [];
let player = 1; // blau=1
let xSelect = 0;
let ySelect = 0;
let run = true;
let step = 0;
let rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

function setup() {
  tiles = [];
  createCanvas(400, 400);
  background(255);
  grid();
  for (let y=0; y<3; y++) {
    for (let x=0; x<3; x++) {
      tiles.push(new tile(x, y));
    }
  }
}

function grid() {
  strokeWeight(10);
  stroke(0);
  line(width/3, 12, width/3, height-12);
  line(2*width/3, 12, 2*width/3, height-12);
  line(12, height/3, width-12, height/3);
  line(12, 2*height/3, width-12, 2*height/3);
}

function won() {
  if (step == 9) {
    run = false;
  }
  for (let q=0; q<rows.length; q++) {
    fill(255, 200);
    textSize(32);
    textAlign(CENTER, CENTER);
    if (check(rows[q]) == 1) {
      rect(width/2-180, height/2-35, 360, 70, 10);
      fill(0, 102, 245);
      text('BLAU HAT GEWONNEN', width/2, height/2);
      run = false;
    } else if (check(rows[q]) == -1) {
      rect(width/2-180, height/2-35, 360, 70, 10);
      fill(245, 0, 102);
      text('ROT HAT GEWONNEN', width/2, height/2);
      run = false;
    }
  }
}

function check(a) {
  return (tiles[a[0]].state + tiles[a[1]].state + tiles[a[2]].state) / 3;
}

function mousePressed() {
  if (run) {
    xSelect = floor(mouseX/width*3);
    ySelect = floor(mouseY/height*3);


    grid();
    for (let tile of tiles) {
      if (tile.x == xSelect && tile.y==ySelect) {
        if (tile.state == 0 ) {
          tile.setState(player);
          player *= -1;
          step += 1;
          won();
          computer();
        }
      }
    }
  }
}


function computer() {
  if (run) {
    let choice = -1;
    while ((choice<0 || tiles[choice].state != 0) && step<8) {
      if (floor(random(0, 127)) == 1) {
        choice = floor(random(0, 9));
      } else if (floor(random(0, 9)) == 1) {
        for (let row of rows) {
          if (round(check(row), 1) == 0.7) {
            for (let x of row) {
              if (tiles[x].state == 0) {
                choice = x;
                break;
              }
            }
          }
        }
      } else {
        for (let row of rows) {
          if (round(check(row), 1) == -0.7) {
            for (let x of row) {
              if (tiles[x].state == 0) {
                choice = x;
                break;
              }
            }
          }
          if (floor(random(0, 36)) == 1 && round(check(row), 1) == -0.3) {
            for (let x of row) {
              if (tiles[x].state == 0) {
                choice = x;
                break;
              }
            }
          }
        }
        if (step==1) {
          choice = random([0, 2, 6, 8]);
        }
      }
    }
    tiles[choice].setState(player);
    player *= -1;
    step += 1;
    won();
  }
}
