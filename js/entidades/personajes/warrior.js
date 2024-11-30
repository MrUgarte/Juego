import { Personaje } from "./personaje.js";//Importa la clase Personaje, contiene la mecanica del personaje

//Clase Warrior contiene las coordenadas de las imagenes del personaje
export class Warrior extends Personaje {
    constructor(x, y, velocity) {
        super('warrior', x, y, velocity);//coordenadas solicitadas de la imagen
        this.image = document.querySelector('img[alt="warrior"]');// obtiene la imagen
        // Se realiza un mapeo tomando cada coordenada para hacer la animacion
        this.frames = new Map([
            ['forwards-1',[97, 166, 24, 32]],
            ['forwards-2',[129, 166, 22, 32]],
            ['forwards-3',[159, 165, 19, 33]],
            ['forwards-4',[186, 165, 19, 33]],
            ['forwards-5',[213, 165, 19, 33]],
            ['forwards-6',[240, 165, 19, 33]],
            ['forwards-7',[267, 166, 20, 32]],
            ['forwards-8',[295, 167, 20, 31]],
            ['forwards-9',[323, 166, 21, 32]],
            ['forwards-10',[352, 166, 21, 32]],
            ['forwards-11',[381, 165, 22, 33]],
            ['forwards-12',[411, 165, 23, 33]],
            ['forwards-13',[442, 165, 24, 33]],
            ['forwards-14',[474, 165, 25, 33]],
            ['forwards-15',[507, 165, 24, 33]],
            ['forwards-16',[539, 167, 24, 31]],
            ['forwards-17',[571, 167, 22, 31]],
        ]);

    }
}



