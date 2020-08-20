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

bgImage.src = 'imagem/background.png';
// Imagem do heroi

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};

heroImage.src = 'imagem/hero.png';
// Imagem do monstro

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};

monsterImage.src = 'imagem/monster.png';

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

    monster.eixoX = 32 + Math.random() * (canvas.width - 64);
    monster.eixoY = 32 + Math.random() * (canvas.height - 64);
};

// Atualiza os objetos do jogo

var update = function update(modifier) {
    if (38 in keysDown) {
        hero.eixoY -= hero.speed * modifier;
    }
    if (40 in keysDown) {
        hero.eixoY += hero.speed * modifier;
    }
    if (37 in keysDown) {
        hero.eixoX -= hero.speed * modifier;
    }
    if (39 in keysDown) {
        hero.eixoX += hero.speed * modifier;
    }

    // Os personagens se encontraram ?

    if (hero.eixoX <= monster.eixoX + 32 && monster.eixoX <= hero.eixoX + 32 && hero.eixoY <= monster.eixoY + 32 && monster.eixoY <= hero.eixoY + 32) {
        ++monsterCaught;
        reset();
    }
};

// Renderiza tudo

var render = function render() {
    if (bgReady) {
        contexto.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        contexto.drawImage(heroImage, hero.eixoX, hero.eixoY);
    }

    if (monsterReady) {
        contexto.drawImage(monsterImage, monster.eixoX, monster.eixoY);
    }

    // Pontuação do jogo
    contexto.fillStyle = 'rgb(250, 250, 250)';
    contexto.font = '24px helvetica';
    contexto.textAlign = 'left';
    contexto.textBaseline = 'top';
    contexto.fillText('Monstros pegos: ' + monsterCaught, 32, 32);
};
// Controla o loop do jogo
var main = function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();
    then = now;

    // Executa o mais breve possível
    requestAnimationFrame(main);
};

// suporte cross-browser para requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
