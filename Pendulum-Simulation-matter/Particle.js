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
      noStroke();
      ellipse(0,0,this.r,this.r);
      pop();
    }
  }