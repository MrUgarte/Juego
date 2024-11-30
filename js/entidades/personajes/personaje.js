export class Personaje {
    //Se les dan valores iniciales
    constructor(name, x, y, velocity) {
        this.name = name; //nombre del personaje(Warrior)
        this.image = new Image();//Imagen del personaje
        this.frames = new Map();//Mapeo de las sprites
        this.position = {x, y};// Posicion del personaje
        this.velocity = velocity;// Velocidad de movimiento
        this.animationFrame = 1;
        this.animationTimer = 0;    
    }
    //actualiza el movimiento del personajes
    update(time, context){
        const [, , width] = this.frames.get(`forwards-${this.animationFrame}`);// constante que reproduce la animacion del personaje
        //Actualiza al personaje segun la tasa de refresco de la pantalla (60hz)
        if(time.previous > this.animationTimer + 60){
            this.animationTimer = time.previous;
            this.animationFrame++;
            if(this.animationFrame > 8) this.animationFrame = 1;
        }
        
        this.position.x += this.velocity * time.secondPassed;

        if (this.position.x >= context.canvas.width - width || this.position.x < 0) {
        this.velocity = -this.velocity;
        }
    }
    //Dibuja una linea blanca en la posicion del personaje para obtener el origen de la imagen
    drawDebug(context){
        context.lineWidth = 1;
        
        context.beginPath();
        context.strokeStyle = 'white';
        context.moveTo(this.position.x - 5, this.position.y);
        context.lineTo(this.position.x + 4, this.position.y);
        context.moveTo(this.position.x, this.position.y - 5);
        context.lineTo(this.position.x, this.position.y + 4);
        context.stroke();
    }
    //Dibuja el personaje y crea la animacion de movimiento
    draw(context){
        const [x, y, width, height] = this.frames.get(`forwards-${this.animationFrame}`);
        context.drawImage(this.image, x, y, width, height, this.position.x, this.position.y, width, height);
        this.drawDebug(context);
    }
}