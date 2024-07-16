class Sprite {

    constructor({position, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}){

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

        this.offset = offset

    }

    draw(){

        c.drawImage(this.img, this.framesCurrent * (this.img.width / this.framesMax) , 0, this.img.width / this.framesMax, this.img.height, this.position.x - this.offset.x , this.position.y - this.offset.y ,  (this.img.width / this.framesMax) * this.scale, this.img.height  * this.scale)
        
       //c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    animateFrames(){

        this.framesElapsed++
                
                if(this.framesElapsed % this.framesHold === 0){
        
                    if(this.framesCurrent < this.framesMax - 1)

                        this.framesCurrent ++ 
                
                    else{
                
                        this.framesCurrent = 0
                        this.loops ++
                    }

                }

    }

        update(){
       
                this.animateFrames()

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


class Projectile extends Sprite{

    constructor({position, velocity, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites}){

        super({position, imgSrc, scale, framesMax, offset})
    
        this.velocity = velocity

        this.height = 30

        this.width = 30

        this.framesCurrent = 0

        this.framesElapsed = 0

        this.framesHold = 7

        this.sprites = sprites

        for (const sprite in this.sprites){

            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc
            this.framesCurrent = 0

        }

    }

    update(){

            this.draw()

            this.animateFrames()

            this.position.x += this.velocity.x

        }

        move(){

            this.velocity.x = -24
    
        }
    

    }



class Fighter extends Sprite{

    constructor({position, velocity, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites},attackWidth, attackHeight,duration=1760){

        super({
            position,
            imgSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity

        this.height = 100

        this.width = 70

        this.isAttacking = false

        this.isDashing = false

        this.isGrapling = false

        this.isDead = false

        this.lastWords = 0

        this.isParalyzed = false

        this.isDefending = false

        this.health = 100

        this.attackBox = {

            position: this.position,

            width: attackWidth,

            height: attackHeight

        }


        this.framesCurrent = 0

        this.framesElapsed = 0

        this.framesHold = 7

        this.loops = 0

        this.boot = false

        this.sprites = sprites

        this.shield = this.health / 1.618

        this.Projectiles = []

        this.moves = []

        duration== 1 ? this.paralyzationDuration = 500 : this.paralyzationDuration = 1760 

        for (const sprite in this.sprites){

            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc
            this.framesCurrent = 0

        }
    }


        update(){

            this.draw()

            this.animateFrames()

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
        
            }, 100)
        
        }

        dash()
        {

            this.isDashing = true

            setTimeout(() => {

                this.isDashing = false

            }, 500)


        }

        graple(){

            this.isGrapling = true

            setTimeout(() =>{

                this.isGrapling = false

            }, 1000)

        }
        paralyze(){

            this.isParalyzed = true

            setTimeout(() =>{

                this.isParalyzed = false
                this.boot = false

            }, this.paralyzationDuration)

        }
        
        die(dyingAudio,tautingAudio){

            this.isDead = true
        
            if(this.lastWords == 0){

                dyingAudio.play()

                if(tautingAudio)
                    
                    tautingAudio.play()

                this.lastWords ++

            }


    }


        shoot(){

            this.Projectiles.push(new Projectile({
        
                position: { x: this.position.x,  y: this.position.y},

                velocity: {x: this.velocity.x, y: 0},
            
                imgSrc: './images/Proj.png',
            
                scale: 1.3,
            
                framesMax: 4,
            
                offset: {x: 120, y: 58},
            
                sprites: {
            
                    idle: {
                        
                        imgSrc: './images/Kelev.png',
                        framesMax: 8,
                        scale: 2.6
                    }            
                }
         } ))

         this.Projectiles.forEach((proj) => {

            proj.move()

         })

         //this.Projectiles.pop()

        }

        initiateMove(){

            this.framesCurrent = 0
            this.loops = 0
        }
}
