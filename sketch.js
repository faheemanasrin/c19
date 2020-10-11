var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudmoving;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudGroup,obstacleGroup;
var rand;
var score;
var gamestate;
var PLAY,END;
var gameover,gameoverImage;
var restart,restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  groundImage = loadImage("ground2.png");
  cloudmoving=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameover=createSprite(300,100,10,10);
  gameover.addImage("over",gameoverImage);
  gameover.visible=false;
  
  restart=createSprite(300,150,10,10);
 restart.addImage("reset",restartImage);
  restart.visible=false;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();
  score=0;
  PLAY=1;
  END=0;
  gamestate=PLAY;
}

function draw() {
  background(255 );
  
  if(gamestate===PLAY){
    
  ground.velocityX = -2;
    
    if(keyDown("space")) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     score=score+Math.round( getFrameRate()/60 );


    spawnObstacles();
    spawnClouds();
    
    if(obstacleGroup.isTouching(trex)){
      gamestate=END;
    }
    
    
    
  }else if(gamestate===END){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-2);
    cloudGroup.setLifetimeEach(-2);
    trex.changeAnimation("collided",trex_collided);
    gameover.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
  text("score="+ score,20,25);
  trex.collide(invisibleGround);
  drawSprites();
  
}

function reset(){
  gamestate = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
   trex.changeAnimation("running",trex_running);
  
 score = 0;
  
}


function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
     rand =Math.round(random(1,6)) ;
   // obstacle.addImage("obstacle" + rand);
    switch(rand){
      case 1:
        obstacle.addImage("os1",obstacle1);
        break;
         case 2:
        obstacle.addImage("os2",obstacle2);
        break; 
        case 3:
        obstacle.addImage("os3",obstacle3);
        break;
         case 4:
        obstacle.addImage("os4",obstacle4);
        break;
         case 5:
        obstacle.addImage("os5",obstacle5);
        break;
         case 6:
        obstacle.addImage("os6",obstacle6);
        break;
        default:
        console.log(rand);
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
    
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudmoving);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
     cloudGroup.add(cloud);
  
  }
  
 
}
