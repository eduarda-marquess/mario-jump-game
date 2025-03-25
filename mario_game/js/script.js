const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('.restart-btn');
const scoreDisplay = document.querySelector('.score');
const gameTitle = document.querySelector('.game-title');


const introSound = document.getElementById('intro-sound');
const jumpSound = document.getElementById('jump-sound');


const startGame = () => {
    gameTitle.style.display = 'none';
    introSound.play();
};

document.addEventListener('keydown', startGame);


let score = 0;
let gameOver = false;

const updateScore = () => {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
};

const jump = () => {
    if(!mario.classList.contains('jump')){
        mario.classList.add('jump');
        jumpSound.play();
        setTimeout(() => {
        mario.classList.remove('jump');
        }, 500);
    }
};

const scoreInterval = setInterval(updateScore, 1000);

const loop = setInterval(() => {
    console.log('loop');

    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px','');

    console.log(marioPosition);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameOver= true;
        clearInterval(scoreInterval);
        clearInterval(loop);

        restartButton.style.display = 'block';
    }

}, 10);

document.addEventListener('keydown', jump);

restartButton.addEventListener('click', () =>{
    location.reload();
});