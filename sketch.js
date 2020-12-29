var dog, happyDog, dogImg;
var food1, food2, foodStock, foodImg, foodS;
var text1, textImg, text2Img, text3Img;
var database;
var lastFed, fedTime;
var milk;

function preload()
{
  dogImg = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
  foodImg = loadImage("dogFood.png");
  textImg = loadImage("Picture1.png");
  text2Img = loadImage("text2.png");
  text3Img = loadImage("Text3.png");
  milkImg = loadImage("Milk.png");
}

function setup() 
{ 
  database = firebase.database();
  
  createCanvas(800, 500);
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  })

  food2 = new Foods();

  dog = createSprite(650,250,40,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  text1 = createSprite(540,150,20,20);
  text1.addImage(textImg);
  text1.scale = 0.5;

  milk = createSprite(-100, 250, 20, 20);

  input = createInput('Enter Name');
  input.position(830,168);
  
  feed = createButton("FEED YOUR PET MILK")
  feed.position(500,100)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,100)
  add.mousePressed(AddFood);
}

function draw() 
{  
  background(0, 176, 240);

  fill(255,255,254);
  textSize(15);
  textFont("bembo");

  if(lastFed >= 12)
  {
    text("Last Feed : " + lastFed % 12 + " PM", 50, 30);
  }
  else if(lastFed == 0)
  {
    text("Last Feed : 12 AM", 50, 30);
  }
  else
  {
    text("Last Feed : " + lastFed + " AM", 50, 30);
  }

  food2.display();

  if(food1 == 0)
  {
    text1.addImage(text2Img);
    milk.x = -100;
  }

  drawSprites();

  textSize(17);
  fill(255);
  textFont("bembo");
  text("Food Remaining: "+ food1,190,400);
}

function readStock(data)
{
  food1 = data.val();
  food2.updateFoodStock(food1);
}

//function writeStock(x)
//{
  //if(x <= 0)
  //{
    //x = 0;
  //}
  //else
  //{
    //x = x-1;
  //}
  
  //database.ref('/').update({Food : x});
//}

function AddFood()
{
  food1++
  dog.addImage(dogImg)
  database.ref('/').update(
  {
    Food:food1
  }
  )

  milk.x = -100;
  text1.addImage(textImg);

  input.position(830,168);
}

function FeedDog()
{
  dog.addImage(dogHappy)
  food2.updateFoodStock(food2.getFoodStock()-1)

  database.ref('/').update(
  {
    Food:food2.getFoodStock(),
    fedTime : hour()
  })

  if(food1 <= 0)
  {
    food1 = 0;
  }

  milk.x = 600;
  milk.y = 300;
  milk.addImage(milkImg);
  milk.scale = 0.065;

  text1.addImage(text3Img);

  input.position(-100,-100);
}
  



