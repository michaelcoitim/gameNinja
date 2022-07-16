const  canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width=1024;
canvas.height=514;

c.fillRect(0, 0, canvas.width, canvas.height);


//criando jogador e inimigo 

const gravity= 0.9

// tela de fundo, chamado uma classe

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x:720,
        y:165
    },
    imageSrc: './img/shop.png',
    scale:2.5,
    framesMax:6
})

const jogador = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0

    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale:2.5,
    offset:{ x:215 , y:156},
    sprites:{
        idle:{
            imageSrc:'./img/samuraiMack/Idle.png',
            framesMax:8
        },
        run:{
            imageSrc:'./img/samuraiMack/Run.png',
            framesMax:8
        
        },
        jump:{
            imageSrc:'./img/samuraiMack/Jump.png',
            framesMax:2
        
        },
        fall:{
            imageSrc:'./img/samuraiMack/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            framesMax:6
        },
        takeHit:{
            imageSrc:'./img/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4
        },
        death:{
            imageSrc:'./img/samuraiMack/Death.png',
            framesMax:6
        }
        
        
    },
    attackBox:{
        offset:{ x:100 , y: 50},
        width:150,
        height:50
    }
})



// crinado inimigo
const inimigo = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0

    },
    color: 'blue', 
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale:2.5,
    offset:{ x:215 , y:155},
    sprites:{
        idle:{
            imageSrc:'./img/kenji/Idle.png',
            framesMax:4
        },
        run:{
            imageSrc:'./img/kenji/Run.png',
            framesMax:8
        
        },
        jump:{
            imageSrc:'./img/kenji/Jump.png',
            framesMax:2
        
        },
        fall:{
            imageSrc:'./img/kenji/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./img/kenji/Attack1.png',
            framesMax:4
        },
        takeHit:{
            imageSrc:'./img/kenji/Take hit.png',
            framesMax:3
        },
        death:{
            imageSrc:'./img/kenji/Death.png',
            framesMax:7
        }
        
        
    },attackBox:{
        offset:{ x:-170 , y: 50},
        width:170,
        height:50
    }

})



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


cronometro()

//loop animação 
function animete(){
    window.requestAnimationFrame(animete)
    c.fillStyle='black'
    c.fillRect(0, 0, canvas.width , canvas.height)
    background.update()
    shop.update()
    //c.fillStyle = 'rgba(255, 255, 255, 0.15)'
   // c.fillRect(0, 0, canvas.width, canvas.height)

    jogador.update()
    inimigo.update()



    jogador.velocity.x=0
    inimigo.velocity.x =0

    //movimentos jogador   
    
    if(keys.a.pressed && jogador.lastKey ==='a'){
        jogador.velocity.x = -5
        jogador.switchSprite('run')

    }else if(keys.d.pressed && jogador.lastKey==='d'){
        jogador.velocity.x = 5
        jogador.switchSprite('run')
    }else{ 
        jogador.switchSprite('idle')
    }


    // jorgador pulando 
    if(jogador.velocity.y < 0){
        jogador.switchSprite('jump')

    }else if (jogador.velocity.y > 0){
        jogador.switchSprite('fall')
    }

        //movimentos inimigo   
        if(keys.ArrowLeft.pressed && inimigo.lastKey ==='ArrowLeft'){
            inimigo.velocity.x = -5
            inimigo.switchSprite('run')
    
        }else if(keys.ArrowRight.pressed && inimigo.lastKey==='ArrowRight'){
            inimigo.velocity.x = 5
            inimigo.switchSprite('run')
    
        }else{
            inimigo.switchSprite('idle')
        }

            // inimigo pulando 
    if(inimigo.velocity.y < 0){
        inimigo.switchSprite('jump')
    }else if (inimigo.velocity.y > 0){
        inimigo.switchSprite('fall')
    }



        // Detector de colisões ataque jogador. 
        if( rectangularCollision({
            retangulo1:jogador,
            retangulo2:inimigo
        })&& jogador.isAttacking && jogador.framesCurrent === 4

            ) {
                inimigo.takeHit()
                jogador.isAttacking=false
               // console.log('peguei')
                //inimigo.health -= 20
                //document.querySelector('#vidaInimigo').style.width= inimigo.health +'%'
                gsap.to('#vidaInimigo', {
                    width: inimigo.health +'%'
                })
            }

            //jogador errou ataque
            if(jogador.isAttacking && jogador.framesCurrent ===4) {
                jogador.isAttacking=false

            }

        // Detector de colisões ataque inimigo/ jogador recebendo ataque. 
        if( rectangularCollision({
            retangulo1:inimigo,
            retangulo2:jogador
        })&& inimigo.isAttacking && inimigo.framesCurrent ===2

            ) {
                jogador.takeHit()
                inimigo.isAttacking=false
                //document.querySelector('#vidaJogador').style.width= jogador.health +'%'
                gsap.to('#vidaJogador', {
                    width: jogador.health +'%'
                })
                
            }
            
            //inimigo errou ataque
            if(inimigo.isAttacking && inimigo.framesCurrent ===2) {
                inimigo.isAttacking=false
            
            }
        
        //fim de vida fim de jogo
        if(inimigo.health <= 0 || jogador.health <= 0){
            vencedores({jogador, inimigo,timerId})
        }


}

animete()

// crinado eventos (função que "lê" o teclado quando preciona a tecla)
window.addEventListener('keydown', (event) => {
    // botoes jogador
    if(!jogador.dead){
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
}
    // botoes do inimigo
    if(!inimigo.dead){
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
