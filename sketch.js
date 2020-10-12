//all global variables
var gameState = "PLAY";
var score = 0;
var playerLife = 3;
var player1 , player1Image;
var trafficSignal ;
var warning;
var trainImage;
var poll , pollImage;
var car1 , car2 , car3 , car4;
var backgroundImage;
var carImage;
var counter = 0;
var rand;

function preload(){
//load all images and sound files here
player1Image = loadImage ("Images/player1.png");
//player1Left = loadImage("Images/");
//player1Right = loadImage("Images/");

warning = loadSound("Sounds/Warning.mp3");

trainImage = loadImage("Images/Train.png");
pollImage = loadImage("Images/trainPoll.png");

backgroundImage = loadImage ("Images/Background.png");
carImage = loadImage ("Images/car.png");
}

function setup() {
  rand = random(1,2);

  createCanvas(displayWidth,displayHeight);
  player1 =  createSprite(340, 350, 50, 50);
  //player1.shapeColor = "red";
  player1.addImage(player1Image);
  player1.scale = 0.06;
  player1.debug = true;
  player1.setCollider("circle",0,0,50);

  car = createSprite (640,160,50,50);
  car.velocityY = 1;
  //car.addImage("car"+ random(1,4));
  car.addImage(carImage);
  car.scale = 0.06;
  car.debug = true ;
  
  train=createSprite(200,100,20,20);
  train.visible = false;
  train.addImage(trainImage);

  poll = createSprite(400,500,20,20);
  poll.addImage(pollImage);
  poll.visible = false;

  //camera.position.x=displayWidth/2;
  //camera.position.y=player1.position.y;
}

function draw() {
  background(backgroundImage);
  drawSprites();
 
  if(rand===1){
    trafficSignal = "red";
  }
  else{
    trafficSignal = "green";
  }

  //if gameState is PLAY
  if(gameState==="PLAY"){
   
  //on pressing the left arrow player1 will go left and animation will face left side
  if(keyDown(LEFT_ARROW)){
  //if player1 is crossing during red light display warning and stop the player
  if(trafficSignal==="red"){
    //resetPosition();
  }
  player1.x-=5;
  //player1.addImage("leftImage",player1Left)
  }

  //on pressing the right arrow player1 will go left and animation will face right side
  if(keyDown(RIGHT_ARROW)){
    if(trafficSignal==="red"){
      warning.play();
     // resetPosition();
    }
    player1.x+=5;
   // player1.addImage("rightImage",player1Right)
   }
  

  //if player1 is touching the moving obstacles with velocity, player1 will fall down reduce playerLife; display message; obstacle velocity = 0
   if(player1.isTouching(car)){
    playerLife = playerLife - 1;
    textSize(20);
    fill("red");
    text("You lose 1 life",190,290);
    counter = 1;
    console.log("counter");
   }
   if(counter===1){
     //player1.addImage("playerFall");
     console.log(playerLife)
     car.velocityY = 0;
     gameState = "1st Chance";
    }
}



  //if player1 loses 3 lives gameState = GameOver
  if(playerLife === 0){

    gameState = "GameOver";
    text("You have used all your lives",190,290);
  }

  if(gameState==="1st Chance" && playerLife!==0 && keyDown ("SPACE")){
    resetPosition();
     gameState = "PLAY";  
  }

 

  //if player1 crosses the road successfully gameState = Won
/*if (player1.x=680){
  gameState = "WON";
}
*/
  
   
  //if player1 is crossing the road successfully ask him to go to level 2
   if(gameState==="Won"){
     text("Press 2 to go to Level-2",300,100);
   }

   if(keyDown("2")&& gameState === "Won"){
     gameState = "Level2";
     level2();
   }


 // car1.display();

  
}

//resetPosition function
function resetPosition(){
  player1.x=340;
  player1.y=350;
 // player1.velocityX=0;
  //player1.addImage("player1Image",player1Image);
}


function level2(){

//add the train to the same background
//background("Images/Background2.png");

//add train sprite object with image
train.visible = true;

if(frameCount > 850 && frameCount < 920){
train.velocityX = 2;
warning.play();
text("Please wait for the train to pass by",100,100);
poll.visible = true;
player1.velocityX = 0;
}
else{
//on pressing the left arrow player1 will go left and animation will face left side
if(keyDown(LEFT_ARROW)){
  //if player1 is crossing during red light display warning and stop the player
  player1.x-=5;
  //player1.addImage("leftImage",player1Left)
  }
   
  poll.visible = false;
}

//calculate life time of train after it passes
train.lifetime=40;
//increase the velocity of the cars
car.velocityX=5;
//add more obstacles
//change the player animation
}