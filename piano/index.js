let teclado=[];
let slider=[];
let notas=[60,62,64,66,67,71,72,74,78,80,82,86,88,92];
const l=200;
var x=undefined;
var a=undefined;
const len=14;
var env= [];
var osc =[];
let sel;
let valor;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
slider.push(createSlider(0.000, 1.000, .01, .001));
slider.push(createSlider(0, 2, .5, .01));
slider.push(createSlider(0, 1, 1, .01));
slider.push(createSlider(0, 2, .5, .01));
let xSlider=width/15;
let ySlider= 300;
slider[0].position(xSlider,ySlider);
slider[0].style('width', '400px');
slider[1].position(xSlider,ySlider+50);
slider[1].style('width', '400px');
slider[2].position(xSlider,ySlider+100);
slider[2].style('width', '400px');
slider[3].position(xSlider,ySlider+150);
slider[3].style('width', '400px');
attack=slider[0].value();
decay=slider[1].value();
sustain=slider[2].value();
release=slider[3].value();
sel = createSelect();
sel.position(7*width/10,3*height/6);
sel.option('square');
sel.option('triangle');
sel.option('sine');
sel.option('sawtooth');
valor=sel.value()
a=width/len;
  for(let i=0;i<len;i++){
        x=i*a;
        teclado[i]= new tecla(x,0,a,l,i,notas[i]);
        env.push(new p5.Env());
        //env[i].setADSR(0.01,0.05,1,0.5);
        env[i].setADSR(attack,decay,sustain,release);
        env[i].setRange(1,0);
        osc.push(new p5.Oscillator(valor));
        osc[i].amp(env[i]);
        osc[i].start();
}

}


function draw() {
    //a=width/len;
    drawPiano();
    rect(0,l+10,width,70);
    fill(217, 217, 100);
    textSize(45);
    text('Steinway & Sons', width/3,l+55);

}


class tecla{
    constructor(x,y,a,l,id,note){
        
        this.x=x;
        this.y=y;
        this.a=a;
        this.l=l;
        this.id=id
        this.note=note;
        
        }

   rect(){
        rect (this.x,this.y,this.a,this.l);
    }
    rectChangeColor(){
        
     color(255,0,0);
    }
 
}
function drawPiano(){
    
    for(let i=0 ;i<len;i++){
         
        if(mouseX>teclado[i].x && mouseX<teclado[i].x+teclado[i].a && mouseY<l){
            if(mouseIsPressed){
                fill(random(0,255),random(0,255),random(0,255));
                 
            }else{
                fill('rgba(250, 128, 114,0.5)');
            }
        }else{
            stroke(0);
            strokeWeight(8);
            fill (255);
        }
        teclado[i].rect();
    }
}

function keyPressed(){
    if(keyCode==65){
       teclado[0].rectChangeColor();
        osc[0].freq(midiToFreq(notas[0]));
        env[0].play()
    }else if(keyCode==83){
        teclado[1].rectChangeColor();
        osc[1].freq(midiToFreq(notas[1]));
        env[1].play()
    }else if(keyCode==68){
        teclado[2].rectChangeColor();
        osc[2].freq(midiToFreq(notas[2]));
        env[2].play()
    }else if(keyCode==70){
        teclado[3].rectChangeColor();
        osc[3].freq(midiToFreq(notas[3]));
        env[3].play()

    }else if(keyCode==71){
        teclado[4].rectChangeColor();
        osc[4].freq(midiToFreq(notas[4]));
        env[4].play()
    }else if(keyCode==72){
        teclado[5].rectChangeColor();
        osc[5].freq(midiToFreq(notas[5]));
        env[5].play()
    }else if(keyCode==74){
        teclado[6].rectChangeColor();
        osc[6].freq(midiToFreq(notas[6]));
        env[6].play()
    }else if(keyCode==75){
        teclado[7].rectChangeColor();
        osc[7].freq(midiToFreq(notas[7]));
        env[7].play()
    }else if(keyCode==76){
        teclado[8].rectChangeColor();
        osc[8].freq(midiToFreq(notas[8]));
        env[8].play()
    }else if(keyCode==90){
        teclado[9].rectChangeColor();
        osc[9].freq(midiToFreq(notas[9]));
        env[9].play()
    }else if(keyCode==88){
        teclado[10].rectChangeColor();
        osc[10].freq(midiToFreq(notas[10]));
        env[10].play()
    }else if(keyCode==67){
        teclado[11].rectChangeColor();
        osc[11].freq(midiToFreq(notas[11]));
        env[11].play()
    }else if(keyCode==86){
        teclado[12].rectChangeColor();
        osc[12].freq(midiToFreq(notas[12]));
        env[12].play()
    }else if(keyCode==66){
        teclado[13].rectChangeColor();
        osc[13].freq(midiToFreq(notas[13]));
        env[13].play()
    }
}


function keyReleased(){
    for(let i=0;i<teclado.length;i++){
        fill (103, 57, 238);
        teclado[i].rect();
    }
}

function mousePressed(){
    for(let i=0;i<len;i++){
   if( mouseX>teclado[i].x && mouseX<teclado[i].x+teclado[i].a && mouseY<l)
   {
        osc[i].freq(midiToFreq(notas[i]));
        env[i].play()
    
   }
}
}