const  canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width=1024;
canvas.height=514;

c.fillRect(0, 0, canvas.width, canvas.height);

//criando jogador e inimigo 
class Sprite {
    constructor({position, velocity}){
        this.position =position
        this.velocity =velocity

    }
    // desenha
    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
    //atualiza desenho 
    update(){
        this.draw()
        this.position.y += 10
    }

}

const jogador = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0

    }
})



// crinado inimigo

const inimigo = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0

    }
})



//loop animação 

function animete(){
    window.requestAnimationFrame(animete)
    c.fillStyle='black'
    c.fillRect(0, 0, canvas.width , canvas.height)
    jogador.update()
    inimigo.update()
}

animete()

console.log(jogador)