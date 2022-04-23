function setup() {
  x = windowWidth / 2; 
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(255, 0, 200);
  noStroke();
  angleMode(DEGREES);
}
var penguins = [];
var penguin = function(){
    this.x = 400 + random(-5, 6);
    this.xSpeed = 3;
    this.y = 75 + random(-1, 1);
    this.ySpeed = 2.5;
    this.c = random(0, 200);
    this.rotateValue = 50;
    this.s = random(0.7, 1.3);
};
var krills = [];
var krill = function(){
    this.x =  random(0, 160);
    this.y = random(350, 400);
    this.beginX = this.x;
    this.beginY = this.y;
    this.endX = random(0, 150);
    this.endY = random(350, 400);
    this.distX = this.endX-this.beginX;
    this.distY = this.endY-this.beginY;
    this.pct = 0.0;
};
var count = 0;
var exponent  = 4;
var step = 0.0125;
var iceberg = function(){
    fill(255);
    quad(400, 80, 180, 260, 150, 400,       400, 400);
    fill(100, 200, 255);
    quad(0, 350, 160, 350, 150, 400, 0,     400);
    fill(255, 255, 0);
    ellipse(30, 30, 30, 30);
};
var calculateCurveMovement = function(){
    for(var i = 0; i < krills.length;       i++){
        krills[i].pct += step;
        if(krills[i].pct < 1){
            krills[i].x =                           krills[i].beginX +                (krills[i].pct*krills[i].distX);
            krills[i].y = krills[i].beginY+(pow(krills[i].pct, exponent)*krills[i].distY);
        }
    }
};
var addNewPoint = function(i){
    // for(var i = 0; i < krills.length; i++){
        krills[i].pct = 0.0;
        krills[i].beginX = krills[i].x;
        krills[i].beginY = krills[i].y;
        krills[i].endX = random(0, 160);
        krills[i].endY = random(350, 400);
        krills[i].distX = krills[i].endX-krills[i].beginX;
        krills[i].distY = krills[i].endY-krills[i].beginY;
    // }
};
var drawKrills = function(){
    if(krills.length < 50){
        krills.push(new krill());
    }
    for(var i = 0; i < krills.length; i++){
        fill(255, 0, 0, 100);
        ellipse(krills[i].x, krills[i].y, 3, 3);
        if(dist(krills[i].x, krills[i].y, krills[i].endX, krills[i].endY)<5){
            addNewPoint(i);
        }
    }
};
var drawPenguins = function(){
    if(penguins.length < 12 && count > 1){
        penguins.push(new penguin());
        count = 0;
    }
    for(var i = 0; i < penguins.length; i++){
        translate(penguins[i].x, penguins[i].y);
        rotate(penguins[i].rotateValue);
        fill(penguins[i].c);
        ellipse(0, 0, 15*penguins[i].s, 25*penguins[i].s);
        fill(255);
        ellipse(5*penguins[i].s, 0, 7*penguins[i].s, 20*penguins[i].s);
        fill(255, 255, 0);
        rect(0, 10*penguins[i].s, 3*penguins[i].s, 3*penguins[i].s);
        rect(0, -15*penguins[i].s, 3*penguins[i].s, 3*penguins[i].s);
        rect(-5*penguins[i].s, -15*penguins[i].s, 3*penguins[i].s, 3*penguins[i].s);
        penguins[i].x -= penguins[i].xSpeed;
        penguins[i].y += penguins[i].ySpeed;
        if(penguins[i].x < 120 && penguins[i].y > 300){
            penguins[i].rotateValue = 40;
            penguins[i].ySpeed = 5;
        }
        if(penguins[i].x < 81 && penguins[i].y > 340){
            penguins[i].rotateValue = 90;
            penguins[i].ySpeed = 0;
        }
        if(penguins[i].x < -50){
            penguins[i].rotateValue = 50;
            penguins[i].xSpeed = 3;
            penguins[i].ySpeed = 2.5;
            penguins[i].x = 400 + random(-5, 6);
            penguins[i].y = 75;
        }
        resetMatrix();
    }
    count += random(0.01, 0.05);
};
var draw = function(){
    background(100, 100, 255);
    iceberg(); 
    calculateCurveMovement();
    drawKrills();
    drawPenguins();
};