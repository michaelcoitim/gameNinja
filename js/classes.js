class Sprite {
    constructor({position, imageSrc }){
        this.position =position
        this.width = 50
        this.height =150
        this.image = new Image()
        this.image.src = imageSrc

    }
    // desenha
    draw(){ 
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    //atualiza desenho 
    update(){
        this.draw()

        
    }


}


class Fighter {
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

