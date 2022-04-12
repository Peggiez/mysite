function setup() {
  x = windowWidth / 2; 
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(255, 0, 200);
  textAlign(CENTER);
}

// function draw() {
//   frameRate(180);
//   noStroke(); 
//   background(220, 230, 210);
//   fill(186, 128, 274);
//   ellipse(mouseX, mouseY, 80, 80);
//   ellipse(mouseY, mouseX, 80, 80);
//   fill(86, 28, 74);
//   text("Hold a Ball Version 2", 20, 40); 
// }

var rotateValue = 0;
var hellos = [];
var hello = function(){
    this.x = 0;
    this.y = 0;
    this.s = 30;
    this.decreaseSpeed = 3;
    this.r = 0;
    this.changing = true;
    this.counter = 0;
};
var drawHellos = function(){
    if(random(0, 10)<1 && hellos.length < 15){
        hellos.push(new hello());
    }
    translate(200, 200);
    for(var i = 0; i < hellos.length; i++){
        if(hellos[i].change === true){
            hellos[i].r = rotateValue;
        }
        fill(255);
        rotate(rotateValue);
        rotateValue += 5;
        textSize(hellos[i].s);
        text("HELLO", hellos[i].x, hellos[i].y);
        hellos[i].counter += 0.03;
        if(hellos[i].counter > 1){
            hellos[i].s -= hellos[i].decreaseSpeed;
            hellos[i].change = false;
            hellos[i].y -= 3;
        }
        if(hellos[i].change === true){
            hellos[i].r = rotateValue;
        }
        if(hellos[i].s > 15){
            hellos[i].decreaseSpeed = 1;
        }
        if(hellos[i].s <15 && hellos[i].s > 5){
            hellos[i].decreaseSpeed = 0.3;
        }
        if(hellos[i].s < 5){
            hellos[i].decreaseSpeed = 0.08;
        }
        if(hellos[i].s < 0.5){
            hellos.splice(i, 1);
        }
    }
    resetMatrix();
};
var draw = function(){
    fill(0, 0, 0, 50);
    rect(0, 0, 400, 400);
    drawHellos();
};