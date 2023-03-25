var canvas;
var ctx;
var WIDTH=1200;
var HEIGHT= 800;
var output;
boundX=0;
boundY=0;
tileW=20;
tileH=20;
tileRowCount=25;
tileColumnCount=40;
var tiles=[];
for(c=0;c<tileColumnCount;c++){
    tiles[c]=[];
    for(r=0;r<tileRowCount;r++){
        tiles[c][r]={x:c*(tileW+3),y:r*(tileH+3),state:'e'};

    }
   

}
tiles[0][0].state='s';
tiles[tileColumnCount-1][tileRowCount-1].state='f';
function rect(x,y,w,h,state) {
    if(state=='s')
    ctx.fillStyle='#00FF00';
    else if(state=='f')
    ctx.fillStyle='#FF0000';
else if(state=='e')
ctx.fillStyle='#AAAAAA';
else if(state=='w')
ctx.fillStyle='#0000FF';
else if(state=='x')
ctx.fillStyle='#000000';
else 
ctx.fillStyle='#FFFF00';

    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}
function clear(){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
}
function draw(){
    clear();
    for(c=0;c<tileColumnCount;c++){

        for(r=0;r<tileRowCount;r++){
           rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
    
        }
      
    
    }
   
   
}
function solvemaze(){
    var Xqueue=[0];
    var Yqueue=[0];
   var pathfound=false;
   var xloc;
   var yloc;
   while(Xqueue.length>0 && !pathfound){
    xloc=Xqueue.shift();
    yloc=Yqueue.shift();
    if(xloc>0){
        if(tiles[xloc-1][yloc].state=='f')
        pathfound=true;
        else if(tiles[xloc-1][yloc].state=='e'){
            Xqueue.push(xloc-1);
            Yqueue.push(yloc);
            tiles[xloc-1][yloc].state=tiles[xloc][yloc].state+'l';
        }
        

    }

    if(xloc<tileColumnCount-1){
        if(tiles[xloc+1][yloc].state=='f')
        pathfound=true;
        else if(tiles[xloc+1][yloc].state=='e'){
            Xqueue.push(xloc+1);
            Yqueue.push(yloc);
            tiles[xloc+1][yloc].state=tiles[xloc][yloc].state+'r';
        }
        
    }
    if(yloc>0){
        if(tiles[xloc][yloc-1].state=='f')
        pathfound=true;
        else if(tiles[xloc][yloc-1].state=='e'){
            Xqueue.push(xloc);
            Yqueue.push(yloc-1);
            tiles[xloc][yloc-1].state=tiles[xloc][yloc].state+'u';
        }

    }

    if(yloc<tileRowCount-1){
        if(tiles[xloc][yloc+1].state=='f')
        pathfound=true;
        else if(tiles[xloc][yloc+1].state=='e'){
            Xqueue.push(xloc);
            Yqueue.push(yloc+1);
            tiles[xloc][yloc+1].state=tiles[xloc][yloc].state+'d';
        }
        
    }

   } 
   if(!pathfound){
    output.innerHTML="No solution";

   }
   else {
    output.innerHTML="solved";
    var path =tiles[xloc][yloc].state;
    var pathlength=path.length;
    var currX=0;
    var currY=0;
    for(var i=0;i<pathlength-1;i++){
        if(path.charAt(i+1)=='u')
        currY-=1;
        if(path.charAt(i+1)=='d')
        currY+=1;
        if(path.charAt(i+1)=='l')
        currX-=1;
        if(path.charAt(i+1)=='r')
        currX+=1;
        tiles[currX][currY].state='x';
    }
   }
}

function reset() {
    for(c=0;c<tileColumnCount;c++){
        tiles[c]=[];
        for(r=0;r<tileRowCount;r++){
            tiles[c][r]={x:c*(tileW+3),y:r*(tileH+3),state:'e'};
    
        }
        outcome.innerHTML="";
       
    
    }
    tiles[0][0].state='s';
    tiles[tileColumnCount-1][tileRowCount-1].state='f';
}
function init(){
    canvas=document.getElementById("myCanvas");
    ctx=canvas.getContext("2d");
    output=document.getElementById("outcome");
    return setInterval(draw,10);

}

function myMove(e){
    x=e.pageX-canvas.offsetLeft;
    y=e.pageY-canvas.offsetTop;

    for(c=0;c<tileColumnCount;c++){
        for(r=0;r<tileRowCount;r++){
            if(c*(tileW+3)<x && x<c*(tileW+3)+tileW && r*(tileH+3)<y && y<r*(tileH+3)+tileH){
                if(tiles[c][r].state=='e' && (c!=boundX || r!=boundY)){
                    tiles[c][r].state='w';
                    boundX=c;
                      boundY=r;
                }
                else if(tiles[c][r].state=='w' && (c!=boundX || r!=boundY)){
                    tiles[c][r].state='e';
                    boundX=c;
                    boundY=r;
                }
            }

        }
    }
}
function myDown(e){
    canvas.onmousemove=myMove;
    x=e.pageX-canvas.offsetLeft;
    y=e.pageY-canvas.offsetTop;

    for(c=0;c<tileColumnCount;c++){
        for(r=0;r<tileRowCount;r++){
            if(c*(tileW+3)<x && x<c*(tileW+3)+tileW && r*(tileH+3)<y && y<r*(tileH+3)+tileH){
                if(tiles[c][r].state=='e'&& (c!=boundX || r!=boundY)){
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                }
                else if(tiles[c][r].state=='w'&& (c!=boundX || r!=boundY)){
                    tiles[c][r].state='e';
                    boundX=c;
                    boundY=r;
                }
            }

        }
    }
}
function myUp(){
    canvas.onmousemove=null;
}
init();

canvas.onmousedown=myDown;
canvas.onmouseup=myUp
