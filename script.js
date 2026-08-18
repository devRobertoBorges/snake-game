const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let direcao = "direita";
let jogoIniciado = false;


const snake = [
    { x: 100, y: 100 }, // cabeça
    { x: 80, y: 100 },
    { x: 60, y: 100 }
];

let comida = {
    x: 200,
    y: 100
};

function gerarComida() {
    comida.x = Math.floor(Math.random() * 20) * 20;
    comida.y = Math.floor(Math.random() * 20) * 20;
   
}

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp") {
        direcao = "cima";
    }

    if (event.key === "ArrowDown") {
        direcao = "baixo";
    }

    if (event.key === "ArrowLeft") {
        direcao = "esquerda";
    }

    if (event.key === "ArrowRight") {
        direcao = "direita";
    }

});

function desenhar() {

    // Limpa o Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    ctx.fillStyle = "green";

    snake.forEach((parte) => {
        ctx.fillRect(parte.x, parte.y, 20, 20);
    });

    // Desenha a comida
    ctx.fillStyle = "red";

    ctx.fillRect(comida.x, comida.y, 20, 20);
}

function bateuNaParede(){

    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        return true;
    }

    return false;    
}



function moverCobra() {

    // Faz o corpo seguir a parte da frente
    for (let i = snake.length - 1; i > 0; i--) {

        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;

    }

    // Move a cabeça
    if (direcao === "direita") {
        snake[0].x += 20;
    }

    if (direcao === "esquerda") {
        snake[0].x -= 20;
    }

    if (direcao === "baixo") {
        snake[0].y += 20;
    }

    if (direcao === "cima") {
        snake[0].y -= 20;
    }

    if (bateuNaParede()) {
        alert
        ("GAME OVER");
        return;
    };

    if (
        snake[0].x === comida.x &&
        snake[0].y === comida.y
    ) {
        snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y
        });

        gerarComida();
    };

    desenhar();
};

desenhar();

const btnIniciar = document.querySelector("#btnIniciar");

    btnIniciar.addEventListener("click", () => {
        iniciarJogo();
});

function iniciarJogo() {
    jogoIniciado = true;

    setInterval(moverCobra, 100);
};

