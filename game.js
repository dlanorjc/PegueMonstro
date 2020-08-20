'use strict';

//1- Criar canvas

var canvas = document.createElement('canvas');
var contexto = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem de fundo
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};

bgImage.src = 'imagens/background.png';
// Imagem do heroi

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};

heroImage.src = 'imagens/hero.png';
// Imagem do monstro

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};

monsterImage.src = 'imagens/monster.png';

// Objetos do jogo

var hero = {
    speed: 256 // Movimento em pixels por segundo
};

var monster = {};
var monsterCaught = 0;

// Controle do teclado

var keysDown = {};

window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
    console.log(e);
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);

// Resetar o jogo quando o jogador pegar o monstro

var reset = function reset() {
    hero.eixoX = canvas.width / 2;
    hero.eixoY = canvas.height / 2;

    // Posicionamento randomica do monstro

    monster.eixoX = 32 + math.random() * (canvas.width - 64);
    monster.eixoY = 32 + math.random() * (canvas.height - 64);
};

// Atualiza os objetos do jogo

var update = function update(modifier) {
    if (38 || 87 in keysDown) {
        hero.eixoY -= hero.speed * modifier;
    }
    if (40 || 83 in keysDown) {
        hero.eixoY += hero.speed * modifier;
    }
    if (37 || 65 in keysDown) {
        hero.eixoX -= hero.speed * modifier;
    }
    if (39 || 68 in keysDown) {
        hero.eixoX += hero.speed * modifier;
    }

    // Os personagens se encontraram ?

    if (hero.eixoX <= monster.eixoX + 32 && monster.eixoX <= hero.eixoX + 32 && hero.eixoy <= monster.eixoy + 32 && monster.eixoy <= hero.eixoy + 32) {
        ++monsterCaught;
        reset();
    }
};
