var Engine=Matter.Engine,
    Bodies=Matter.Bodies,
    World=Matter.World,
    Constraint=Matter.Constraint,
    Mouse=Matter.Mouse,
    MouseConstraint=Matter.MouseConstraint;

var engine = Engine.create(),
    world = engine.world;

var particles=[];

function setup() {
  createCanvas(1200, 600);

  var mouse=Mouse.create(canvas.elt);
  var mouseConstraint=MouseConstraint.create(engine,{mouse:mouse});
  World.add(engine.world,mouseConstraint);
  
  var p1=new Particle(width/2,100,50,true);
  var p2=new Particle(width/2,150,50);

  particles.push(p1);
  particles.push(p2);

  var options={
    bodyA:p1.body,
    bodyB:p2.body,
    length:300,
    stiffness:1
  }
 
  var constraint=Constraint.create(options);
  World.add(world,constraint);

}

function draw() {
  background(255);

  Engine.update(engine);

  for(var i=0;i<particles.length;i++){
    particles[i].show();
  }

  stroke(6,253,199);
  line(particles[0].body.position.x,particles[0].body.position.y,
       particles[1].body.position.x,particles[1].body.position.y);    
}

