var dayIndex;
function setup() {
  // x = windowWidth / 2; 
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  var backgroundcolour = color(r, g, b);
  dayIndex = day();
  // chosenFont = 'Helvetica';
  textAlign(CENTER);
}
//Basic setup:
var plannerState = "givename";
var r = 0;
var g = 0;
var b = 70;

var opacity = 255;
var changeBackground = false;
//Opening page:
var userName = 0;
var askForName = false;
var answeredNameQuestion = false;
//Visual of day:
var endingOfWord = "th";
var monthWord = "Janurary";
//Conflict Notification
var timer = 0;
var snooze = false;
//legend
var makeSpecial = "";
var makingSpecial = false;
//calendar

var days = [];
var numberOfDays = 31;
var chooseEvent = false;
var Day = function(date){
    this.tasks = [];
    this.date = date;
    this.x = 0;
    this.y = 0;
    this.selected = true;
};
for(var i = 0; i < numberOfDays; i++){
    days.push(new Day(days.length));
}
var task = function(tasktime, y, day){
    this.set = true;
    this.name = "";
    this.answered = false;
    this.time = tasktime;
    this.notify = false;
    this.selectedcolour = 0;
    this.c = color(0, 0, 0);
    this.special = "(Special)";
    this.y = y;
    this.isSpecial = false;
    this.taskday = day; 
};
var answeredTaskQuestion = false;
var addtask = false;
var changetask = false;
var changedtask = "";
var changednewtask = "";

var choosingFont = false;
//Call the functions:

var givethename = function(){
    fill(255, 255, 100);
    text("Hello, it is the year "+ year(), 200, 100);
    text("CLICK ON THE BUTTON TO INPUT YOUR NAME:", 200, 130);
    fill(100, 170, 100);
    rect(60, 150, 280, 50, 50);
    fill(255);
    text("INPUT NAME", 200, 180); 
    if(askForName === true){
        userName = prompt("What is your name?");
        askForName = false;
    }
    if(answeredNameQuestion === true){
        fill(255, 255, 0);
        text("Hello " + userName + "!", 200, 230);
        text("You can always come back to change your name. \n Ready to continue? \n If yes, press the button below", 200, 270);
        fill(200, 0, 200);
        rect(60, 310, 280, 50, 50);
        fill(255);
        text("CONTINUE >>", 200, 340);
    }
    if(changeBackground === true){
        r += 0.5;
        g += 0.5;
    }
    if(r > 50 && changeBackground === true){
        changeBackground = false;
    }
};
var todolist = function(){
    if(changeBackground === true){
        g += 0.5;
    }
    if(g > 100){
        changeBackground = false;
    }
    if(changeBackground === true && b > 0){
        b -= 3;
    }
    if((dayIndex+1) === 1 || (dayIndex+1) === 21 || dayIndex+1 === 31){
        endingOfWord = "st";
    }else if(dayIndex+1 === 2 || dayIndex+1 === 22){
        endingOfWord = "nd";
    }else if(dayIndex+1 === 3 || dayIndex+1 === 23){
        endingOfWord = "rd";
    }else{
        endingOfWord = "th";
    }
    if(month() === 1){
        monthWord = "Janurary";
    }
    if(month()===2){
        monthWord = "Feburary";
    }
    if(month() === 3){
        monthWord = "March";
    }
    if(month() === 4){
        monthWord = "April";
    }
    if(month() === 5){
        monthWord = "May";
    }
    if(month()===6){
        monthWord = "June";
    }
    if(month() === 7){
        monthWord = "July";
    }
    if(month() === 8){
        monthWord = "August";
    }
    if(month() === 9){
        monthWord = "September";
    }
    if(month() === 10){
        monthWord = "October";
    }
    if(month() === 11){
        monthWord = "November";
    }
    if(month() === 12){
        monthWord = "December";
    }
    fill(255);
    textSize(20);
    text(monthWord +" " + (dayIndex+1) + endingOfWord, 200, 30);
    textSize(12);
    var time = 0;
    for(var i = 0; i < 13; i++){
        fill(255, 0, 255, 50);
        rect(20, i*26+45, 130, 26);
        fill(255, 255, 0, 50);
        rect(150, i*26+45, 230, 26);
        fill(0);
        if(i < 2){
            time = i+8;
            text(time + "  AM", 40, i*26+63);
        }else if(i < 5){
            time = i+8;
            text(time + " AM", 40, i*26+63);
        }else{
            time = i-4;
            text(time + "  PM", 40, i*26+63);
        }
    }
    if(days[dayIndex].tasks.length < 13 && addtask === true){
        days[dayIndex].tasks.push(new task(days[dayIndex].tasks.length+8, days[dayIndex].tasks.length * 26+63, dayIndex));
        addtask = false;
    }
    fill(255, 0, 255);
    rect(0, 0, 30, 30);
    rect(370, 0, 30, 30);
    fill(200, 150, 0);
    rect(340, 0, 30, 30);
    fill(0);
    text("Add \n task", 15, 15);
    textSize(8);
    text("Change \n task", 385, 15);
    text("Change \n font", 355, 15);
    textSize(12);
    if(changetask === true){
        changedtask = prompt("what is the time of the task you want to change");
        changednewtask = prompt("what will the new task be");
        changetask = false;
    }
    for(var j = 0; j < days[dayIndex].tasks.length; j++){
        if(days[dayIndex].tasks[j].answered === false){
            days[dayIndex].tasks[j].name = prompt("What do you want to do here?");
            days[dayIndex].tasks[j].selectedcolour = prompt("Is this a work, fun, or urgent event? (0 for work, 1 for fun, 2 for urgent)");
            days[dayIndex].tasks[j].answered = true;
        }
        if(days[dayIndex].tasks[j].selectedcolour === String(0)){
            days[dayIndex].tasks[j].c = color(0, 0, 0);
        }
        if(days[dayIndex].tasks[j].selectedcolour === "1"){
            days[dayIndex].tasks[j].c = color(0, 0, 255);
        }
        if(days[dayIndex].tasks[j].selectedcolour === "2"){
            days[dayIndex].tasks[j].c = color(255, 0, 0);
        }
        if(changedtask === String(days[dayIndex].tasks[j].time)){
            days[dayIndex].tasks[j].name = changednewtask;
        }
        
        
        fill(days[dayIndex].tasks[j].c);
        text(days[dayIndex].tasks[j].name, 260, j*26+63);
        if(days[dayIndex].tasks[j].isSpecial === true){
            text("(special)", 350, j*26+63);
        }
        
        
        if(days[dayIndex].tasks[j].time === hour() && days[dayIndex].tasks[j].name !== "" && days[dayIndex].tasks[j].name !== null){
            days[dayIndex].tasks[j].notify = true;
        }
        if(days[dayIndex].tasks[j].notify === true && snooze === false){
            fill(255, 255, 0, 100);
            rect(100, 100, 200, 200);
            fill(0);
            text(days[dayIndex].tasks[j].name + " is happening now!", 200, 200);
            text("SNOOZE", 200, 250);
        }
        if(days[dayIndex].tasks[j].notify === true && dist(mouseX, mouseY, 200, 250) < 30){
            snooze = true;
        }
        if(snooze === true){
            days[dayIndex].tasks[j].notify = false;
            timer ++;
        }
        if(timer > 468000){
            snooze = false;
            days[dayIndex].tasks[j].notify = true;
            timer = 0;
        }
        if(String(days[dayIndex].tasks[j].time) === makeSpecial){
            fill(0);
            text("(special)", 350, days[dayIndex].tasks[j].y);
            days[dayIndex].tasks[j].isSpecial = true;
        }
    }
    fill(100, 150, 255);
    rect(30, 0, 30, 30);
    fill(0);
    text("Add \n image", 45, 15);
    if(choosingFont === true){
        chosenFont = prompt("What font do you want to use?");
        fontUsed = createFont(chosenFont);
        choosingFont = false;
    }
    fill(200, 0, 0);
    rect(310, 0, 30, 30);
    fill(0);
    text("Clear \n List", 325, 15);
    fill(0, 0, 200);
    rect(280, 0, 30, 30);
    rect(90, 0, 30, 30);
    textSize(8);
    fill(0);
    text("Mark \n Special", 295, 15);
    text("Go to \n calendar", 105, 15);
    textSize(11);
    line(90, 30, 60, 30);
    if(makingSpecial === true){
        makeSpecial = prompt("What time is the task you want to make special?");
        makingSpecial = false;
    }
};
var setcalendarScreen = function(){
    if(changeBackground === true){
        b += 3;
    }
    if(month() === 1 || month()=== 3 || month() === 5 || month() === 7 
    || month() === 8 || month() === 10 || month() === 12){
        numberOfDays = 31;
    }
    if(month() === 4 || month() === 6 || month() === 9 || month() === 11){
        numberOfDays = 30;
    }
    if(month() === 2){
        numberOfDays = 28;
    }
};
var drawCalendarScreen = function(){
    for(var i = 0; i < days.length; i++){
        fill(100, 0, 100, 50);
        days[i].x = (i%7)*50+15;
        days[i].y = floor(i/7)*50+100;
        rect(days[i].x, days[i].y, 50, 50);
        fill(0);
        text(i+1, days[i].x+10, days[i].y+15);
        if(days[i].selected === true){
            dayIndex = i;
            plannerState = "makelist";
        }
        fill(255, 0, 255);
        rect(0, 0, 30, 30);
        fill(255);
        textSize(9);
        text("Find \n task", 15, 12);
        textSize(11);
    }
};
var taskFoundTime = 0;
var taskFoundDay = 0;
var selectEvent= function(){
    var selectedTask = "";
    
    if(chooseEvent === true){
        selectedTask = prompt("Which task to you want to select");
        
        for(var i = 0; i < days.length; i++){
            for(var j =0; j < days[i].tasks.length; j++){
                if(selectedTask === days[i].tasks[j].name){
                    taskFoundDay = (days[i].tasks[j].taskday)+1;
                    taskFoundTime = days[i].tasks[j].time; // days[i].tasks[j].tasktime;
                }
            }
        }
            chooseEvent = false; 
    }
    fill(255, 255, 0);
    text("That is on " + taskFoundDay + " at " + taskFoundTime, 200, 350);
};
var draw = function(){
    backgroundcolour = color(r, g, b);
    fill(backgroundcolour, opacity);
    rect(0, 0, 400, 400);
    textFont('Helvetica');
    if(plannerState === "givename"){
        givethename();
        // todolist();
        if(r < 50){
            changeBackground = true;
        }
    }
    if(plannerState === "makelist"){
        todolist();
        if(g < 100){
            changeBackground = true;
        }
    }
    if(plannerState === "Gotocalendar"){
        setcalendarScreen();
        drawCalendarScreen();
        selectEvent();
        if(b < 100){
            changeBackground = true;
        }
    }
};
var mouseClicked = function(){
    if(plannerState === "givename"){
        if(mouseX > 60 && mouseY > 150 && mouseX < 340 && mouseY <200){
            askForName = true;
            answeredNameQuestion = true;
            
        }
    }
        if(mouseX > 60 && mouseY > 310 && mouseX < 340 && mouseY < 360 && plannerState === "givename"){
            plannerState = "makelist";
        }
        if(mouseX < 30 && mouseY < 30 && plannerState === "makelist"){
            addtask = true;
        }
        if(mouseX > 370 && mouseY < 30 && plannerState === "makelist"){
            changetask = true;
        }
        if(mouseX > 310&&mouseY < 30 && mouseX < 340 && plannerState === "makelist"){
            days[dayIndex].tasks.splice(0, days[dayIndex].tasks.length);
        }
        if(mouseX > 280 && mouseY < 30 && mouseX < 310 && plannerState === "makelist"){
            makingSpecial = true;
        }
        if(mouseX > 90 && mouseY < 30 && mouseX < 120 && plannerState === "makelist"){
            plannerState = "Gotocalendar";
            for(var j = 0; j < days.length; j++){
                days[j].selected = false;
            }  
        }
        for(var i = 0; i < days.length; i++){
            if(dist(mouseX, mouseY, days[i].x+25, days[i].y+25) < 25 && plannerState === "Gotocalendar"){
                days[i].selected = true;
            }
        }
        if(mouseX < 30 && mouseY < 30 && plannerState === "Gotocalendar"){
            chooseEvent = true;
        }
        
};
