const  canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width=1024;
canvas.height=514;

c.fillRect(0, 0, canvas.width, canvas.height);

//criando jogador e inimigo 
class Sprite {
    constructor(position){
        this.position =position

    }

}

const jogador = new Sprite()