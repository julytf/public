document.addEventListener('DOMContentLoaded', () => {

//define game elements
const container = document.querySelector('#container');
const squares = document.querySelectorAll('#container div');

//define game format
const width = 10;
const height = 10;

//define game value
let gameState = 1;
let snake_direction = 2;	// up 1 right 2 down 3 left 4


//define snake
let snake = [
	[width+2],
	[width+1],
	[width]
]


let timerId = setInterval(move, 1000);

function move() {
	let nextMove;
	switch(snake_direction) {
		case 1:
			nextMove = snake[0]-width;
			break;
		case 2:
			nextMove = snake[0]+1;
			break;
		case 3:
			nextMove = snake[0]+width;
			break;
		case 4:
			nextMove = snake[0]-1;
			break;
	}
	if(!snake.some( index => index == nextMove)) {
		unDraw();
		snake.unshift(nextMove);
		draw();
	} else {
		// gameOver;
	}
}

function draw () {
	console.log('draw',snake[0]);
	squares[snake[0]].classList.add('head');
	snake.every( index => squares[index].classList.add('snake'));	
}

function unDraw () {
	console.log('undraw',snake[0]);
	squares[snake[0]].classList.remove('head');
	snake.every( index => squares[index].classList.remove('snake'));	
}











})