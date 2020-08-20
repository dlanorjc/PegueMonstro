//1- Criar canvas

const canvas = document.createElement('canvas');
const contexto = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function (){
    bgReady = true;
}

bgImage.src = 'imagem/background.png'
// Imagem do heroi

let heroReady = false;
const heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
}

heroImage.src = 'imagem/hero.png';
// Imagem do monstro

let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
}

monsterImage.src = 'imagem/monster.png';

// Objetos do jogo

const hero = {
    speed: 256 // Movimento em pixels por segundo
};

const monster = {};
let monsterCaught = 0;

// Controle do teclado

const keysDown = {};

window.addEventListener('keydown', function(e){
    keysDown[e.keyCode] = true;
    console.log(e);

}, false);

window.addEventListener('keyup', function(e){
    delete keysDown[e.keyCode];
}, false);

// Resetar o jogo quando o jogador pegar o monstro

const reset = function(){
    hero.eixoX = canvas.width / 2;
    hero.eixoY = canvas.height / 2;

// Posicionamento randomica do monstro

monster.eixoX = 32 + (Math.random() * (canvas.width - 64));
monster.eixoY = 32 + (Math.random() * (canvas.height - 64));
}

// Atualiza os objetos do jogo

const update = function (modifier){
    if(38  in keysDown){
        hero.eixoY -= hero.speed * modifier
    }
    if(40  in keysDown){
        hero.eixoY += hero.speed * modifier
    }
    if(37  in keysDown){
        hero.eixoX -= hero.speed * modifier
    }
    if(39  in keysDown){
        hero.eixoX += hero.speed * modifier
    }

// Os personagens se encontraram ?

    if(
    hero.eixoX <= (monster.eixoX + 32) 
    && monster.eixoX <= (hero.eixoX + 32 ) 
    && hero.eixoY <= (monster.eixoY + 32 )
    && monster.eixoY <= (hero.eixoY + 32 )
    ){
        ++monsterCaught;
        reset();
    }

}

// Renderiza tudo

const render = function(){
    if(bgReady){
        contexto.drawImage(bgImage, 0, 0)
    }

    if(heroReady){
        contexto.drawImage(heroImage, hero.eixoX, hero.eixoY);
    }

    if(monsterReady){
        contexto.drawImage(monsterImage, monster.eixoX, monster.eixoY )
    }

// Pontuação do jogo
    contexto.fillStyle = 'rgb(250, 250, 250)';
    contexto.font = '24px helvetica';
    contexto.textAlign = 'left';
    contexto.textBaseline = 'top';
    contexto.fillText('Monstros pegos: ' + monsterCaught, 32, 32);

}
// Controla o loop do jogo
const main = function (){
const now = Date.now();
const delta = now - then;

update(delta / 1000);
render();
then = now;

// Executa o mais breve possível
requestAnimationFrame(main);

}

// suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame ||  w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame

let then = Date.now();
reset();
main();