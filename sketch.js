let ball_diameter = 50;
let zapperwidth = 6;
let bomb_diameter = 20;
let xpoint;
let ypoint;
let posX;
let numofbombs = 20;
let bombposX = [];
let bombposY = [];
let bombacceleration = [];
let bombvelocity = [];
let time = 0;
let timeperiod = 0;
let score = ceil(frameCount / 5);
let level = 1;






function setup() {

    createCanvas(1000, width);
    let time00 = 0;
    let time01 = -20;
    while (time01 < height) {
        time00 += 0.02;
        time01 += time00;
        timeperiod++;
    }
    posX = zapperwidth + 0.5 * ball_diameter - 2;
    xpoint = 0.5 * width;
    ypoint = height - 0.5 * ball_diameter + 1;
    initbobmpos();
    
   





}

function draw() {
    
    background(0);
    fill(239, 58, 38);
    rect(0, 0, zapperwidth, height);
    scoreUpdate();
    

    fill(255, 127, 50);


    for (let i = 0; i < numofbombs; i++) {
        ellipse(bombposX[i], bombposY[i], bomb_diameter, bomb_diameter)

    }

    updatebombspos();
    fill(0, 255, 0);
    ellipse(xpoint, ypoint, ball_diameter, ball_diameter);
    xpoint -= 3;

    if (keyIsDown(32) && (xpoint + 0.5 * ball_diameter) < width) {
        xpoint += 10;
        
    }
    if (xpoint < posX || bombCollisionTest()) {

        gameover();

    }

    time++;

}


    

function initbobmpos() {
    for (let i = 0; i < numofbombs; i++) {
        bombacceleration[i] = random(0.02, 0.03);
        bombvelocity[i] = random(0, 5);
        bombposX[i] = random(zapperwidth + (0.5 * ball_diameter), width);
        bombposY[i] = (-20, -0.5 * ball_diameter);

    }
}

function gameover() {
    fill(255);
    text('GAME OVER', 0.5 * width, 0.5 * height);
    noLoop();
}

function updatebombspos() {

    for (let i = 0; i < numofbombs; i++) {
        bombvelocity[i] += bombacceleration[i];
        bombposY[i] += bombvelocity[i];

    }

    if (time > timeperiod) {

        initbobmpos();
        time = 0;

    }
    numofbombs += (0.05/2);
   

}

function bombCollisionTest() {

    let temp = 0.5 * (ball_diameter + bomb_diameter) - 2;
    let distance;
    for (let i = 0; i < numofbombs; i++) {

        distance = dist(xpoint, ypoint, bombposX[i], bombposY[i])
        if (distance < temp) {
            return true;
        }
    }
    return false;
}


function scoreUpdate() {

    let score = ceil(frameCount / 5);
    fill(255);
    textSize(32);
    text("Score:", 8, 50);
    textSize(32);
    text(score, 100, 50);
}
