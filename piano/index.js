let teclado = [];// teclado se usara para crear un arreglo de objetos,instancias de la clase tecla
let slider = [];// slider  se usara para crear un arreglo de elementos tipo createSlider()
let letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B'];//teclas de la pc
let notas = [60, 62, 64, 66, 67, 71, 72, 74, 78, 80, 82, 86, 88, 92];// notas musicales,son 14
let mensaje=['Ataque','Decaimiento','Sostenimiento','Relajación'];//mensajes 
const l = 200;// altura de la tecla
var x = undefined;//se le asignara coordenada x del rectangulo
var a = undefined;// se le asignara ancho del rectangulo
const len = 14;// cantidad de notas
var env = [];// env se usara para crear objetos de tipo Env
var osc = [];// osc se usara para crear objetos de tipo Osillator
let sel;// variable asignada para selector
let valor;// valor devuelto por selector

function setup() {
    createCanvas(windowWidth, windowHeight);// lienzo de toda la pantalla 
    background(0);// fondo negro
    slider.push(createSlider(0.000, 1.000, .01, .001));//creando slider,tomando rango,valor deseado por default y salto
    slider.push(createSlider(0, 2, .5, .01));
    slider.push(createSlider(0, 1, 1, .01));
    slider.push(createSlider(0, 2, .5, .01));
    let xSlider = width / 15;// posicion inicial del los slider
    let ySlider = 300;
    slider[0].position(xSlider, ySlider);// acceso a los objetos tipo slider,llamando el metodo position
    slider[0].style('width', '400px');// estilos,tamaño del slider 400 px de largo
    slider[1].position(xSlider, ySlider + 50);
    slider[1].style('width', '400px');
    slider[2].position(xSlider, ySlider + 100);
    slider[2].style('width', '400px');
    slider[3].position(xSlider, ySlider + 150);
    slider[3].style('width', '400px');
       
    attack = slider[0].value();// devuelve el valor del slider y es asignado a cada variable,para usarse en setADSR
    decay = slider[1].value();
    sustain = slider[2].value();
    release = slider[3].value();
    sel = createSelect();// creando un selector
    sel.position(7 * width / 10, 3 * height / 6);// posición del selector
    sel.option('square');// opciones del selector,valor sera devuelto con value()
    sel.option('triangle');
    sel.option('sine');
    sel.option('sawtooth');
    sel.selected('square');
    a = width / len;// divide el total de la pantalla entre la cantidad de notas
    valor = sel.value();// valor devuelto del selector,se asigna  a valor
    for (let i = 0; i < len; i++) {// ciclo para crear cada tecla
        x = i * a;// coordenada en x
        // se usa el metodo push para asignar objetos  a los arreglos
        teclado[i] = new tecla(x, 0, a, l, i, notas[i]);// instancia de la clase tecla,asignada al arreglo teclado
        env.push(new p5.Env());// agregando un objeto tipo Env al arreglo env
        env[i].setADSR(attack, decay, sustain, release);// establezco arreglo de los descriptores del envolvente 
        env[i].setRange(1, 0);//rango de ataque
        osc.push(new p5.Oscillator());// creo objetos de  onda,que se usara para producir sonido
        osc[i].setType(valor);//establezco el tipo de onda
        osc[i].amp(env[i]);// establezco la amplitud de la onda
        osc[i].start();// inicializo la onda 
    }

}


function draw() {

    drawPiano();// dibuja el piano completo
    
    for (let i = 0; i < len; i++) {// crea las letras del teclado que seran apretadas por el usario
        textSize(28);
        text(letters[i], (teclado[i].x + teclado[i].a) - 70, l-160);
    }
       
    //rect(900,ySlider,100,30);
    rect(0, l + 10, width, 70);// titulos del piano 
    fill(217, 217, 100);
    textSize(45);
    text('Steinway & Sons', width / 3, l + 55);
    stroke(0);
    strokeWeight(0);
    fill(15, 172, 241);
    //fill(0, 102, 153);
    rect(3*width/7, 290, 200,30 );
    rect(3*width/7, 340, 200,30 );
    rect(3*width/7, 390, 200,30 );
    rect(3*width/7, 440, 200,30 );
    textSize(25);
    fill(0);// titulos de envolvente
    text(mensaje[0],(3*width/7)+30,310);
    text(mensaje[1],(3*width/7)+30,360);
    text(mensaje[2],(3*width/7)+30,410);
    text(mensaje[3],(3*width/7)+30,460);
    
    //fill(217, 217, 100);
    //textSize(45);
    //text('jesus',width/2,ySlider)
    
    
       

}


class tecla {// se usara para crear varias instancias de tecla
    constructor(x, y, a, l, id, note) {// metodo para  inizializar las clases
        this.x = x;//coordenada x 
        this.y = y;// coordenada y 
        this.a = a;// ancho
        this.l = l;//largo
        this.id = id// identicador
        this.note = note;//nota

    }

    rect() {// crea la tecla
        rect(this.x, this.y, this.a, this.l);
    }
    rectChangeColor() {
        // cambia el color de la tecla cuando se usa con teclado

        color(255, 0, 0);
    }

}

function drawPiano() {// dibuja el cada tecla,globalmente el piano

    for (let i = 0; i < len; i++) {// crea el piano  llamando al arreglo de instancias teclado
                                   // usa el metodo de instancia rect() para pinta el lienzo con un rectangulo

        if (mouseX > teclado[i].x && mouseX < teclado[i].x + teclado[i].a && mouseY < l) {
            if (mouseIsPressed) {// si mouse  es presionado
                // rellana la tecla de color al azar,usando  metodo random
                fill(random(0, 255), random(0, 255), random(0, 255));

            } else {
                fill('rgba(250, 128, 114,0.5)');// si esta encima de la tecla,pinta color melon 
            }
        } else {//si no se presiona y tampoco se esta encima del piano
            // usa color  blanco 
            stroke(0);// grosor de rectangulo
            strokeWeight(8);
            fill(255);//color blanco
        }
        teclado[i].rect();// arreglo de instancias,pinta sobre el lienzo un cuadrado color blanco
    }
    
}

function keyPressed() {// cada que se presiona una tecla,usara su  codigo ASCII y encontrara la coincidencia
    if (keyCode == 65) {
        teclado[0].rectChangeColor();//cambia el color de la tecla presionado
        osc[0].freq(midiToFreq(notas[0]));//ejecuta el sonido
        env[0].play()
    } else if (keyCode == 83) {
        teclado[1].rectChangeColor();
        osc[1].freq(midiToFreq(notas[1]));
        env[1].play()
    } else if (keyCode == 68) {
        teclado[2].rectChangeColor();
        osc[2].freq(midiToFreq(notas[2]));
        env[2].play()
    } else if (keyCode == 70) {
        teclado[3].rectChangeColor();
        osc[3].freq(midiToFreq(notas[3]));
        env[3].play()

    } else if (keyCode == 71) {
        teclado[4].rectChangeColor();
        osc[4].freq(midiToFreq(notas[4]));
        env[4].play()
    } else if (keyCode == 72) {
        teclado[5].rectChangeColor();
        osc[5].freq(midiToFreq(notas[5]));
        env[5].play()
    } else if (keyCode == 74) {
        teclado[6].rectChangeColor();
        osc[6].freq(midiToFreq(notas[6]));
        env[6].play()
    } else if (keyCode == 75) {
        teclado[7].rectChangeColor();
        osc[7].freq(midiToFreq(notas[7]));
        env[7].play()
    } else if (keyCode == 76) {
        teclado[8].rectChangeColor();
        osc[8].freq(midiToFreq(notas[8]));
        env[8].play()
    } else if (keyCode == 90) {
        teclado[9].rectChangeColor();
        osc[9].freq(midiToFreq(notas[9]));
        env[9].play()
    } else if (keyCode == 88) {
        teclado[10].rectChangeColor();
        osc[10].freq(midiToFreq(notas[10]));
        env[10].play()
    } else if (keyCode == 67) {
        teclado[11].rectChangeColor();
        osc[11].freq(midiToFreq(notas[11]));
        env[11].play()
    } else if (keyCode == 86) {
        teclado[12].rectChangeColor();
        osc[12].freq(midiToFreq(notas[12]));
        env[12].play()
    } else if (keyCode == 66) {
        teclado[13].rectChangeColor();
        osc[13].freq(midiToFreq(notas[13]));
        env[13].play()
    }
}

function mousePressed() {// cuando se ejecuta la accion de presionar el mouse
    for (let i = 0; i < len; i++) {// se ejecuta el ciclo  y busca la coincidencia respecto a la coordenada
        if (mouseX > teclado[i].x && mouseX < teclado[i].x + teclado[i].a && mouseY < l) {
            osc[i].freq(midiToFreq(notas[i]));//se ejecuta el sonido de la tecla
            env[i].play()

        }
    }
}