const  canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width=1024;
canvas.height=514;

c.fillRect(0, 0, canvas.width, canvas.height);


//criando jogador e inimigo 

const gravity= 0.9
class Sprite {
    constructor({position, velocity , color = 'red', offSet}){
        this.position =position
        this.velocity =velocity
        this.width = 50
        this.height =150
        this.lastKey
        this.attackBox = { //ataque
            position: {
                x: this.position.x, 
                y: this.position.y
            } ,
            offSet, //delocamento do ataque
            width: 100 ,
            height: 50

        }
        this.color= color
        this.isAttacking
        this.health =100

    }
    // desenha
    draw(){
        c.fillStyle= this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack Box
        if(this.isAttacking){
        c.fillStyle='green'
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
            )
        }

    }
    //atualiza desenho 
    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offSet.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height +this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else{
            this.velocity.y += gravity
        }
        
    }

    attack(){
        this.isAttacking = true
        setTimeout( () => {
            this.isAttacking =false
        }, 100)
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

    },
    offSet: {
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

    },
    color: 'blue', 
    offSet: {
        x: -50,
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

function rectangularCollision({retangulo1, retangulo2}){
    return (
        retangulo1.attackBox.position.x + retangulo1.attackBox.width >= retangulo2.position.x
            && retangulo1.attackBox.position.x <= retangulo2.position.x + retangulo2.width
            && retangulo1.attackBox.position.y + retangulo1.attackBox.height >= retangulo2.position.y
            && retangulo1.attackBox.position.y <= retangulo2.position.y + retangulo2.height
    )
}

let timer = 10 // para testes 
function cronometro(){
    // REGRA conometro
    if(timer > 0) {
        setTimeout(cronometro, 1000)
        timer--
        document.querySelector('#timer').innerHTML=timer
    }

    // regras dos vencedores
    if(timer===0){
        document.querySelector('#displayVencedores').style.display = 'flex'

        if(jogador.health == inimigo.health){
            document.querySelector('#displayVencedores').innerHTML= 'Empate'
           

        }else if(jogador.health > inimigo.health){
            document.querySelector('#displayVencedores').innerHTML= 'jogador 1 venceu'

        } else if(jogador.health < inimigo.health){
            document.querySelector('#displayVencedores').innerHTML= 'jogador 2 venceu'
        }
    }

}
cronometro()

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
    if(keys.a.pressed && jogador.lastKey ==='a'){
        jogador.velocity.x = -5

    }else if(keys.d.pressed && jogador.lastKey==='d'){
        jogador.velocity.x = 5

    }

        //movimentos inimigo   
        if(keys.ArrowLeft.pressed && inimigo.lastKey ==='ArrowLeft'){
            inimigo.velocity.x = -5
    
        }else if(keys.ArrowRight.pressed && inimigo.lastKey==='ArrowRight'){
            inimigo.velocity.x = 5
    
        }


        // Detector de colisões ataque jogador. 
        if( rectangularCollision({
            retangulo1:jogador,
            retangulo2:inimigo
        })&& jogador.isAttacking

            ) {
                jogador.isAttacking=false
               // console.log('peguei')
               inimigo.health -= 20
                document.querySelector('#vidaInimigo').style.width= inimigo.health +'%'
            }

        // Detector de colisões ataque inimigo. 
        if( rectangularCollision({
            retangulo1:inimigo,
            retangulo2:jogador
        })&& inimigo.isAttacking

            ) {
                inimigo.isAttacking=false
                //console.log('peguei inimigo')
                jogador.health -= 20
                document.querySelector('#vidaJogador').style.width= jogador.health +'%'
                
            }
}

animete()

// crinado eventos (função que "lê" o teclado quando preciona a tecla)
window.addEventListener('keydown', (event) => {
    // botoes jogador
    switch(event.key){
        case 'd':// move para frente
            keys.d.pressed = true
            jogador.lastKey= 'd'
        break
        case 'a': //move para traz
            keys.a.pressed = true
            jogador.lastKey ='a'
        break
        case 'w': //pular 
            jogador.velocity.y = -10
        break
        case ' ':
            jogador.attack() 
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
        case 'ArrowDown': //ataque 
            //inimigo.isAttacking = true
            inimigo.attack() 
        break
    }
    //console.log(event.key)
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
    //console.log(event.key)
})
