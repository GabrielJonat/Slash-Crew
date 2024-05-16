class Fighter {

    constructor({position, velocity}, attackWidth, attackHeight){

        this.position = position

        this.velocity = velocity

        this.height = 150

        this.width = 50

        this.isAttacking = false

        this.health = 100

        this.attackBox = {

            position: this.position,

            width: attackWidth,

            height: attackHeight

        }
    }

    draw(enemy){

        if (enemy)
        
            c.fillStyle = 'purple'
        
        else
        
            c.fillStyle = 'green'

        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        
        if(this.isAttacking){
        
                c.fillStyle = 'cyan'
        
                c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        }

    }

        update(enemy){

            if (enemy)

                this.draw(true)

            else

                this.draw()

            this.position.y += this.velocity.y

            this.position.x += this.velocity.x

            if (this.position.y + this.height >= canvas.height - 100)

                this.velocity.y = 0

            else

                this.velocity.y += gravity

        }

        attack(){

            this.isAttacking = true

            setTimeout(() => {
        
                this.isAttacking = false
        
            }, 150)
        
        }


}

class Sprite {

    constructor({position, imgSrc, scale = 1, framesMax = 1}){

        this.position = position

        this.height = 150

        this.width = 50

        this.img = new Image()

        this.img.src = imgSrc

        this.scale = scale

        this.framesMax = framesMax

        this.framesCurrent = 0

        this.framesElapsed = 0

        this.framesHold = 7
    
    }

    draw(enemy){

        c.drawImage(this.img, this.framesCurrent * (this.img.width / this.framesMax) , 0, this.img.width / this.framesMax, this.img.height, this.position.x, this.position.y,  (this.img.width / this.framesMax) * this.scale, this.img.height  * this.scale)
    
    }

        update(enemy){

            if (enemy){

                this.draw(true)
                
                this.framesElapsed++
                
                if(this.framesElapsed % this.framesHold === 0){
        
                    if(this.framesCurrent < this.framesMax - 1)

                        this.framesCurrent ++ 
                
                    else
                
                        this.framesCurrent = 0

                }
        }
            
            else{

                this.draw()
                
                this.framesElapsed++
                
                if(this.framesElapsed % this.framesHold === 0){
        
                    if(this.framesCurrent < this.framesMax - 1)

                        this.framesCurrent ++ 
                
                    else
                
                        this.framesCurrent = 0

                }            
            }
        }


}
