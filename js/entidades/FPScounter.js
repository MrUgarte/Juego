export class FPScounter {
    constructor() {
        this.fps = 0;
        this.lastTime = 0;
        this.frames = 0;
    }//Se da valores iniciales

    //actualiza la informacion de la frame data
    update(time) {
        this.fps = Math.trunc(1 / time.secondPassed);
    }
    //Dibuja el contador
    draw(context) {
        context.font = "bold 20px Arial";
        context.fillStyle = "yellow";
        context.textAlign = "center";
        context.fillText(`FPS: + ${this.fps}`, context.canvas.width / 2, 30);
    }
}