const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024

canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.98

let lastPlayerKey, lastEnemyKey, upon = false

let hitSound = new Audio("./audio/hitSound.wav")

let whistleSound = new Audio("./audio/whistleSound.wav")

let swordHit = new Audio("./audio/swordHit.wav")

let spearHit = new Audio("./audio/spearHit.wav")

let kelevDash = new Audio("./audio/KelevDash.mp3")

let dashMiss = new Audio("./audio/DashMiss.mp3")

let shielPick = new Audio("./audio/ShieldPickup.wav")

let mikeyJump = new Audio("./audio/MikeySceam.wav")

let kelevJump = new Audio("./audio/Effort.wav")

let angryBark = new Audio("./audio/AngryBark.wav")

let shieldWorking = new Audio("./audio/ShieldWorked.wav")

let kelevLost = new Audio("./audio/KelevLost.wav")

let mikeyLost = new Audio("./audio/MikeyLost.wav")

let inicio = new Audio("./audio/inicio.wav")

let meio = new Audio("./audio/meio.mp3")

let fim = new Audio("./audio/fim.mp3")

let run = new Audio("./audio/run.mp4")

const kelevAudio = [angryBark, kelevJump, dashMiss, kelevDash, kelevLost]

const mikeyAudio = [mikeyJump, mikeyLost]

const music = [inicio, meio, fim]

const effects = [shieldWorking, run, swordHit, spearHit, shielPick,whistleSound,hitSound]

const params = new URLSearchParams(window.location.search);

mikeyAudio.forEach(element => {

    element.volume = Number(params.get('chr'))/10
    
});

kelevAudio.forEach(element => {
    
    element.volume =  Number(params.get('chr'))/10
});

music.forEach((audio) => {

    audio.volume =  Number(params.get('music'))/10
})

effects.forEach((audio) => {

    audio.volume =  Number(params.get('sfx'))/10
})


let uivou = false

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

    position: { x: 100, y: 0},

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
            
            imgSrc: './images/Kelev_Run.png',
            framesMax: 3,
            scale: 4
        },

        toTheLeft: {
            
            imgSrc: './images/Kelev_Run_Reverse.png',
            framesMax: 3,
            scale: 4
        },

        jump: {

            imgSrc: './images/Kelev_jump.png',
            framesMax: 12,
            scale: 1.3

        },

        right_attack: {

            imgSrc: './images/Kelev-Attack.png',
            framesMax: 5,
            scale: 1.3
        },

        left_attack: {

            imgSrc: './images/Kelev-Attack-Reverse.png',
            framesMax: 5,
            scale: 1.3
        },

        dead: {

            imgSrc: './images/Kelev_defeat.png',
            framesMax: 1,
            scale: 1.3

        },

        dash: {

            imgSrc: './images/Kelev_Dash.png',
            framesMax: 1,
            scale: 1.3


        },

        reverse_dash: {

            imgSrc: './images/Kelev_Dash - Reverse.png',
            framesMax: 1,
            scale: 1.3

        },

        paralyze: {

            imgSrc: './images/Kelev_Dizzy.png',
            framesMax: 1,
            scale: 1.3

        },

        pickup: {

            imgSrc: './images/Kelev_Sacando.png',
            framesMax: 1,
            scale: 1.3

        },

        defending: {

            imgSrc: './images/Kelev_Defending.png',
            framesMax: 1,
            scale: 1.3


        },

        TryingToDefend: {

            imgSrc: './images/Kelev_No_Shield.png',
            framesMax: 1,
            scale: 1.3


        }

    }

}, 120, 100)


const enemy = new Fighter({

    position: { x: 821, y: 100},

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

        idleReverse: {

            imgSrc: './images/Mikey-Reverse.png',
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
        },

        jump: {

            imgSrc: './images/Mikey_Jump.png',
            framesMax: 6,
            scale: 2

        },

        dead: {

            imgSrc: './images/Mikey_defeat.png',
            framesMax: 1,
            scale: 2

        },

        shoot: {

            imgSrc: './images/Mikey-Shoot.png',
            framesMax: 1,
            scale: 2

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
    ArrowDown: {

        pressed: false

    },
   e: {

        pressed: false

   },
   
   c: {

        pressed: false

   },

   v: {

        pressed: false

   },

   n: {

        pressed: false

   },

   c: {

        pressed: false

   },

   q: {

        pressed: false

   },

   m: {

        pressed: false

   }

}


function getWinner(player, enemy, timerId){

    clearTimeout(timerId)

    document.querySelector('#outcome').style.display = 'flex'

    if(player.health === enemy.health)
        
        document.querySelector('#outcome').innerHTML = 'Tie'

    else if(player.health > enemy.health){

        document.querySelector('#outcome').innerHTML = 'Kelev Wins'
        
        enemy.img = enemy.sprites.dead.img

        enemy.framesMax = 1

        keys.n.pressed = false

        enemy.die(mikeyLost)

        enemy.isAttacking = false

        enemy.offset.y = 70
    }

    else{

        document.querySelector('#outcome').innerHTML = 'Michael The Duck Wins'
    
        player.img = player.sprites.dead.img

        player.framesMax = 1

        player.offset.x = 160

        player.offset.y = 60

        player.scale = 2

        keys.e.pressed = false
        player.die(kelevLost)

        player.height = 60

        player.isAttacking = false

    }

}

let timerId
upon = false
let enemyPulo = false

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

    if(enemy.health == 100 && player.health == 100){

        inicio.play();

    }

    if(fim.paused && (document.querySelector("#outcome").innerHTML != "Kelev Wins" && document.querySelector("#outcome").innerHTML != "Michael The Duck Wins" )){
    
        meio.play();

    }

    if(timer == 33){

        meio.pause();

        fim.play();

    }

    background.update() 

    shop.update()

    player.update()

    enemy.update(true)

    if(Math.abs(enemy.position.x - player.position.x) >= 375){
    enemy.Projectiles.forEach((proj) => { 
        
        if(keys.m.pressed == false && shooting) 
            
            proj.update()

        if(proj.position.x >= player.position.x && proj.position.x <= player.position.x + player.width && proj.position.y < player.position.y + player.height && Math.abs(enemy.position.x - player.position.x) >= 375){
        
            enemy.Projectiles.pop(proj)
            
            if(! player.isDashing && ! player.isAttacking){
            
                whistleSound.play();
        
                player.health -= 0.2 

                document.querySelector('#player-health').style.width = player.health + '%'
           
                
        }

            
            enemy.Projectiles = []
        }

            })}
    else{

        keys.m.pressed = true
    }

    enemyPulo = false

    player.velocity.x = 0

    player.img = player.sprites.idle.img

    enemy.framesMax = 8

    enemy.scale = 2.6

    enemy.offset = {x: 217, y: 90}

    enemy.img = enemy.sprites.idle.img

    player.framesMax = 8

    player.scale = 1.8

    player.offset = {x: 120, y: 58}
    

    if (keys.a.pressed && lastPlayerKey === 'a' && player.position.x >= 10 &&
     (player.position.x >= enemy.position.x + enemy.width + 10 ||
      player.position.x < enemy.position.x || player.position.y + player.height < enemy.position.y
     )){

        run.play();

        keys.e.pressed = false

        player.velocity.x = -10

        player.img = player.sprites.toTheLeft.img

        player.framesMax = 7

        player.scale = 1.4

        player.offset.y = 33
  
    }

    else{
         if (keys.d.pressed && lastPlayerKey === 'd' &&  player.position.x <= 970 &&
            (player.position.x + player.width <= enemy.position.x - 10 || 
            player.position.x >= enemy.position.x + enemy.width || player.position.y + player.height < enemy.position.y)
         ){

            run.play();
            
            keys.e.pressed = false

            player.velocity.x = 10

            player.img = player.sprites.toTheRight.img

            player.framesMax = 7
        
            player.scale = 1.4
        
            
        player.offset.y = 33

        }
    }

    if (keys.w.pressed && player.velocity.y == 0 || keys.w.pressed && upon && player.isDefending == false){

        kelevJump.play();

        keys.e.pressed = false

        keys.q.pressed = false
        
        setTimeout(function(){player.velocity.y = -23}, 150)


    }

    enemy.velocity.x = 0
    
    if (keys.ArrowLeft.pressed && lastEnemyKey === 'ArrowLeft' && enemy.position.x >= 10 &&
       (enemy.position.x >= player.position.x + player.width + 10 ||
       enemy.position.x < player.position.x || enemy.position.y + enemy.height < player.position.y)
    ){
    
        run.play()

        keys.n.pressed = false

        enemy.velocity.x = -10

        enemy.img = enemy.sprites.toTheLeft.img

        enemy.framesMax = 3

        enemy.scale = 3.2

        enemy.offset = {
            x: 285,
            y: 130
        }
        if(keys.ArrowDown.pressed && player.attackBox.width > 0 && !playerPulo){

            keys.a.pressed = false
            enemy.paralyzationDuration = 1000
            enemy.paralyze()
            player.paralyzationDuration = 700
            keys.a.pressed = false
            keys.s.pressed = false
            keys.w.pressed = false
            keys.d.pressed = false
            keys.e.pressed = false
            keys.q.pressed = false
            player.paralyze()
            enemy.attack()
            enemy.moves[2] = true
            setTimeout(() => {
                enemy.moves[2] = false
            }, 1000)
        }

    }
    
    else{ 
        
        if (keys.ArrowRight.pressed && lastEnemyKey === 'ArrowRight' && enemy.position.x <= 970 &&
           (enemy.position.x + enemy.width <= player.position.x - 10 || 
           enemy.position.x >= player.position.x + player.width || enemy.position.y + enemy.height < player.position.y)){    
        
        run.play()

        keys.n.pressed = false

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

        
        mikeyJump.play();

        keys.n.pressed = false

        enemyPulo = true

        enemy.velocity.y = -19

        


    }

    if(enemy.position.y + enemy.height < canvas.height - 100 && enemy.velocity.y != 0 && !upon){

        enemy.img = enemy.sprites.jump.img

        enemy.framesMax = 6

        enemy.scale = 1.8
    
        enemy.offset = {x: 150, y: 50}
        if(keys.ArrowDown.pressed){

            enemy.velocity.y = 30
            if(Math.abs(enemy.position.x - player.position.x) <= 210 && !enemyPulo){
                if(enemy.attackBox.width > 0){

                    if(canvas.width - enemy.position.x  > 90 && canvas.width - player.position.x  > 90 ){

                        enemy.velocity.x = 20
                        player.velocity.x = 20
                        player.health -= 2.1
                        enemy.paralyzationDuration = 600
                        enemy.paralyze()
                    }
                }
                else{
                    
                    if(enemy.position.x > 20 && player.position.x > 20){
    
                        enemy.velocity.x = -20
                        player.velocity.x = -20
                        player.health -= 2.1
                        enemy.paralyzationDuration = 600
                        enemy.paralyze()
                    }
                }
            }
        document.querySelector('#player-health').style.width = player.health + '%'
        }
    }

    if(player.position.y + player.height < canvas.height - 100 && player.velocity.y != 0 && !upon){

        player.img = player.sprites.jump.img

        player.framesMax = 13   

        player.scale = 1.8
    
        player.offset = {x: 150, y: 50}

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

        AttackRampage = false

    if (keys.e.pressed && keys.a.pressed == false && keys.d.pressed == false && player.velocity.y == 0 && AttackRampage == false && player.isDefending == false){

        player.attack()

        AttackRampage = true

        if (player.attackBox.width < 0){

            player.img = player.sprites.left_attack.img
        
            player.offset = {x: 112, y: 25}
        }
        
        else{

            player.img = player.sprites.right_attack.img
         
            player.offset = {x:70, y: 25}
        }
        

        player.framesMax = player.sprites.left_attack.framesMax
        
        player.scale = player.sprites.left_attack.scale

       


    }

    if(keys.v.pressed && lastPlayerKey === 'v' && player.velocity.y === 0 &&  player.position.x <= 970 &&
    (player.position.x + player.width <= enemy.position.x - 30 || 
    player.position.x >= enemy.position.x + enemy.width || player.position.y + player.height < enemy.position.y))
    {


        player.dash()

        player.img = player.sprites.dash.img

        player.framesMax = 8

        player.scale = 1.4

        player.offset = {x: 100, y: 30}

        setTimeout(() => {

            player.velocity.x = 30            


        }, 10)

        
        setTimeout(() =>{
                
            keys.v.pressed = false
            
 
        }, 360)

    }

    if(keys.c.pressed && lastPlayerKey === 'c' && player.position.x >= 10 &&
    (player.position.x >= enemy.position.x + enemy.width + 30 ||
     player.position.x < enemy.position.x || player.position.y + player.height < enemy.position.y
    ))
    {

        keys.e.pressed = false

        player.dash()

        player.img = player.sprites.reverse_dash.img

        player.framesMax = 8

        player.scale = 1.4

        player.offset = {x: 100, y: 30}

        setTimeout(() => {

            player.velocity.x = -30            


        }, 10)

        
        setTimeout(() =>{
                
            keys.c.pressed = false
            
 
        }, 360)

    }

    if (enemyPulo && player.isDashing){

        
        dashMiss.play();

        player.paralyze()

    }


    if(player.isParalyzed){

        player.img = player.sprites.paralyze.img

        player.framesMax = 7

        player.scale = 1.8

        player.offset = {x: 120, y: 60}

    }
Math
    if(keys.m.pressed == true && lastEnemyKey == 'm'  && enemy.attackBox.width < 0 && enemy.position.y + enemy.height >= canvas.height - 100 && Math.abs(enemy.position.x - player.position.x) >= 375 && attackMode == false){

        enemy.shoot()

        enemy.img = enemy.sprites.shoot.img

        enemy.framesMax = 4

        enemy.offset.y = 55

        enemy.scale = 2.09

        setTimeout(() => {console.log()}, 800)
    }

    attackMode = false

    if (keys.n.pressed && keys.ArrowLeft.pressed == false && keys.ArrowRight.pressed == false && enemy.velocity.y == 0 )
{       
        
        attackMode = true

        enemy.attack()
    
        if (enemy.attackBox.width < 0)

            enemy.img = enemy.sprites.thrust.img
        
        else

            enemy.img = enemy.sprites.reverseThrust.img
        
        

        enemy.framesMax = enemy.sprites.thrust.framesMax
        
        enemy.scale = enemy.sprites.thrust.scale

        enemy.offset = {x:190, y: 57}
        if(keys.ArrowDown.pressed){

            enemy.attack()
            enemy.velocity.y = -24
            keys.n.pressed = false
            setTimeout(() => {

                enemy.moves[3] = false
            }, 1000)
        }



    }

    if(keys.q.pressed && lastPlayerKey == 'q' && !AttackRampage && player.position.y + player.height > canvas.height - 100){

        shielPick.play();

        player.isDefending = true

        player.img = player.sprites.pickup.img

        setTimeout(() => {
            
            console.log(player.isDefending, keys.q.pressed, player.shield)
       
        }, 500)

    }

    if (player.isDefending && player.shield <= 0){

        angryBark.play();

        shielPick.pause();

        player.img = player.sprites.TryingToDefend.img

        player.framesMax = 4

    }
    if(player.isDefending && lastPlayerKey == 'q' && player.shield > 0 && player.position.y + player.height > canvas.height - 100){

        player.img = player.sprites.defending.img

        player.framesMax = 6

    }

    else{

        player.isDefending = false

    }


    if (player.position.x  >= enemy.position.x + enemy.width ){

            player.attackBox.width = -170
        
            if (player.position.x + player.attackBox.width <= enemy.position.x ){
        
        
                if(player.isAttacking){
                
                    enemy.health -= 0.38 

                    keys.m.pressed = false
                
                    swordHit.play();
                
                }

                else if(player.isDashing && enemy.velocity.y === 0){

                    enemy.health -= 1.6

                    swordHit.play();
                
                }

                
                document.querySelector('#enemy-health').style.width = enemy.health + '%'
        
            }

        }
    
    else{

            player.attackBox.width = 170
    
            if (player.position.x + player.attackBox.width >= enemy.position.x && enemy.position.y + enemy.height > player.position.y)
            {

                if(player.isAttacking){

                    swordHit.play();
                
                    enemy.health -= 0.38    
                
            }

                else if(player.isDashing && enemy.velocity.y === 0){

                    swordHit.play();
                

                    enemy.health -= 1.6

                }

                document.querySelector('#enemy-health').style.width = enemy.health + '%'

            }

        }
    
        if (enemy.position.x >= player.position.x + player.width){

            enemy.attackBox.width = -161.8
            
            if (enemy.position.x + enemy.attackBox.width <= player.position.x + player.width && 
                enemy.isAttacking && (player.isDefending == false || player.shield <= 0) && player.position.y + player.height > canvas.height - 100){
     
                spearHit.play();

                player.health -= 0.26
     

                document.querySelector('#player-health').style.width = player.health + '%'
     

            }
            else if(player.isDefending && player.shield > 0 && enemy.isAttacking){

                shieldWorking.play();

                player.shield -= 0.26

           } 
    }

    else{
        
           enemy.attackBox.width = 161.8
    
           if(enemy.velocity.x === 0 && enemy.position.y + enemy.height >= canvas.height - 100 && !enemy.isAttacking)
            
                enemy.img = enemy.sprites.idleReverse.img

            if(enemy.position.x + 161.8 >= player.position.x &&
               enemy.isAttacking && (player.isDefending == false || player.shield <= 0 ) && player.position.y + player.height > canvas.height - 100){
               
                
                spearHit.play();

                player.health -= 0.26

                document.querySelector('#player-health').style.width = player.health + '%'


           } else if(player.isDefending && player.shield > 0 && enemy.isAttacking){

                
                shieldWorking.play();

                player.shield -= 0.26

           } 
        

    }

    if(player.health <= 0 || enemy.health <= 0)

        getWinner(player, enemy, timerId)

    
    if (enemy.position.y + enemy.height != canvas.height - 100 && enemy.velocity.y === 0 && upon == false)

        enemy.position.y = canvas.height - 96 - enemy.height


    if (player.position.y + player.height != canvas.height - 100 && player.velocity.y === 0 && upon == false)

        player.position.y = canvas.height - 96 - player.height
    
    }

defAnimation()

var allowed = true

window.addEventListener('keydown',(event) => {
  
    if (event.repeat != undefined) {
        allowed = !event.repeat;
      }
      if (!allowed) return;
      allowed = false;

    if(!player.isParalyzed && !player.isDead){

    switch(event.key){

        case 'd':

            if (! player.isDead){

                keys.d.pressed = true
                
                lastPlayerKey = 'd'
            
        }
            break

        case 'a':

            if (! player.isDead){

                keys.a.pressed = true
                
                lastPlayerKey = 'a'
            
        }
            break

        case 'w':

            if (! player.isDead){

                keys.w.pressed = true
            }

            break

        case 'e':

            if (! player.isDead){

                setTimeout(() => {
                    
                    keys.e.pressed = !keys.e.pressed
                    
                }, 150)
            }
        
                break

        case 'v':

                if(Math.abs((player.position.x + player.width) - enemy.position.x) >= 450  && lastPlayerKey != 'v' && !upon){
            
                    
                    kelevDash.play();
                    
                    keys.e.pressed = false

                    keys.v.pressed = true
                
                    lastPlayerKey = 'v'
            
            }
            
                break

        case 'c':

                if(Math.abs((player.position.x + player.width) - enemy.position.x) >= 450  && lastPlayerKey != 'c' && !upon){
                    
                    kelevDash.play();

                    keys.c.pressed = true
                
                    lastPlayerKey = 'c'
            
            }
            
                break
        
        case 'q':

                setTimeout(() => {

                    keys.q.pressed = true

                    lastPlayerKey = 'q'

                }, 150)
    }}
    
}) 

window.addEventListener('keyup',(event) => {

    allowed = true

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
        
    }
    
}) 

var shooting = true

window.addEventListener('keydown',(event) => {
   
    
    if (event.repeat != undefined) {
        allowed = !event.repeat;
      }
      if (!allowed) return;
      allowed = false;


      if(!enemy.isDead && !enemy.isParalyzed){
    switch(event.key){

        case 'ArrowRight':

            if(! enemy.isDead){
            
                keys.ArrowRight.pressed = true
                
                lastEnemyKey = 'ArrowRight'
            
            }

            break

        case 'ArrowLeft':

        if(! enemy.isDead){
            
            keys.ArrowLeft.pressed = true
            
            lastEnemyKey = 'ArrowLeft'
        }

            break

            
        case 'ArrowUp':

            if(! enemy.isDead){

                keys.ArrowUp.pressed = true

            }

            break

            case 'ArrowDown':

            if(! enemy.isDead){

                keys.ArrowDown.pressed = true

            }

            break

        case 'n':

            if(! enemy.isDead){
            
                setTimeout(() => {
            
                keys.n.pressed = !keys.n.pressed


            }, 300)
        
        }
    
            break

        case 'm':

        enemy.paralyzationDuration = 1000
        enemy.paralyze()
            if(shooting && keys.m.pressed == false){
           
                setTimeout(() => {

                keys.m.pressed = true

                lastEnemyKey = 'm'

                

            })
        
            shooting = false
        }
    }
}

}) 

window.addEventListener('keyup',(event) => {

    allowed = true;

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

        case 'ArrowDown':

            keys.ArrowDown.pressed = false
            
            break

        case 'q':

            keys.q.pressed = false

            player.isDefending = false

            break

        case 'm':
            
                
                setTimeout(() => {
                    keys.m.pressed = false
        
                hitSound.play();

                //if(enemy.img == enemy.sprites.img){
                    
                    shooting = true
                //}
                }, 200)
                
     }

   
}) 

window.addEventListener('focus', function(e){
    allowed = true;
})

document.addEventListener('keydown', function(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
});