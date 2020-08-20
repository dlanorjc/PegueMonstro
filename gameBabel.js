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

bgImage.src = 'imagens/background.png';
// Imagem do heroi

let heroReady = false;
const heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
}

heroImage.src = 'imagens/hero.png';
// Imagem do monstro

let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
}

monsterImage.src = 'imagens/monster.png';

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

monster.eixoX = 32 + (math.random() * (canvas.width - 64));
monster.eixoY = 32 + (math.random() * (canvas.height - 64));
}

// Atualiza os objetos do jogo

const update = function (modifier){
    if(38 || 87 in keysDown){
        hero.eixoY -= hero.speed * modifier
    }
    if(40 || 83 in keysDown){
        hero.eixoY += hero.speed * modifier
    }
    if(37 || 65 in keysDown){
        hero.eixoX -= hero.speed * modifier
    }
    if(39 || 68 in keysDown){
        hero.eixoX += hero.speed * modifier
    }

// Os personagens se encontraram ?

    if(hero.eixoX <= (monster.eixoX + 32) 
    && monster.eixoX <= (hero.eixoX + 32 ) 
    && hero.eixoy <= (monster.eixoy + 32 )
    && monster.eixoy <= (hero.eixoy + 32 )){
        ++monsterCaught;
        reset();
    }

}