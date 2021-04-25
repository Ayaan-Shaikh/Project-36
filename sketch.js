var  dog,dogImg,happyDog;
var  database,foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;



function preload()
{
dogImg=loadImage("dogImg.png")
happyDog=loadImage("dogImg1.png");
}


function setup() {
  database=firebase.database();
	createCanvas(950, 500);

    foodObj=new Food();
  
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
    lastFed=data.val();
  });  
 
  dog=createSprite(750,320,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3

      
  feed=createButton("Feed The Dog");
  feed.position(800,95);
  feed.mousePressed(feedDog);
 

  addFood=createButton("Add Food");
  addFood.position(1000,95);  
  addFood.mousePressed(addFoods);

}


function draw() {  
 background(46, 139, 87);

 
  
 fill(255,255,254);
 textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+lastFed % 12 + " PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed + " AM",350,30);

  }
 
  
  drawSprites();
  foodObj.display();
 }

 

 function readStock(data){
  foodS=data.val();
foodObj.updateFoodStock(foodS);


}


function feedDog(){
dog.addImage(happyDog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}

  



function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  }

    
    
    
     
      