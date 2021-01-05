var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var survivaltime;
var jungle, jungle_img;
//var orange,orangeImage;
var Ground,Ground_img;
var invisibleGround;
var gameOver,gmImage;
var restart, rImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadAnimation("Screenshot_21.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungle_img = loadImage("Screenshot_11.png")
  Ground_img = loadImage("Screenshot_12.png");
  gmImage = loadImage("Screenshot_22.png");
  rImage = loadImage("Screenshot_23.png")
  //orangeImage = loadImage("Screenshot_15.png")
}



function setup() {
  createCanvas(600,380);
  
  
  //jungle = createSprite(300,200,50,50);
  //jungle.addAnimation("jungli",jungle_img); 
  
  
  Ground = createSprite (400,350,600,30);
  Ground.addAnimation("ghar",Ground_img)
  Ground.scale = 2;
  Ground.x = Ground.width/2;
  Ground.velocityX = -5;
  Ground.x=Ground.width/2;
  
  gameOver = createSprite (300,200,600,30);
  gameOver.addAnimation("gm",gmImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  restart = createSprite(100,200,20,20);
  restart.addAnimation("r",rImage);
  restart.visible = false;
  restart.scale = 0.5;
  
  monkey = createSprite (80, 315, 20 , 20);
  monkey.addAnimation("running",monkey_running);
  survivaltime = 0;
  score = 0;
  
  monkey.scale = 0.110;
  
  //banana = createSprite (300,200,20,20);
  //banana.addAnimation("kela",bananaImage);
//banana.scale = 0.110;
  
  //obstacle = createSprite(200,340,20,20);
  //obstacle.addAnimation("stone",obstacleImage);
  //obstacle.scale = 0.110;
  
  invisibleGround = createSprite(300,360,600,10);
  invisibleGround.visible = false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  
  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = false;

  
  
}


function draw() {
  background("yellow")
  
  if (gamestate === PLAY){
    
    
    if(keyDown("space")&&monkey.y>=321){
    monkey.velocityY = -14;
    }
    
   //if(keyDown("up") &&monkey.y>=200 ){
     // monkey.velocityY = -12;
    //}
      monkey.velocityY = monkey.velocityY+0.9;
    
    survivaltime = survivaltime + Math.round(getFrameRate() /60);
   
   
    
    food();
    obstacle();
    
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score+1;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gamestate = END;
      
    }
    
  }else if(gamestate === END){
    monkey.visible = false;
 gameOver.visible = true;
    restart.visible = true;
    
    Ground.velocityX = 0;
    obtacle.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
      if (mousePressedOver(restart)) {
      reset();
    }
    
  }
   
  
  
  if (Ground.x < 0)
  {
    Ground.x = Ground.width/2;
  }

  monkey.collide(invisibleGround);
drawSprites();
  
  
  stroke("black");
  textSize("100");
  text("score: "+score,295,50);
  
  fill("black");
  stroke("black");
  textSize("100");
  text(survivaltime,500,50);
  
  
  }
function reset(){
  gamestate = PLAY;
  score = 0;
  survivaltime = 0;
  restart.visible = false;
  gameOver.visible = false;
  monkey.visible = true;
   obstacleGroup.destroyEach();
  foodGroup.destroyEach();
}


function food(){
  if(World.frameCount%97===0){
    banana= createSprite(650,200,20,20);
    banana.scale = 0.110;
    
    banana.addAnimation ("kela",bananaImage);
   
    banana.velocityX = -5;
    banana.y = Math.round(random(300,200));
    
banana.setLifetime = 100;
    foodGroup.add(banana);
    
  }
}

function obstacle(){
  if(World.frameCount%200===0){
    obtacle = createSprite(600,335,20,20);
     obtacle.scale = 0.110;
    obtacle.addAnimation("stone",obstacleImage);
   obtacle.velocityX = -5;
    obtacle.setLifetime = 100;
    obstacleGroup.add(obtacle);
  }
}


