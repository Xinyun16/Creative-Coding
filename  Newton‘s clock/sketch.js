var font;
var fontFile="SairaCondensed-ExtraLight.ttf";
function preload() {
  font = loadFont(fontFile);
}

var Engine=Matter.Engine,
    Bodies=Matter.Bodies,
    World=Matter.World,
    Constraint=Matter.Constraint,
    Mouse=Matter.Mouse,
    MouseConstraint=Matter.MouseConstraint;

var engine = Engine.create(),
    world = engine.world;

var particles=[];

function Particle(x,y,r,fixed){
  var options={
      friction:0,
      restitution:1.2,
      isStatic:fixed
  }
  this.body=Bodies.circle(x,y,r,options);
  this.r=r;
  World.add(world,this.body);

  this.show=function(){
    var pos=this.body.position;
    var angle=this.body.angle;
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    fill(6,253,199);
    pop();
  }
}

function ParticleH(x,y,r,fixed){
  var options={
      friction:0,
      restitution:1.2,
      isStatic:fixed
  }
  this.body=Bodies.circle(x,y,r,options);
  this.r=r;
  World.add(world,this.body);

  this.show=function(){
    var pos=this.body.position;
    var h=hour();
  
    push();
    translate(pos.x,pos.y);
    fill(6,253,199);
    textFont(font);
    textAlign(CENTER,CENTER);
    textSize(this.r+30);
    text(h+":",0,-20);
    pop();
  }
}

function ParticleMin(x,y,r,fixed){
  var options={
      friction:0,
      restitution:1.2,
      isStatic:fixed
  }
  this.body=Bodies.circle(x,y,r,options);
  this.r=r;
  World.add(world,this.body);

  this.show=function(){
    var pos=this.body.position;
    var min=minute();
  
    push();
    translate(pos.x,pos.y);
    fill(6,253,199);
    textFont(font);
    textAlign(CENTER,CENTER);
    textSize(this.r+30);
    text(min+":",0,-20);
    pop();
  }
}

function ParticleS(x,y,r,fixed){
  var options={
      friction:0,
      restitution:1.2,
      isStatic:fixed
  }
  this.body=Bodies.circle(x,y,r,options);
  this.r=r;
  World.add(world,this.body);

  this.show=function(){
    var pos=this.body.position;
    var s=second();
  
    push();
    translate(pos.x,pos.y);
    fill(6,253,199);
    textFont(font);
    textAlign(CENTER,CENTER);
    textSize(this.r+30);
    text(s,0,-20);
    pop();
  }
}

function ParticleAMFM(x,y,r,fixed){
  var options={
      friction:0,
      restitution:1.2,
      isStatic:fixed
  }
  this.body=Bodies.circle(x,y,r,options);
  this.r=r;
  World.add(world,this.body);

  this.show=function(){
    var pos=this.body.position;
    var h=hour();

    push();
    translate(pos.x,pos.y);
    fill(6,253,199);
    textFont(font);
    textAlign(CENTER,CENTER);
    textSize(this.r+30);
    if(h<12){
      text("AM",0,-20);
    }else{
      text("PM",0,-24);
    }
    pop();
  }
}

function ParticleSign(x,y,r,fixed){
  var options={
      friction:0,
      restitution:1.2,
      isStatic:fixed
  }
  this.body=Bodies.circle(x,y,r,options);
  this.r=r;
  World.add(world,this.body);

  this.show=function(){
    var pos=this.body.position;
  
    push();
    translate(pos.x,pos.y);
    fill(6,253,199);
    textFont(font);
    textAlign(CENTER,CENTER);
    textSize(this.r+30);
    text("-",0,-20);
    pop();
  }
}

function setup() {
  createCanvas(1200, 600);

  var mouse=Mouse.create(canvas.elt);
  var mouseConstraint=MouseConstraint.create(engine,{mouse:mouse});

  World.add(engine.world,mouseConstraint);

  var p1=new Particle(width/2-200,0,0,true);
  var p2=new ParticleH(width/2-200,50,50);
  var p3=new Particle(width/2-100,0,0,true);
  var p4=new ParticleMin(width/2-100,50,50);
  var p5=new Particle(width/2,0,0,true);
  var p6=new ParticleS(width/2,50,50);
  var p7=new Particle(width/2+100,0,0,true);
  var p8=new ParticleSign(width/2+100,50,50);
  var p9=new Particle(width/2+200,0,0,true);
  var p10=new ParticleAMFM(width/2+200,50,50);

  particles.push(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10);

  var options1={
    bodyA:p1.body,
    bodyB:p2.body,
    length:300,
    stiffness:1
  }
  var options2={
    bodyA:p3.body,
    bodyB:p4.body,
    length:300,
    stiffness:1
  }
  var options3={
    bodyA:p5.body,
    bodyB:p6.body,
    length:300,
    stiffness:1
  }
  var options4={
    bodyA:p7.body,
    bodyB:p8.body,
    length:300,
    stiffness:1
  }
  var options5={
    bodyA:p9.body,
    bodyB:p10.body,
    length:300,
    stiffness:1
  }
 
  var constraint1=Constraint.create(options1);
      constraint2=Constraint.create(options2),
      constraint3=Constraint.create(options3),
      constraint4=Constraint.create(options4),
      constraint5=Constraint.create(options5);

  World.add(world,[constraint1,constraint2,constraint3,constraint4,constraint5]);

}

function draw() {
  background(255);

  Engine.update(engine);

  for(var i=0;i<particles.length;i++){
    particles[i].show();
  }

}