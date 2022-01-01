PFont font;
float r = 150;

void setup() {
  size(500, 500,P3D);
  
  font = createFont("SairaCondensed-ExtraLight.ttf",40);
  textFont(font);
  textAlign(CENTER);
  
  frameRate(90);
}

void draw() {
  background(160);

  translate(width / 2, height / 2);
  rotateX(radians(65));
  
  lights();
  pointLight(180, 180, 180, 0, 0, 0);
  
  pushMatrix();
  rotateZ(-radians(frameCount));
  
  int h = hour();
  int min = minute();
  int s = second();
  String sh = str(h);
  String smin = str(min);
  String ss = str(s);
  if(h<10){sh="0"+sh;}
  if(min<10){smin="0"+smin;}
  if(s<10){ss="0"+ss;}
  
  String T;
  if(h<12){
    T=" AM";
  }else{
    T=" PM";
  }
  
  String txtTime = sh+":"+smin+":"+ss+T;
  String txt = txtTime;
  
  float arclength = 0;
  for (int i = 0; i < txt.length(); i++)
  {    
    //找出每个单一char
    char singleChar = txt.charAt(i);
    //计算每单一char的宽度
    float charWidth = textWidth(singleChar)+3;
    //单一char之间的间距
    arclength += charWidth/2;
    //以弧度表示的角度是弧长除以半径
    float angle = PI + arclength / r;

    pushMatrix();
    //将坐标原点移动到圆弧上
    translate(r*cos(angle), r*sin(angle));
    rotate(angle+PI/2);
    rotateX(-PI/2);
    fill(255);
    textSize(60);
    text(singleChar,0,0);
    popMatrix();
    
    //下一个单一char的弧度
    arclength += charWidth/2;  
  }
  popMatrix();
}
