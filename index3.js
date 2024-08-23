const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024

canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.98

let lastPlayerKey, lastEnemyKey, upon = false

let hitSound = new Audio("./audio/hitSound.wav")

let swordHit = new Audio("./audio/swordHit.wav")

let spearHit = new Audio("./audio/spearHit.wav")

let getOverHere = new Audio("./audio/Scorpion.m4a")

let mikeyJump = new Audio("./audio/MikeySceam.wav")

let AnakHit = new Audio("./audio/hit.m4a")

let AnakWins = new Audio("./audio/Winning_Brag1.m4a")

let AnakWins2 = new Audio("./audio/Winning_Brag2.m4a")

let Tauting = new Audio("./audio/Tauting.m4a")

let getHere = new Audio("./audio/Get_Right_Here.m4a")

let anakLost = new Audio("./audio/Losing.m4a")

let inicio = new Audio("./audio/inicio.wav")

let meio = new Audio("./audio/meio.mp3")

let fim = new Audio("./audio/fim.mp3")

let run = new Audio("./audio/run.mp4")

let cochavim = new Audio("./audio/Cochavim.m4a")

let beGone = new Audio("./audio/beGone1.m4a")

let beGone2 = new Audio("./audio/beGone2.m4a")

let mikeyLost = new Audio("./audio/MikeyLost.wav")

const anakAudio = [beGone, beGone2, cochavim, anakLost, getHere, getOverHere, Tauting, AnakWins, AnakWins2, anakLost, AnakHit]

const mikeyAudio = [mikeyJump, mikeyLost]

const music = [inicio, meio, fim]

const effects = [run, swordHit, spearHit]

anakAudio.forEach(element => {
    
    if(element == anakLost){

        element.volumme = 0.8
    }
    else{
    element.volume = 0.2
    }
});

mikeyAudio.forEach(element => {
    
    element.volume = 0.6
});

music.forEach((audio) => {

    audio.volume = 0.4
})

effects.forEach((audio) => {

    audio.volume = 0.5
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

    imgSrc: './images/Mikey-Reverse.png',

    scale: 1.8,

    framesMax: 8,

    offset: {x: 120, y: 58},

    sprites: {

        idle: {
            
            imgSrc: './images/Mikey-Reverse.png',
            framesMax: 8,
            scale: 2.6
        },

        idleReverse: {
            
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

        jump: {

            imgSrc: './images/Mikey_Jump.png',
            framesMax: 12,
            scale: 1.3

        },

        right_attack: {

            imgSrc: './images/Mikey-Attack-Reverse.png',
            framesMax: 5,
            scale: 1.3
        },

        left_attack: {

            imgSrc: './images/Mikey-Attack.png',
            framesMax: 5,
            scale: 1.3
        },

        dead: {

            imgSrc: './images/Mikey_defeat.png',
            framesMax: 1,
            scale: 1.3

        },

        paralyze: {

            imgSrc: './images/Mikey_Dizzy.png',
            framesMax: 1,
            scale: 1.3

        },
    }

}, 120, 100)

const enemy = new Fighter({

    position: { x: 600, y: 0},

    velocity: {x: 0, y: 10},

    imgSrc: './images/Anak.png',

    scale: 1.8,

    framesMax: 6,

    offset: {x: 100, y: 50},

    sprites: {

        idle: {
            
            imgSrc: './images/Anak.png',
            framesMax: 6,
            scale: 2.6
        },
        idleReverse: {

            imgSrc: './images/Anak_Reverse.png',
            framesMax: 8,
            scale: 2.6
        },

        toTheRight: {
            
            imgSrc: './images/Anak_walking_Reverse.png',
            framesMax: 3,
            scale: 4
        },

        toTheLeft: {
            
            imgSrc: './images/Anak_walking.png',
            framesMax: 3,
            scale: 4
        },

        thrust: {

            imgSrc: './images/Anak_Attack.png',
            framesMax: 9,
            scale: 2.1
        },

        reverseThrust: {

            imgSrc: './images/Anak_Attack_Reverse.png',
            framesMax: 9,
            scale: 2.1
        },

        jump: {

            imgSrc: './images/Anak_High_Attack.png',
            framesMax: 6,
            scale: 2

        },

        jump_reverse: {

            imgSrc: './images/Anak_High_Attack_Reverse.png',
            framesMax: 6,
            scale: 2

        },

        dead: {

            imgSrc: './images/anak_lost.png',
            framesMax: 1,
            scale: 2

        },

        scorpion: {

            imgSrc: './images/Get_Over_Here.png',
            framesMax: 11,
            scale: 2

        },
    
    reverseScorpion: {
        imgSrc: './images/Get_Over_Here_Reverse.png',
            framesMax: 11,
            scale: 2
    },

    miss: {

        imgSrc: './images/Anak_Misses.png'
    },
   
    missReverse: {

        imgSrc: './images/Anak_Misses_Reverse.png'
    },

    uppercut: {

        imgSrc: './images/Anak_Upper.png'
    },

    uppercutReverse: {

        imgSrc: './images/Anak_Upper_Reverse.png'
    },

}
    }, 300, 100, 1)

    enemy.height = 200

    enemy.moves = [false,false]


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

        document.querySelector('#outcome').innerHTML = 'Michael The Duck Wins'
        
        enemy.img = enemy.sprites.dead.img

        enemy.framesMax = 1

        enemy.scale = 0.28

        keys.ArrowUp = false
        keys.n.pressed = false
        keys.m.pressed = false
        enemy.die(anakLost,null)



        enemy.isAttacking = false

        enemy.offset.y = 20
        enemy.offset.x = 50
        enemy.width = 130
    }

    else{

        document.querySelector('#outcome').innerHTML = 'Anak Wins'
    
        player.img = player.sprites.dead.img

        player.framesMax = 1

        player.offset.x = 160

        player.offset.y = 60

        player.scale = 2

        let audio;

        timer >= 60 ? audio = AnakWins2 : AnakWins
        
        keys.e.pressed = false
        player.die(mikeyLost, audio)

        player.height = 60

        player.isAttacking = false

    }

    meio.pause()
    fim.pause()
}

let timerId
upon = false
let enemyPulo = false, playerPulo = false

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

function audioTest(audio,list){

    if(!list.some((element) => !element.paused)){
                        
        audio.play()
    }
}

function defAnimation(){

    window.requestAnimationFrame(defAnimation)

    c.fillStyle = 'black'

    c.fillRect(0, 0, canvas.width, canvas.height)

    if(enemy.health == 100 && player.health == 100 && meio.paused){

        Tauting.play();
        inicio.play();
        meio.play();

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

    enemyPulo = false

    player.velocity.x = 0

    player.img = player.sprites.idle.img

    enemy.framesMax = 6

    enemy.scale = 2.2

    enemy.offset = {x: 412, y: 97}

    enemy.img = enemy.sprites.idle.img

    player.framesMax = 8

    player.scale = 2.5

    player.offset = {x: 224, y: 84}

    console.log(playerPulo)

    if(keys.m.pressed === true && lastEnemyKey === 'm'){
 
        if( Math.abs(player.position.x - enemy.position.x) >= 100){
        enemy.graple()

        keys.m.pressed = false}
        else{
            keys.m.pressed = false
        }
        
    }

    if(enemy.isGrapling){

        if(enemy.attackBox.width < 0){
        enemy.img = enemy.sprites.scorpion.img

        enemy.framesMax = 11

        enemy.scale = 1.9

        enemy.offset.x = 830

        enemy.offset.y = 300
        }
        else{
        
            enemy.img = enemy.sprites.reverseScorpion.img

        enemy.framesMax = 11

        enemy.scale = 1.9

        enemy.offset.x = 830

        enemy.offset.y = 300

        }

                if(enemy.framesCurrent > 3 && !keys.a.pressed && !keys.d.pressed)
                setTimeout(() => {

                    if(Math.abs(player.position.x - enemy.position.x) <= 500 && Math.abs(player.position.x - enemy.position.x) >= 100){
        
            
                        if(player.isAttacking || upon || playerPulo ||  lastPlayerKey === 'e'){
            
                            audioTest(AnakHit, anakAudio)
                            enemy.paralyzationDuration = 3000
                            enemy.paralyze()
                            enemy.health -= 0.2
                            audioTest(AnakHit, anakAudio)
                            document.querySelector('#enemy-health').style.width = enemy.health + '%'
                            audioTest(anakLost,anakAudio)
                        }
            
                        else{
                            player.health -= 0.2
                            document.querySelector('#player-health').style.width = player.health + '%'
                            if(player.position.x > enemy.position.x){
    
                                enemy.paralyzationDuration = 500
                                enemy.paralyze()
                                player.paralyze()
                                player.velocity.x = -10
                                if(Math.abs(player.position.x - enemy.position.x) >= 50){

                                    player.velocity.x += 3
                                }
                            }
                            else{
            
                                audioTest(getHere, anakAudio)
                                enemy.paralyzationDuration = 500
                                enemy.paralyze()
                                while(Math.abs(player.position.x - enemy.position.x) >= 80){
                                
                                    player.paralyze()
                                    player.position.x += 0.7
                                    player.position.x -= 0.6
                               }
                            }
                        }
                    }
                }, 100)
    }

    if (keys.a.pressed && lastPlayerKey === 'a' && player.position.x >= 10 &&
     (player.position.x >= enemy.position.x + enemy.width + 10 ||
      player.position.x < enemy.position.x || player.position.y + player.height < enemy.position.y
     )){

        run.play();

        keys.e.pressed = false

        player.velocity.x = -10

        player.img = player.sprites.toTheLeft.img

        player.framesMax = 3

        player.scale = 3

        player.offset = {x: 270, y: 112}

        
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

            player.framesMax = 3
        
            player.scale = 3

            player.offset = {x: 270, y: 112}

        
        }
    }

    if (keys.w.pressed && player.velocity.y == 0 || keys.w.pressed && upon ){

        audioTest(mikeyJump,mikeyAudio)

        keys.e.pressed = false

        keys.q.pressed = false
        
        setTimeout(function(){
            
            player.velocity.y = -15
            keys.w.pressed = false}, 150)

    }

    enemy.velocity.x = 0
    
   if (keys.ArrowLeft.pressed && lastEnemyKey === 'ArrowLeft' && enemy.position.x >= 5 &&
       (enemy.position.x >= player.position.x + player.width + 5 ||
       enemy.position.x < player.position.x || enemy.position.y + enemy.height < player.position.y)
    ){
    
        run.play()

        keys.n.pressed = false

        keys.ArrowUp.pressed = false

        enemy.velocity.x = -5

        enemy.img = enemy.sprites.toTheLeft.img

        enemy.framesMax = 6


    }
    
    else{ 
        
        if (keys.ArrowRight.pressed && lastEnemyKey === 'ArrowRight' && enemy.position.x <= 970 &&
           (enemy.position.x + enemy.width <= player.position.x - 5 || 
           enemy.position.x >= player.position.x + player.width || enemy.position.y + enemy.height < player.position.y)){    
        
        run.play()

        keys.n.pressed = false

        keys.ArrowUp.pressed = false

        enemy.velocity.x = 5
        
        enemy.img = enemy.sprites.toTheRight.img

        enemy.framesMax = 6

    }
}

    if (keys.ArrowUp.pressed && lastEnemyKey === 'ArrowUp'){

        let audio

        timer % 2 == 0 ? audio = beGone : audio = beGone2

        if((beGone2.paused && beGone.paused)){
        
            audioTest(audio, anakAudio)
        }
        keys.n.pressed = false

        if(enemy.attackBox.width < 0){

            enemy.img = enemy.sprites.jump.img
        }

        else{

            enemy.img = enemy.sprites.jump_reverse.img
        }
        enemy.framesMax = 6

        enemy.scale = 1.8
    
        enemy.offset = {x: 340, y: 40}

        if(upon){

            player.health -= 0.2
            spearHit.play()
            document.querySelector('#player-health').style.width = player.health + '%' 
        }

        enemyPulo = true

    }

    if(keys.w.pressed || lastPlayerKey === 'w' || player.position.y + player.height < canvas.height - 100){

        playerPulo = true

    }
    else{

        playerPulo = false
    }

    if(player.position.y + player.height < canvas.height - 100 && player.velocity.y != 0 && !upon){

        player.img = player.sprites.jump.img

        player.framesMax = 6 

        player.scale = 1.6
    
        player.offset = {x: 140, y: 40}
       
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

    if (keys.e.pressed && keys.a.pressed == false && keys.d.pressed == false && player.velocity.y == 0 && AttackRampage == false){

        player.attack()

        AttackRampage = true

        player.scale = 1.8

        if (player.attackBox.width < 0){

            player.img = player.sprites.left_attack.img
        
            player.offset = {x: 140, y: 34}
        }
        
        else{

            player.img = player.sprites.right_attack.img
         
            player.offset = {x:140, y: 34}
        }
        

        player.framesMax = 4

    }

    if(player.isParalyzed){

        if(player.position.x + player.height < canvas.height - 100){

            player.img = player.sprites.jump.img
        }
        else{
        player.img = player.sprites.paralyze.img

        player.offset = {x: 170, y: 50}
        player.framesMax = 22

        player.scale = 1.8

        }

    }


    attackMode = false

    if (keys.n.pressed && keys.ArrowLeft.pressed == false && keys.ArrowRight.pressed == false && enemy.velocity.y == 0 )
{       
        
        attackMode = true

        setTimeout(() => {

            enemy.attack()

        }, 120)
        
        if (enemy.attackBox.width < 0){

            if(keys.ArrowDown.pressed){

                keys.n.pressed = false
                enemy.paralyzationDuration = 1000
                enemy.paralyze()
                enemy.framesMax = 10
                enemy.moves[0] = true

            }
            enemy.img = enemy.sprites.thrust.img

        }
        
        else{

            if(keys.ArrowDown.pressed){

                keys.n.pressed = false
                enemy.paralyzationDuration = 1000
                enemy.paralyze()
                enemy.framesMax = 10
                enemy.moves[1] = true

            }
            enemy.img = enemy.sprites.reverseThrust.img
            
        }
        

        enemy.framesMax = enemy.sprites.thrust.framesMax
        
        enemy.scale = 1.78

        enemy.offset = {x:300, y: 40}
    }

    if(enemy.isParalyzed && !player.isParalyzed){

        if(!enemy.boot){
            
            enemy.initiateMove()
            enemy.boot = true
        }
        if(enemy.loops < 1){
        enemy.img = enemy.sprites.miss.img
        enemy.framesMax = 15
        enemy.offset.x = 300
        enemy.framesCurrent < 7? enemy.offset.y = -20 : enemy.offset.y = 12
        }
    }

    if(enemy.moves[0]){

        enemy.img = enemy.sprites.uppercut.img
        enemy.framesMax = 10
        enemy.scale = 1.9
        enemy.offset.y = 170
        enemy.offset.x = 300
        setTimeout(() => {
            if(Math.abs(player.position.x - enemy.position.x) < 320 && enemy.loops < 1 && enemy.framesCurrent > 4){

                spearHit.play()
                player.velocity.y = -23
                if((player.position.x >= 120)){
                    player.velocity.x = -120
                }
                player.paralyzationDuration = 500
                player.paralyze()
                player.health -= 3
                document.querySelector('#player-health').style.width = player.health + '%'    
            }
            enemy.moves[0] = false
        },1000)
    }
    if(enemy.moves[1]){

        enemy.img = enemy.sprites.uppercutReverse.img
        enemy.framesMax = 10
        enemy.scale = 1.9
        enemy.offset.y = 170
        enemy.offset.x = 300
        setTimeout(() => {
            if(Math.abs(player.position.x - enemy.position.x) < 320 && enemy.loops < 1 && enemy.framesCurrent > 4){

                spearHit.play()
                player.velocity.y = -23
                if((player.position.x <= 800)){
                    player.velocity.x = 120
                }
                player.paralyzationDuration = 500
                player.paralyze()
                player.health -= 3
                document.querySelector('#player-health').style.width = player.health + '%'    
            }
            enemy.moves[1] = false
        },1000)
    }

    if (player.position.x  >= enemy.position.x + enemy.width ){

            player.attackBox.width = -170
        
            if (player.position.x + player.attackBox.width <= enemy.position.x ){
        
        
                if(player.isAttacking){
                
                    enemy.health -= 0.4
                
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
                
                    enemy.health -= 0.3   
                
            }

                document.querySelector('#enemy-health').style.width = enemy.health + '%'

            }

        }
    
        if (enemy.position.x >= player.position.x + player.width){

            if(!enemyPulo)

                enemy.attackBox.width = -290
            
            else

                enemy.attackBox.width = -200
            
            if (enemy.position.x + enemy.attackBox.width <= player.position.x + player.width && 
                (enemy.isAttacking || enemyPulo) && (enemy.framesCurrent == 4 || enemy.framesCurrent == 5)){
     
                spearHit.play();

                if(enemy.isAttacking && !playerPulo){
                    
                    if(lastPlayerKey === 'c' || lastPlayerKey === 'v'){
                        
                        enemy.paralyzationDuration = 3500
                        enemy.paralyze()
                        keys.n.pressed = false
                        enemy.velocity.y = -23
                        enemy.velocity.x = 5
                        audioTest(anakLost,anakAudio)
                    }
                    else{
                        player.health -= 2.3}
                }

                if(enemyPulo && enemy.framesCurrent > 2){

                    
                    if(!player.isParalyzed && !upon && !(player.position.y + player.height < 400)){
                        
                        player.health -= 0.6
                        setTimeout(() => {

                            player.velocity.x -= player.position.x - 100
                        }, 150)    
                    }
                }

                document.querySelector('#player-health').style.width = player.health + '%'
     

            }
         
    }

    else{
        
           enemy.attackBox.width = 290
    
           if(!enemyPulo && !enemy.isAttacking && enemy.velocity.x == 0 && !keys.n.pressed && !enemy.isGrapling && !enemy.moves[1])
            
                enemy.img = enemy.sprites.idleReverse.img

            if(enemyPulo && enemy.framesCurrent > 3){

                if(!player.isParalyzed && !upon && !(player.position.y + player.height < 400) && Math.abs(enemy.position.x - player.position.x) <= 200){
                        
                    spearHit.play()
                    
                    player.health -= 0.6
                    setTimeout(() => {

                        player.velocity.x += 900- player.position.x
                    }, 150)
                    
                    document.querySelector('#player-health').style.width = player.health + '%'
                }
            }

            if(enemy.position.x + 350 >= player.position.x &&
               enemy.isAttacking && (enemy.framesCurrent >= 5) && !playerPulo){
               
                
                spearHit.play();

                player.health -= 2.3

                document.querySelector('#player-health').style.width = player.health + '%'


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
                    lastPlayerKey = 'e'
                    
                }, 150)
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


       /* case 'w':

            keys.w.pressed = false
            
            break
        */
    }
    
}) 

window.addEventListener('keydown',(event) => {
   
    let audio;
    if (event.repeat != undefined) {
        allowed = !event.repeat;
      }
      if (!allowed) return;
      allowed = false;

      
    if(!enemy.isParalyzed && !enemy.isDead){
    switch(event.key){

        case 'ArrowRight':

            if(! enemy.isGrapling){
            
                keys.ArrowRight.pressed = true
                
                lastEnemyKey = 'ArrowRight'
            
            }

            break

        case 'ArrowLeft':

        if(! enemy.isGrapling){
            
            keys.ArrowLeft.pressed = true
            
            lastEnemyKey = 'ArrowLeft'
        }

            break

            
        case 'ArrowUp':

            if(! enemy.isGrapling){

                setTimeout(() => {

                    enemy.framesCurrent = 0
                    keys.ArrowUp.pressed = !keys.ArrowUp.pressed
                    lastEnemyKey = 'ArrowUp'

                }, 100)
                
            }

            break

            case 'ArrowDown':

            if(! enemy.isDead){

                keys.ArrowDown.pressed = true
                lastEnemyKey = 'ArrowDown'

            }

            break


        case 'n':

            if(! enemy.isDead){
            
                setTimeout(() => {

                    enemy.framesCurrent = 0
                    keys.n.pressed = !keys.n.pressed
                    lastEnemyKey = 'n'


            }, 300)
        
        }
    
            break

        case 'm':

        setTimeout(() => {
            
            enemy.framesCurrent = 0
            timer % 2 == 0? audio = getHere : audio = get
            audio.play()
            keys.m.pressed = true
            lastEnemyKey = 'm'

        }, 300)
    
    }}
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


        case 'ArrowDown':

            keys.ArrowDown.pressed = false
            
            break

        case 'q':

            keys.q.pressed = false


            break

        case 'm':

            keys.m.pressed = false

            
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