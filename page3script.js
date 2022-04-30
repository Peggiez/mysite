function setup() {
  x = windowWidth / 2; 
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  
}
//Used moving on curves project to help
var fireflies = [];
var exponent  = 4;
var step = 0.0125;
var calculateCurveMovement = function(){
    for(var i = 0; i < fireflies.length; i++){
        fireflies[i].pct += step;
        if(fireflies[i].pct < 1){
            fireflies[i].x = fireflies[i].beginX + (fireflies[i].pct*fireflies[i].distX);
            fireflies[i].y = fireflies[i].beginY+(pow(fireflies[i].pct, exponent)*fireflies[i].distY);
        }
    }
};
var addNewPoint = function(){
    for(var i = 0; i < fireflies.length; i++){
        fireflies[i].pct = 0.0;
        fireflies[i].beginX = fireflies[i].x;
        fireflies[i].beginY = fireflies[i].y;
        fireflies[i].distX = fireflies[i].endX-fireflies[i].beginX;
        fireflies[i].distY = fireflies[i].endY-fireflies[i].beginY;
    }
};
var firefly = function(){
    this.x =  random(0, 400);
    this.y = random(0, 400);
    this.t = 255;
    this.s = random(7, 10);
    this.beginX = this.x;
    this.beginY = this.y;
    this.endX = random(0, 400);
    this.endY = random(0, 400);
    this.distX = this.endX-this.beginX;
    this.distY = this.endY-this.beginY;
    this.pct = 0.0;
};
var drawFirefly = function(){
    if(random(0, 10)<3){
        fireflies.push(new firefly());
    }
    for(var i = 0; i < fireflies.length; i++){
        fill(255, 255, random(150, 255), fireflies[i].t);
        ellipse(fireflies[i].x, fireflies[i].y, fireflies[i].s, fireflies[i].s);
        fireflies[i].t -= 4;
        fireflies[i].x += random(-1, 1);
        fireflies[i].y += random(-1, 1);
        if(fireflies[i].t <0){
            fireflies.splice(i, 1);
        }
    }
};
var draw = function(){
    background(0);
    drawFirefly();
    calculateCurveMovement();
    // addNewPoint();
};
