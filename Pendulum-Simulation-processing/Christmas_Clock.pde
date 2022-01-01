PVector origin;
PVector clock;
float len=180;

float angle=PI/4;
float Vclock=0;
float Va=0;

PFont font;
String fontT;
String fontAM="AM";
String fontPM="PM";

void setup(){
  size(500,500);
  
  origin=new PVector(width/2,0);
  clock=new PVector(width/2,len);
  
  font = createFont("SairaCondensed-ExtraLight.ttf",128);
  textFont(font);

}

void draw(){
  background(255);
  
  clock.x=origin.x+len*sin(angle);
  clock.y=origin.y+len*cos(angle);
  
  fill(0);
  int h = hour();
  int min = minute();
  String sh = str(h);
  String smin = str(min);
  if(h<10){sh="0"+sh;}
  if(min<10){smin="0"+smin;}
  String sysTime = sh+":"+smin;

  if(clock.x<width/2){
    fontT=sysTime;
  }else{
    if(h<12){
      fontT=fontAM;
    }else{
      fontT=fontPM;
    }
  }
  
  pushMatrix();
  translate(clock.x,clock.y);
  rotate(-angle);
  textSize(36);
  textAlign(CENTER);
  textMode(CENTER);
  text(fontT,0,0);
  popMatrix();
  
  Va=-0.002*sin(angle);
  
  Vclock+=Va;
  Vclock*=0.999;
  angle+=Vclock;
}
