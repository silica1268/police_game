var police, pos, vel, acc, wallBounce, border, frame, speed, cones, score, bestScore;

function Cone(pos) {
  this.pos = pos;
  this.update = function(speed) {
    this.pos.y += speed;
  }
  this.show = function() {
    push();
    rectMode(CENTER);
    stroke(0);
    fill(255, 150, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, width*0.05, width*0.015);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, width*0.04, width*0.01);
    noStroke();
    triangle(this.pos.x-width*0.02, this.pos.y, this.pos.x+width*0.02, this.pos.y, this.pos.x, this.pos.y-width*0.05);
    pop();
  }
}

function drawPolice(pos) {
  push();
  noStroke();
  fill(100);
  rectMode(CENTER);
  rect(pos, height/2-width*0.03, width*0.085, width*0.03, width*0.01);
  rect(pos, height/2+width*0.03, width*0.085, width*0.03, width*0.01);
  fill(0);
  rect(pos, height/2, width*0.075, width*0.1, width*0.01);
  fill(200);
  rect(pos, height/2+width*0.005, width*0.065, width*0.05, width*0.01);
  stroke(0);
  strokeWeight(width*0.003);
  fill(255, 0, 0);
  rect(pos-width*0.01, height/2+width*0.005, width*0.02, width*0.01);
  fill(0, 0, 255);
  rect(pos+width*0.01, height/2+width*0.005, width*0.02, width*0.01);
  fill(255, 200, 0);
  ellipse(pos-width*0.02, height/2-width*0.045, width*0.02, width*0.01);
  ellipse(pos+width*0.02, height/2-width*0.045, width*0.02, width*0.01);
  pop();
}

function drawGround(frame) {
  push();
  strokeWeight(3);
  rectMode(CENTER);
  background(0, 150, 0);
  fill(50);
  rect(width/2, height/2, width*0.85, height);
  fill(150);
  rect(border*0.6, height/2, width*0.03, height);
  rect(width-border*0.6, height/2, width*0.03, height);
  fill(255, 200, 0);
  for (i=0; i<4; i++) {
    for (j=0; j<height/(width*0.1)+1; j++) {
      rect(border*0.6+0.2*(width-border*1.2)*(i+1), frame+width*0.1*j, width*0.02, width*0.05);
    }
  }
  pop();
}

function reset() {
  pos = width/2;
  vel = 0;
  acc = width*0.0005;
  frame = 0;
  cones = [];
  score = 0;
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  reset();
  wallBounce = 0.3;
  border = width*0.15;
  speed = 8;
  bestScore = 0;
}

function draw() {
  background(255);
  if (mouseIsPressed && mouseX<width/2) {
    vel -= acc;
  } else if (mouseIsPressed && mouseX>width/2) {
    vel += acc;
  } else {
    vel *= 0.9;
  }
  pos += vel;
  if (pos < border) {
    pos = border;
    vel *= -wallBounce;
  } else if (pos > width-border) {
    pos = width-border;
    vel *= -wallBounce;
  }
  if (frame > width*0.1) {
    frame = 0;
  }
  drawGround(frame);
  frame += speed;
  if (frameCount%floor((width*0.05/speed)*10)==0) {
    score++;
    for (i=0; i<random(9); i++) {
      cones.push(new Cone(createVector((width-border*1.4)/15*floor(random(15))+width*0.13, 0)));
    }
  }
  for (i=cones.length; i>0; i--) {
    cones[i-1].show();
    cones[i-1].update(speed);
    if (cones[i-1].pos.y > height/2-width*0.05 && cones[i-1].pos.y < height/2+width*0.05 && cones[i-1].pos.x+width*0.02 > pos-width*0.037 && cones[i-1].pos.x-width*0.02 < pos+width*0.037) {
      reset();
      break;
    } else if (cones[i-1].pos.y > height) {
      cones.splice(i-1, 1)
    }
  }
  if (score>bestScore) {
    bestScore = score;
  }
  drawPolice(pos);
  push();
  fill(0, 100);
  rect(0, 0, width, width*0.075);
  fill(255);
  textSize(width*0.064);
  stroke(0);
  strokeWeight(5);
  text("Score: "+score, width*0.02, width*0.06);
  text("Best Score: "+bestScore, width-width*0.45, width*0.06);
  pop();
  if (width>height) {
    push();
    fill(255, 0, 0);
    strokeWeight(3);
    rect(0, height-width*0.045, width, width*0.045);
    fill(255);
    textSize(width*0.03);
    textAlign(CENTER);
    text("Put your device vertically to be able to play this game more easily.", width/2, height-width*0.01);
    pop();
  }
}
