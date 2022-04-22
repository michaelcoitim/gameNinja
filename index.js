const  canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width=1024;
canvas.height=514;

c.fillRect(0, 0, canvas.width, canvas.height);


//criando jogador e inimigo 

const gravity= 0.2
class Sprite {
    constructor({position, velocity}){
        this.position =position
        this.velocity =velocity
        this.height =150

    }
    // desenha
    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    //atualiza desenho 
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height +this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else{
            this.velocity.y += gravity
        }
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

//console.log(jogador)

// criado para ajudar na animação mais fluida
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

//loop animação 
function animete(){
    window.requestAnimationFrame(animete)
    c.fillStyle='black'
    c.fillRect(0, 0, canvas.width , canvas.height)
    jogador.update()
    inimigo.update()

    //criado para ajudar na animação mais fluida    
    if(keys.a.pressed){
        jogador.velocity.x = -1

    }else if(keys.d.pressed){
        jogador.velocity.x = 1

    }
}

animete()

// crinado eventos (função que "lê" o teclado quando preciona a tecla)
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':// move para frente
            keys.d.pressed = true
        break
        case 'a': //move para traz
            keys.a.pressed = true
        break
    }
    console.log(event.key)
})
// quando "solta" a tecla 
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd': // para de mover frente
            keys.d.pressed = false
        break
        case 'a': // para de mover traz 
            keys.a.pressed = false
        break
    }
    console.log(event.key)
})
