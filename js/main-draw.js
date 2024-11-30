
import {  Warrior } from './entidades/personajes/warrior.js'; //Contiene la logica del personaje y sus animaciones
import { Fondo} from './entidades/fondo.js';//Contiene la logica del fondo
import { FPScounter } from './entidades/FPScounter.js';//Contiene el calculo de la frame data y anima el contador


const GameViewport = {
    WIDTH: 1080,
    HEIGHT: 720,
};//Contiene el tamaño de la pantalla

window.onload = function () {
    const canvasEl = document.querySelector('canvas');//Obtiene el canvas    
    const context = canvasEl.getContext('2d');//Obtiene el contexto del canvas

    canvasEl.width = GameViewport.WIDTH;//Establece el tamaño del canvas ancho
    canvasEl.height = GameViewport.HEIGHT;//Establece el tamaño del canvas alto

    const entities = [
        new Fondo(),
        new Warrior(80,370,150),
        new FPScounter(),
    ];//Arreglo de entidades
    
    let frameTime = {
        previous: 0,
        secondPassed: 0,
    };//Contiene la informacion de la frame data
    
    
    function frame(time) { 
        
        window.requestAnimationFrame(frame);
        //Calcula la frame data
        frameTime = {
            secondPassed:(time - frameTime.previous) / 1000,
            previous: time,
        }
        
        //actualiza las entidades en el tiempo entregado anteriormente
        for (const entity of entities) {
            entity.update(frameTime, context);
        }
        //Dibuja las entidades
        for (const entity of entities) {
            entity.draw(context);
        }
        // entrega el tiempo trancurrido dentro de la consola  
        console.log(time);
        
    }
    
    window.requestAnimationFrame(frame);

}
 