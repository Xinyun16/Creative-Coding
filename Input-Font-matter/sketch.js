var font;
var fontFile="Inter-Medium.ttf";
function preload() {
  font = loadFont(fontFile);
}

var Engine=Matter.Engine,
    Bodies=Matter.Bodies,
    World=Matter.World,
    Mouse=Matter.Mouse,
    MouseConstraint=Matter.MouseConstraint;

var engine = Engine.create(),
    world = engine.world;

var inputElement;

var boxes=[];
var Texts=[];

function setup() {
  createCanvas(600, 600);

  //inputElement
  inputElement=createInput();
  inputElement.position(50,50);
  inputElement.input(userInput);

  var ground=Bodies.rectangle(width/2,height+5,width,10,{isStatic:true});
  var wallL=Bodies.rectangle(-5,height/2,10,height,{isStatic:true});
  var wallR=Bodies.rectangle(width+5,height/2,10,height,{isStatic:true});
  boxes.push(ground);
  boxes.push(wallL);
  boxes.push(wallR);

  var mouse=Mouse.create(canvas.elt);
  var mouseConstraint=MouseConstraint.create(engine,{mouse:mouse});
  
  World.add(engine.world,[ground,wallL,wallR,mouseConstraint]);//let x into world
  Matter.Runner.run(engine);  
}

//inputElement
function userInput(){

  Texts.push({
    x:width/2,
    y:50,
    text:this.value()
  })

}

function generateBox(){
  
  var boxScale=80;
  var boxA=Bodies.rectangle(random(width),random(30),boxScale*0.65*Texts.length,boxScale);
  
  boxA.boxScale=boxScale;

  for(var i=0;i<Texts.length;i++){
    var textPrint=Texts[i]
    boxA.char=textPrint.text;
   }  

  boxes.push(boxA);
  World.add(engine.world,boxA,);//let x into world
}

 function keyPressed(){
   if(keyCode===ENTER){

     inputElement.value('');
     generateBox();
     Texts.splice(0,Texts.length)//Empty array

    }
 }

function draw() {
  background(255);

  for(var box of boxes){
    noFill();
    noStroke();
    var boxScale=box.boxScale
    beginShape()
    for(var vert of box.vertices){
      vertex(vert.x,vert.y)
     }
      endShape(CLOSE)

    push();
     if(boxScale){
       translate(box.position.x,box.position.y);
       rotate(box.angle);

       fill(0);
       textSize(boxScale*1.4);
       textAlign(CENTER);
       text(box.char,0,40);      
      }
     pop();
  }
}
