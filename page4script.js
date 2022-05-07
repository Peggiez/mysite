function setup() {
  // x = windowWidth / 2; 
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  
}
var x = 200;
var y = 70;
var exponent  = 4;
var step = 0.0095;
var quaffles = [];
var score = 0;
var gameOver = false;
var percentage = 150;
var missed = 0;
var highScore = 0;
var quaffle = function(){
    this.x =  random(0, 400);
    this.y = random(0, 400);
    this.s = 30;
    this.beginX = this.x;
    this.beginY = this.y;
    this.type = random(0, 3);
    if(this.type < 1){
        this.endX = 200;
        this.endY = 100;
    }else if(this.type < 2){
        this.endX = 75;
        this.endY = 200;
    }else{
        this.endX = 325;
        this.endY = 200;
    }
    this.distX = this.endX-this.beginX;
    this.distY = this.endY-this.beginY;
    this.pct = 0.0;
};
var drawHoops = function(){
    stroke(0);
    strokeWeight(5);
    noFill();
    ellipse(200, 100, 100, 100);
    ellipse(75, 200, 100, 100);
    ellipse(325, 200, 100, 100);
    line(75, 250, 75, 400);
    line(200, 150, 200, 400);
    line(325, 250, 325, 400);
    fill(255, 0, 0);
    text("SCORE: " + score, 5, 20);
    fill(0, 255, 0);
    text("Quaffles in canvas: " + quaffles.length, 280, 20);
    fill(0, 0, 255);
    text("Ball spawning percentage: 1 out of " + percentage, 67, 20);
    fill(255, 255, 0);
    text("MISSED: " + missed, 5, 40);
    fill(150, 0, 255);
    text("High Score: " + highScore, 70, 40);
};
var drawCharacter = function(){
    strokeWeight(1);
    fill(255, 0, 0);
    ellipse(x, y+35, 20, 50);
    fill(255, 255, 170);
    ellipse(x, y, 30, 30);
    fill(150, 100, 0);
    ellipse(x, y+60, 20, 20);
};
var keyPressed = function(){
    if(keyCode === 39){
        x = 325;
        y = 170;
    }
    if(keyCode === 38){
        x = 200;
        y = 70;
    }
    if(keyCode === 37){
        x = 75;
        y = 170;
    }
};
var calculateCurveMovement = function(){
    for(var i = 0; i < quaffles.length; i++){
        quaffles[i].pct += step;
        if(quaffles[i].pct < 1.0){
            quaffles[i].x = quaffles[i].beginX + (quaffles[i].pct * quaffles[i].distX);
            quaffles[i].y = quaffles[i].beginY+ (pow(quaffles[i].pct, exponent)*quaffles[i].distY);
        }
    }
};
var drawQuaffle = function(){
    if(random(0, percentage) < 1 && gameOver === false){
        quaffles.push(new quaffle());
    }
    for(var i = 0; i < quaffles.length; i++){
        fill(180, 0, 0);
        ellipse(quaffles[i].x, quaffles[i].y, quaffles[i].s,
        quaffles[i].s);
        if(dist(x, y, quaffles[i].x, quaffles[i].y) < 50 && 
        dist(quaffles[i].x, quaffles[i].y, quaffles[i].endX, quaffles[i].endY)<5){
            score ++;
            quaffles.splice(i, 1);
            if(percentage > 10){
                percentage -= 3;
            }
        }else if(dist(quaffles[i].x, quaffles[i].y, quaffles[i].endX, quaffles[i].endY)<5){
            missed += 1;
            quaffles.splice(i, 1);
            percentage += 5;
       }
      if(missed > 9){
          gameOver = true;
      }
    }
    if(gameOver === true){
        background(0);
        fill(255);
        text("GAME OVER \n click to restart", 100, 150);
        if(score > highScore){
            highScore = score;
        }
        text("High Score:" + highScore, 100, 300);
     }
};
var mouseClicked = function(){
    if(gameOver === true){
        gameOver =  false;
        score = 0;
        missed = 0;
        percentage = 150;
    }
};
var draw = function(){
    background(120, 150, 200);
    drawHoops();
    drawCharacter();
    calculateCurveMovement();
    drawQuaffle();
};
