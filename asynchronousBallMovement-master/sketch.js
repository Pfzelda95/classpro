var Ball;
var database,Position;
var ballPosition;
function setup(){
    database = firebase.database();

    createCanvas(500,500);
    Ball = createSprite(250,250,10,10);
    Ball.shapeColor = "red";


     ballposition =  database.ref('ball/position');
    ballposition.on("value",readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : Position.x + x,
        'y' : Position.y + y
    })
}
function readPosition(data){
    Position = data.val();

    Ball.x = Position.x;
    Ball.y = Position.y;

}
function showError(){
    console.log("There is an error in the database");
}
