import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js';
import { outsideGrid} from './grid.js'

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board')
let gameOver = false;
let gameOverSound = new Howl({
    src:['sounds/game-over.wav']
})
let gameBackgroundMusic = new Howl({
    src:['sounds/background.mp3'],
    loop: true
})

gameBackgroundMusic.play();

function main(currentTime){

    if (gameOver) {
        gameOverSound.play();
        gameBackgroundMusic.stop();
        if (confirm('You lost. Press ok to restart.')) {
          window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return 
    
    // console.log('render')
    lastRenderTime = currentTime;

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake();
    updateFood();
    checkDeath();
    
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
    drawFood(gameBoard);
    
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}


//document.getElementById('updateSpeed').addEventListener('click',increaseSpeed)

function increaseSpeed(){
    // let x = document.getElementById('snakeSpeed').value
    //SNAKE_SPEED = x;
    alert('we are still working on it')
}
