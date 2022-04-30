let img;
var fillColour;
function preload(){
  img = loadImage('https://tse3.mm.bing.net/th?id=OIP.8po0XFcKnKKKKf2dfRO3TwHaHa&pid=Api&P=0&w=185&h=185')
}
function setup() {
  x = windowWidth / 2; 
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(255, 0, 200);
  rectMode(CENTER);
  fillColour = color(0, 0, 0);
  textAlign(CENTER);
  colorMode(RGB, 255);
colours.push(new colour(10, color(0, 0, 255), "blue"));
colours.push(new colour(30, color(255, 0, 0), "red"));
    colours.push(new colour(50, color(0, 255, 0), "green"));
    colours.push(new colour(70, color(255, 100, 0), "orange"));
    colours.push(new colour(90, color(100, 0, 200), "indigo"));
    colours.push(new colour(110, color(255, 255, 0), "yellow"));
    colours.push(new colour(130, color(255, 0, 255), "purple"));
    colours.push(new colour(150, color(180, 168, 16), "gold"));
    colours.push(new colour(170, color(226, 181, 181), "pink"));
    colours.push(new colour(190, color(0, 255, 255), "turquois"));
  imageMode(CENTER);
}
//Used GUI slider code
var colours = [];
var squares = [];
var opacity = 255;
var dots = [];
var erasers = [];
var squareIndex = 0;
var sizething = 400;
// var img = getImage("minecraft/creeper");
var rotateImage = 0;
var dot = function(){
    this.x = mouseX;
    this.y = mouseY;
    this.c = fillColour;
    this.o = opacity;
};
var colour = function(x, colouring, name){
    this.x = x;
    this.colouring = colouring;
    this.name = name;
};
var square = function(){
    this.rotating = false;
    this.rotationValue = 0;
    this.changeSize = false;
    this.w = 30;
    this.h = 30;
    this.streched = false;
    this.selected = false;
    this.x = mouseX;
    this.y = mouseY;
    this.currentc = fillColour;
    this.currento = opacity;
    this.choice = 0;
};
var row1 = sizething-10;
var selectorX = -100;
var selectedToolmode = "pencil";
var toolValue = 1;
var sliderX = 300;
var sliderY = 390;
var drawChoices = function(){
    colorMode(RGB, 255);
    for(var i = 0; i < colours.length; i++){
        fill(colours[i].colouring);
        rect(colours[i].x, row1, 20, 20);
    }
};
var drawBar = function(){
    colorMode(RGB, 255);
    noStroke();
    scale(0.3);
    translate(770, 1100);
    fill(200, 100, 10);
    ellipse(50, 200, 50, 50);
    ellipse(350, 200, 50, 50);
    rect(200, 200, 300, 50);
    fill(0, 0, 255);
    resetMatrix();
    ellipse(sliderX, sliderY, 15, 15);
};
var drawDot = function(){
    colorMode(RGB, 255);
    if(mouseX > 245 && mouseX < 338 && mouseY > 380 && mouseY < 396){
        sliderX = mouseX;
    }
    sliderY = 390;
    opacity = (sliderX-245)*4;
};
var selectMode = function(){
    colorMode(RGB, 255);
    if(toolValue === 1){
        selectedToolmode = "pencil";
    }
    if(toolValue === 2){
        selectedToolmode = "eraser";
    }
    if(toolValue === 3){
        selectedToolmode = "square";
    }
    if(toolValue === 4){
        selectedToolmode = "mouse";
    }
};
var modes = function(){
    colorMode(RGB, 255);
    for(var i = 0; i < dots.length; i++){
        if(selectedToolmode === "pencil" && mouseY < 370){
            fill(dots[i].c, dots[i].o);
            ellipse(dots[i].x, dots[i].y, 10, 10);
        }
        if(selectedToolmode === "eraser" && mouseY < 370){
            fill(dots[i].c, dots[i].o);
            ellipse(dots[i].x, dots[i].y, 10, 10);
            if(dist(mouseX, mouseY, dots[i].x, dots[i].y)< 15){
                dots.splice(i, 1);
            }
            for(var j = 0; j < squares.length; j ++){
                if(dist(mouseX, mouseY, squares[j].x, 
                squares[j].y) < 5){
                    squares.splice(j, 1);
                }
            }
        }
    }
};
var streched2 = false;
var drawSquare = function(){
    colorMode(RGB, 255);
    for(var i = 0; i < squares.length; i++){
        fill(squares[i].currentc);
        translate(squares[i].x, squares[i].y);
        rotate(squares[i].rotationValue);
        if(squares[i].choice === 0){
            rect(0, 0, squares[i].w, squares[i].h);
        }else if(squares[i].choice === 1){
            ellipse(0, 0, squares[i].w, squares[i].h);
        }
        resetMatrix();
        fill(255);
        text(squares[i].selected, squares[i].x, squares[i].y, 20);
        if(dist(mouseX, mouseY, squares[i].x, squares[i].y)
                          < (squares[i].w+squares[i].h)/2){
            squares[i].selected = true;
        }else{
            squares[i].selected = false;
        }
        if(squares[i].selected === true && mouseIsPressed){
            streched2 = true;
        }
    }
};
var drawSquare2 = function(){
    colorMode(RGB, 255);
    for(var i = 0; i < squares.length; i++){
        if(dist(mouseX, mouseY, squares[i].x, squares[i].y)>30){
            squares[i].streched = false;
        }
    }
};
var textx = 500;
var texts = 5;
var textsize = 13;
var texts2 = 0.1;
var imgsize = 30;
var imgs = 3;
var othershapes = function(){
    colorMode(RGB, 255);
    translate(20, 50);
    rotate(rotateImage);
    image(img, 0, 0, imgsize, imgsize);
    resetMatrix();
    translate(370, 50);
    rotate(rotateImage);
    image(img, 0, 0, imgsize, imgsize);
    imgsize -= imgs;
    if(imgsize < 20 || imgsize > 40){
        imgs = -imgs;
    }
    rotateImage += 5;
    resetMatrix();
    fill(0, 0, 255);
    textSize(textsize);
    text("Drag to draw dots or erasers, click for rectangles, and click and press down for circles", textx, 100);
    textx -= texts;
    if(textx < -100 || textx > 500){
        texts = -texts;
    }
    textsize -= texts2;
    if(textsize < 11 || textsize > 15){
        texts2 = -texts2;
    }
    textSize(13);
};
var bordering=false;
var border = function(){
    colorMode(RGB, 255);
    if(bordering === true){
        noFill();
        strokeWeight(5);
        stroke(fillColour);
        rect(199, 199, 395, 395);
    }
};
var caption = false;
var hsbcolour = 0;
var rainbow = false;
var newtext = false;
var captionsy = 375;
var captions = function(){
    colorMode(HSB, 400);
    fill(hsbcolour, 400, 400);
    rect(375, 375, 50, 50);
    fill(0);
    textSize(10);
    text("CAPTIONS", 375, captionsy);
    if(caption === true){
        var answer = prompt("Caption?", "rainbow");
        if(answer === "rainbow" || answer === "Rainbow"){
            rainbow = true;
        }
        if(answer === "new text" || answer === "New text"){
            newtext = true;
        }
        caption = false;
    }
    if(rainbow === true){
        hsbcolour += 1;
    }
    if(hsbcolour === 400){
        hsbcolour = 0;
        rainbow = false;
    }
    if(newtext === true){
        captionsy += 1;
        if(captionsy === 430){
            captionsy = 375;
            newtext = false;
        }
        text("CHANGED", 375, 375);
    }
    
};
var mousemode = function(){
    colorMode(RGB, 255);
    if(selectedToolmode === "mouse"){
        cursor(WAIT);
    }else{
        cursor(HAND);
    }
};
var draw = function(){
    colorMode(RGB, 255);
    // size(sizething, sizething);
    background(255);
    fill(0);
    textSize(13);
    text("Press 1 for the pencil lair, 2 for the eraser, 3 to get a square lair, \n  and 4 for mouse mode \n 5 is for blue, 6 is for red, and 7 is for green", 190, 20);
    drawChoices();
    drawBar();
    selectMode();
    drawSquare();
    modes();
    drawSquare2();
    mousemode();
    border();
    othershapes();
    captions();
};
var mouseClicked = function(){
    colorMode(RGB, 255);
    for(var i = 0; i < colours.length; i++){
        if(dist(mouseX, mouseY, colours[i].x, row1) < 10){
            fillColour = colours[i].colouring;
        }
    }
    if(selectedToolmode === "square" && mouseY < 370 && streched2 === false){
        squares.push(new square());
    }
    if(mouseX > 350 && mouseY > 350){
        caption = true;
    }
    mousemode();
};
var keyPressed = function(){
    colorMode(RGB, 255);
    if(keyCode === 49){
        toolValue = 1;
    }
    if(keyCode === 50){
        toolValue = 2;
    }
    if(keyCode === 51){
        toolValue = 3;
    }
    if(keyCode === 52){
        toolValue = 4;
    }
    for(var i = 0; i < squares.length; i++){
        if(keyCode === 187 && squares[i].selected === true){
            squares[i].w += 1;
            squares[i].h += 1;
        }
        if(keyCode === 189 && squares[i].selected === true){
            squares[i].w -= 1;
            squares[i].h -= 1;
        }
        if(keyCode === 38 && squares[i].selected === true){
            squares[i].choice = 0;
        }
        if(keyCode === 40 && squares[i].selected === true){
            squares[i].choice = 1;
        }
        if(keyCode === 39 && squares[i].selected === true){
            squares[i].rotationValue += 1;
        }
        if(keyCode === 39 && squares[i].streched === true){
            squares[i].h += 1;
        }
        if(keyCode === 37 && squares[i].selected === true){
            squares[i].rotationValue -= 1;
        }
        if(keyCode === 37 && squares[i].streched === true){
            squares[i].h -= 1;
        }
    }
    if(keyCode === 76){
        sizething += 100;
        row1 = sizething-10;
        
    }
    if(keyCode === 83){
        sizething -= 100;
        row1 = sizething-10;
        sliderY = sizething-10;
    }
    if(keyCode === 66){
        bordering = !bordering;
    }
    if(keyCode===53){
        fillColour = color(0, 0, 255);
    }
    if(keyCode === 54){
        fillColour = color(255, 0, 0);
    }
    if(keyCode === 55){
        fillColour = color(0, 255, 0);
    }
};
var mouseDragged = function(){
    colorMode(RGB, 255);
    drawDot();
    if(selectedToolmode === "pencil" || selectedToolmode === "eraser"&& mouseY < 370){
        dots.push(new dot());
    }
    for(var i  = 0; i < squares.length; i++){
        if(selectedToolmode === "square" && dist(mouseX, mouseY, 
        squares[i].x, squares[i].y) < 10){
            squares[i].streched = true;
        }
    }
};
