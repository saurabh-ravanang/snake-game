// game variables
let inputdir = { x: 0, y: 0 };
const foodsound = new Audio("../music/food.mp3");
const gameoversound = new Audio("../music/gameover.mp3");
const movesound = new Audio("../music/move.mp3");
const musicsound = new Audio("../music/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakearr = [{ x: 10, y: 10 }];
let food = { x: 5, y: 6 };

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if snake touch itself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if snake touch wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
}
function gameEngine() {
    // updating sanke array & food
    if (isCollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        inputdir = {x: 0, y: 0};
        alert(' Game Over !!! Press any key to play again...');
        snakearr = [{x: 10, y: 10}];
        musicsound.play();
        score = 0;
    }

    // eat food and adding score
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>highscoreVar){
            highscoreVar = score;
            localStorage.setItem('highscore', JSON.stringify(highscoreVar));
            hiscorebox.innerHTML = "High Score: " + highscoreVar;
        }
        scorebox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // moving snake
    for (let i = snakearr.length - 2; i>=0; i--) {
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;



    // display sanke and food
    //display snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


//main logic
let highscore = localStorage.getItem('highscore');
if(highscore === null){
    highscoreVar = 0;
    localStorage.setItem('highscore', JSON.stringify(highscoreVar));
}
else{
    highscoreVar = JSON.parse(highscore);
    hiscorebox.innerHTML = "High Score: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }    //starting game
    movesound.play();
    switch (e.key) {
        case ("ArrowUp"):
            // console.log('arrowUp');
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case ("ArrowDown"):
            // console.log('arrowDown');
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case ("ArrowLeft"):
            // console.log('arrowLeft');
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case ("ArrowRight"):
            // console.log('arrowright');
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }
})