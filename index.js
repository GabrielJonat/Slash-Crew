const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024

canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.98

let lastPlayerKey, lastEnemyKey, upon = false

const background = new Sprite({
    position: {x: 0, y: 0},

    imgSrc: './images/background.png'
})

const shop = new Sprite({

    position: {x: 600, y: 128},

    imgSrc: './images/shop.png',

    scale: 2.75,

    framesMax: 6
})

const player = new Fighter({

    position: { x: 0, y: 0},

    velocity: {x: 0, y: 10},

    imgSrc: './images/Kelev.png',

    scale: 1.8,

    framesMax: 8,

    offset: {x: 120, y: 58},

    sprites: {

        idle: {
            
            imgSrc: './images/Kelev.png',
            framesMax: 8,
            scale: 2.6
        },

        toTheRight: {
            
            imgSrc: './images/mikey_right_run.png',
            framesMax: 3,
            scale: 4
        },

        toTheLeft: {
            
            imgSrc: './images/mikey_left_run.png',
            framesMax: 3,
            scale: 4
        }

    }

}, 120, 100)

const enemy = new Fighter({

    position: { x: 921, y: 100},

    velocity: {x: 0, y: 10},

    imgSrc: './images/Mikey.png',

    scale: 2.6,

    framesMax: 8,

    offset: {x: 217, y: 90},

    sprites: {

        idle: {
            
            imgSrc: './images/Mikey.png',
            framesMax: 8,
            scale: 2.6
        },

        toTheRight: {
            
            imgSrc: './images/mikey_right_run.png',
            framesMax: 3,
            scale: 4
        },

        toTheLeft: {
            
            imgSrc: './images/mikey_left_run.png',
            framesMax: 3,
            scale: 4
        },

        thrust: {

            imgSrc: './images/Mikey-Attack.png',
            framesMax: 4,
            scale: 2.1
        },

        reverseThrust: {

            imgSrc: './images/Mikey-Attack-Reverse.png',
            framesMax: 4,
            scale: 2.1
        }
    }
    
}, -700 , 18)

const keys = {

    a: {

        pressed: false

    },

    d: {

        pressed: false

    },

    w: {

        pressed: false

    },


    ArrowLeft: {

        pressed: false

    },

    ArrowRight: {

        pressed: false

    },

    ArrowUp: {

        pressed: false

    },

   e: {

        pressed: false

   },

   n: {

        pressed: false

   }

}

function getWinner(player, enemy, timerId){

    clearTimeout(timerId)

    document.querySelector('#outcome').style.display = 'flex'

    if(player.health === enemy.health)
        
        document.querySelector('#outcome').innerHTML = 'Tie'

    else if(player.health > enemy.health)

        document.querySelector('#outcome').innerHTML = 'Player 1 Wins'

    else

        document.querySelector('#outcome').innerHTML = 'Player 2 Wins'


}

let timerId
upon = false

let timer = document.querySelector('#timer').innerHTML

function countDown(){
    
    if (timer){
    
    timerId = setTimeout((countDown), 1000)

        timer --

        document.querySelector('#timer').innerHTML = timer

    }

    if (timer === 0){


        getWinner(player, enemy, timerId)

    }
}

countDown()

function defAnimation(){

    window.requestAnimationFrame(defAnimation)

    c.fillStyle = 'black'

    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update() 

    shop.update()

    player.update()

    enemy.update(true)

    player.velocity.x = 0

    player.img = player.sprites.idle.img

    enemy.framesMax = 8

    enemy.scale = 2.6

    enemy.offset = {x: 217, y: 90}

    enemy.img = enemy.sprites.idle.img

    if (keys.a.pressed && lastPlayerKey === 'a' && player.position.x >= 10 &&
     (player.position.x >= enemy.position.x + enemy.width + 10 ||
      player.position.x < enemy.position.x || player.position.y + player.height < enemy.position.y
     )){

        player.velocity.x = -10

    }

    else{
         if (keys.d.pressed && lastPlayerKey === 'd' &&  player.position.x <= 970 &&
            (player.position.x + player.width <= enemy.position.x - 10 || 
            player.position.x >= enemy.position.x + enemy.width || player.position.y + player.height < enemy.position.y)
         ){

            player.velocity.x = 10
        
        }
    }

    if (keys.w.pressed && player.velocity.y == 0 || keys.w.pressed && upon){

        player.velocity.y = -19

    }

    enemy.velocity.x = 0
    
    if (keys.ArrowLeft.pressed && lastEnemyKey === 'ArrowLeft' && enemy.position.x >= 10 &&
       (enemy.position.x >= player.position.x + player.width + 10 ||
       enemy.position.x < player.position.x || enemy.position.y + enemy.height < player.position.y)
    ){
    
        enemy.velocity.x = -10

        enemy.img = enemy.sprites.toTheLeft.img

        enemy.framesMax = 3

        enemy.scale = 3.2

        enemy.offset = {
            x: 285,
            y: 130
        }


    }
    
    else{ 
        
        if (keys.ArrowRight.pressed && lastEnemyKey === 'ArrowRight' && enemy.position.x <= 970 &&
           (enemy.position.x + enemy.width <= player.position.x - 10 || 
           enemy.position.x >= player.position.x + player.width || enemy.position.y + enemy.height < player.position.y)){
    
        enemy.velocity.x = 10
        
        enemy.img = enemy.sprites.toTheRight.img

        enemy.framesMax = 3

        enemy.scale = 3.2

        enemy.offset = {
            x: 285,
            y: 130
        }

    }
}

    if (keys.ArrowUp.pressed && enemy.velocity.y === 0 || keys.ArrowUp.pressed && upon ){

        enemy.velocity.y = -19

    }

    if (player.position.y + player.height <= enemy.position.y &&
        player.position.y + player.height >= enemy.position.y - 49 &&  
        (player.position.x + player.width > enemy.position.x &&
        player.position.x + player.width <= enemy.position.x + enemy.width ||
         player.position.x <= enemy.position.x + enemy.width &&
        player.position.x >= enemy.position.x)){
        

            player.velocity.y = 0

            upon = true


        }

    if (enemy.position.y + enemy.height <= player.position.y &&
        enemy.position.y + enemy.height >= player.position.y - 49 &&  
        (enemy.position.x + enemy.width > player.position.x &&
        enemy.position.x + enemy.width <= player.position.x + player.width ||
         enemy.position.x <= player.position.x + player.width &&
        enemy.position.x >= player.position.x)){

            enemy.velocity.y = 0

            upon = true

          }

    if(!(player.position.y + player.height <= enemy.position.y &&
        player.position.y + player.height >= enemy.position.y - 49 &&  
        (player.position.x + player.width > enemy.position.x &&
        player.position.x + player.width <= enemy.position.x + enemy.width ||
         player.position.x <= enemy.position.x + enemy.width &&
        player.position.x >= enemy.position.x)) && ! (enemy.position.y + enemy.height <= player.position.y &&
            enemy.position.y + enemy.height >= player.position.y - 49 &&  
            (enemy.position.x + enemy.width > player.position.x &&
            enemy.position.x + enemy.width <= player.position.x + player.width ||
             enemy.position.x <= player.position.x + player.width &&
            enemy.position.x >= player.position.x)))
        {
        
            upon = false
        
        }

    if (keys.e.pressed)

        player.attack()

    if (keys.n.pressed && keys.ArrowLeft.pressed == false && keys.ArrowRight.pressed == false && enemy.velocity.y == 0 )
{       
        enemy.attack()
    
        if (enemy.attackBox.width < 0)

            enemy.img = enemy.sprites.thrust.img
        
        else

            enemy.img = enemy.sprites.reverseThrust.img
        
        

        enemy.framesMax = enemy.sprites.thrust.framesMax
        
        enemy.scale = enemy.sprites.thrust.scale

        enemy.offset = {x:190, y: 57}


    }


    if (player.position.x  >= enemy.position.x + enemy.width ){

            player.attackBox.width = -120
        
            if (player.position.x + player.attackBox.width <= enemy.position.x && 
                player.isAttacking){
        
                enemy.health -= 0.5  
        
                document.querySelector('#enemy-health').style.width = enemy.health + '%'
        

            }

        }
    
    else{

            player.attackBox.width = 120
    
            if (player.position.x + player.attackBox.width >= enemy.position.x &&
                player.isAttacking
            ){

                enemy.health -= 0.5    
        
                document.querySelector('#enemy-health').style.width = enemy.health + '%'

            }

        }
    
        if (enemy.position.x >= player.position.x + player.width){

            enemy.attackBox.width = -161.8
            
            if (enemy.position.x + enemy.attackBox.width <= player.position.x + player.width && 
                enemy.isAttacking){
     
                player.health -= 0.3
     
                document.querySelector('#player-health').style.width = player.health + '%'
     
                console.log('hit')

            }
    }

    else{
        
           enemy.attackBox.width = 161.8
    
            if(enemy.position.x + 161.8 >= player.position.x &&
               enemy.isAttacking){

                player.health -= 0.3

                document.querySelector('#player-health').style.width = player.health + '%'

                console.log('hit')

           }  
        

    }

    if(player.health <= 0 || enemy.health <= 0)

        getWinner(player, enemy, timerId)

    
    if (enemy.position.y + enemy.height != canvas.height - 100 && enemy.velocity.y === 0 && upon == false)

        enemy.position.y = canvas.height - 96 - enemy.height


    if (player.position.y + player.height != canvas.height - 100 && player.velocity.y === 0 && upon == false)

        player.position.y = canvas.height - 96 - player.height
    
        console.log(enemy.isAttacking)
    }

defAnimation()

window.addEventListener('keydown',(event) => {
   
    switch(event.key){

        case 'd':

            keys.d.pressed = true
            
            lastPlayerKey = 'd'

            break

        case 'a':

            keys.a.pressed = true
            
            lastPlayerKey = 'a'

            break

        case 'w':

            keys.w.pressed = true

            break

        case 'e':

            keys.e.pressed = true

            break

            
    }
    


}) 

window.addEventListener('keyup',(event) => {
   
    switch(event.key){

        case 'd':

            keys.d.pressed = false
            
            break

        case 'a':

            keys.a.pressed = false
            
            break


        case 'w':

            keys.w.pressed = false
            
            break


        case 'e':

            keys.e.pressed = false
            
            break


    }    

}) 

window.addEventListener('keydown',(event) => {
   
    switch(event.key){

        case 'ArrowRight':

            keys.ArrowRight.pressed = true
            
            lastEnemyKey = 'ArrowRight'

            break

        case 'ArrowLeft':

            keys.ArrowLeft.pressed = true
            
            lastEnemyKey = 'ArrowLeft'

            break

            
        case 'ArrowUp':

            keys.ArrowUp.pressed = true

            break


        case 'n':

            setTimeout(() => {
            
                keys.n.pressed = !keys.n.pressed

            }, 300)

            break

    }

}) 

window.addEventListener('keyup',(event) => {
   
    switch(event.key){

        case 'ArrowRight':

            keys.ArrowRight.pressed = false
            
            break

        case 'ArrowLeft':

            keys.ArrowLeft.pressed = false
            
            break


        case 'ArrowUp':

            keys.ArrowUp.pressed = false
            
            break
    }

   
}) 