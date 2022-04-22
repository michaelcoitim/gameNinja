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
        this.lastKey

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

// criado para ajudar na animação mais fluida-"mapa de teclas" especificações iniciais 
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

let lastKey

//loop animação 
function animete(){
    window.requestAnimationFrame(animete)
    c.fillStyle='black'
    c.fillRect(0, 0, canvas.width , canvas.height)
    jogador.update()
    inimigo.update()

    jogador.velocity.x=0
    inimigo.velocity.x =0

    //movimentos jogador   
    if(keys.a.pressed && lastKey ==='a'){
        jogador.velocity.x = -1

    }else if(keys.d.pressed && lastKey==='d'){
        jogador.velocity.x = 1

    }

        //movimentos inimigo   
        if(keys.ArrowLeft.pressed && inimigo.lastKey ==='ArrowLeft'){
            inimigo.velocity.x = -1
    
        }else if(keys.ArrowRight.pressed && inimigo.lastKey==='ArrowRight'){
            inimigo.velocity.x = 1
    
        }
}

animete()

// crinado eventos (função que "lê" o teclado quando preciona a tecla)
window.addEventListener('keydown', (event) => {
    // botoes jogador
    switch(event.key){
        case 'd':// move para frente
            keys.d.pressed = true
            lastKey= 'd'
        break
        case 'a': //move para traz
            keys.a.pressed = true
            lastKey ='a'
        break
        case 'w': //pular 
            jogador.velocity.y = -10
        break
    }
    // botoes do inimigo 
    switch(event.key){
        case 'ArrowRight':// move para frente
            keys.ArrowRight.pressed = true
            inimigo.lastKey= 'ArrowRight'
        break
        case 'ArrowLeft': //move para traz
            keys.ArrowLeft.pressed = true
            inimigo.lastKey ='ArrowLeft'
        break
        case 'ArrowUp': //pular 
            inimigo.velocity.y = -10
        break
    }
    console.log(event.key)
})
// quando "solta" a tecla 
window.addEventListener('keyup', (event) => {
    // botoes jogador
    switch(event.key){
        case 'd': // para de mover frente
            keys.d.pressed = false
        break
        case 'a': // para de mover traz 
            keys.a.pressed = false
        break

    }
    // botoes do inimigo
    switch(event.key){
        case 'ArrowRight': // para de mover frente
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft': // para de mover traz 
            keys.ArrowLeft.pressed = false
        break

    }
    console.log(event.key)
})
