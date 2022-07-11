function vencedores({jogador, inimigo ,timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayVencedores').style.display = 'flex'

    if(jogador.health == inimigo.health){
        document.querySelector('#displayVencedores').innerHTML= 'Empate'
    

    }else if(jogador.health > inimigo.health){
        document.querySelector('#displayVencedores').innerHTML= 'jogador 1 venceu'

    } else if(jogador.health < inimigo.health){
        document.querySelector('#displayVencedores').innerHTML= 'jogador 2 venceu'
    }

}

let timer = 60 
let timerId
function cronometro(){
    // REGRA conometro
    if(timer > 0) {
        timerId = setTimeout(cronometro, 1000)
        timer--
        document.querySelector('#timer').innerHTML=timer
    }

    // regras dos vencedores
    if(timer===0){
        
        vencedores({jogador, inimigo,timerId})

        
    }

}
