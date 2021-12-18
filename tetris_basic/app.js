document.addEventListener('DOMContentLoaded', () => {


//define game elements
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-btn');
const cover = document.querySelector('#cover');
const setting = document.querySelector('#setting');
const settingBtn = document.querySelector('#setting-btn');
const applySettingBtn = document.querySelector('#applySetting');

//define game values
const width = 10;
const height = 20;
let score;

let gameState = 0;

let timerId = null;
let currentTetromino = null;
let currentPosition;
let currentRotation;

let upNextTetromino;
let current;

//setting
let speed = 1;
let rotation = 0;

//speeds
const speeds = [0.88,0.81,0.75,0.68,0.61,0.55,0.46,0.36,0.28,0.18]

//define Tetrominos
const lTetromino = [
	[1, width+1, width*2+1, 2],
	[width, width+1, width+2, width*2+2],
	[1, width+1, width*2+1, width*2],
	[width, width*2, width*2+1, width*2+2]
]

const zTetromino = [
	[0,width,width+1,width*2+1],
	[width+1, width+2,width*2,width*2+1],
	[0,width,width+1,width*2+1],
	[width+1, width+2,width*2,width*2+1]
]

const tTetromino = [
	[1,width,width+1,width+2],
	[1,width+1,width+2,width*2+1],
	[width,width+1,width+2,width*2+1],
	[1,width,width+1,width*2+1]
]

const oTetromino = [
	[0,1,width,width+1],
	[0,1,width,width+1],
	[0,1,width,width+1],
	[0,1,width,width+1]
	]

const iTetromino = [
	[1,width+1,width*2+1,width*3+1],
	[width,width+1,width+2,width+3],
	[1,width+1,width*2+1,width*3+1],
	[width,width+1,width+2,width+3]
]

const theTetrominos = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino];



//define mini-grid elements and values
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

const upNextTetrominos = [
	[1,displayWidth+1,displayWidth*2+1, 2],									//	l
	[0,displayWidth,displayWidth+1,displayWidth*2+1],						//	z
	[displayWidth+1,displayWidth*2,displayWidth*2+1,displayWidth*2+2],		//	t
	[displayWidth+1,displayWidth+2,displayWidth*2+1,displayWidth*2+2],		//	o
	[1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]					//	i
]

//gameStart
function gameStart() {
	cover.style.display = "none";

	upNextTetromino = Math.floor(Math.random()*theTetrominos.length);
	createNewTetromino();
	draw();
	displayNextTetromino();

	score = 0;
	scoreDisplay.innerHTML = score;
	gameState = 1;

	timerId = setInterval(moveDown, speeds[speed]*1000);
}

//gameOver
function gameOver () {
	if(current.some( index => currentPosition + index < 10 ) ){
		cover.innerHTML = "GAMEOVER";
		cover.style.display = "block";
		clearInterval(timerId);
		gameState = 2;
		return true;
	}
	return false;
}

//gameRestart
function gameRestart () {
	clear();
	gameStart()
}


//create new Tetromino
function createNewTetromino () {
	currentPosition = 3;
	currentRotation = 0;

	currentTetromino = upNextTetromino;
	upNextTetromino = Math.floor(Math.random()*theTetrominos.length);
	current = theTetrominos[currentTetromino][currentRotation];
}


//assign function to keycodes
document.addEventListener('keydown', control);

function control(e) {
	if(gameState == 1) {
		if(e.keyCode === 37 || e.keyCode === 65) {
			moveLeft();
		}
		if(e.keyCode === 39 || e.keyCode === 68) {
			moveRight();
		}
		if(e.keyCode === 38 || e.keyCode === 87) {
			rotate();
		}
		if(e.keyCode === 40 || e.keyCode === 83) {
			moveDown();
		}
		}
	if(e.keyCode === 13) {
		startBtnClicked();
	}
}



//define game control
//draw
function draw() {
	current.forEach(index => {
		squares[currentPosition + index].classList.add('tetromino');
	})
}

//undraw
function undraw() {
	current.forEach(index => {
		squares[currentPosition + index].classList.remove('tetromino');
	})
}

//moveDown fn
function moveDown () {
	if(!freeze()) {
		undraw();
		currentPosition += width;
		draw();
	}
}

//freeze
function freeze () {
	if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
		current.forEach(index => squares[currentPosition + index].classList.add('taken'));

		if(!gameOver()) {
			createNewTetromino();

			displayNextTetromino();
			draw();
		}

		calScore();

		return true;
	}
	return false;
}

//moveLeft
function moveLeft () {
	let isAtLeftEdge = current.some( index => (currentPosition + index) % width === 0);
	let hasTakenOnLeft = current.some( index => squares[currentPosition + index - 1].classList.contains('taken'));
	if(!isAtLeftEdge && !hasTakenOnLeft) {
		undraw();
		currentPosition--;
		draw();
	}
}

//moveRight
function moveRight () {
	let isAtLeftEdge = current.some( index => (currentPosition + index) % width === width - 1);
	let hasTakenOnRight = current.some( index => squares[currentPosition + index + 1].classList.contains('taken'));
	if(!isAtLeftEdge && !hasTakenOnRight) {
		undraw();
		currentPosition++;
		draw();
	}
}

//rotate
function rotate () {
	if(rotation == 0) {
		nextRotation = currentRotation - 1;
		if(nextRotation == -1)
			nextRotation = 3;
	}else if(rotation == 1) {
		nextRotation = currentRotation + 1;
		if(nextRotation == 4)
			nextRotation = 0;
	}
	let next = theTetrominos[currentTetromino][nextRotation];
	let crossEdge = next.some(index => (currentPosition + index) % width === 0) && next.some(index => (currentPosition + index) % width === width - 1);
	let crash = next.some(index => squares[currentPosition + index].classList.contains('taken'));
	if(!crash && !crossEdge) {
		undraw();
		currentRotation = nextRotation;
		current = theTetrominos[currentTetromino][currentRotation];
		draw();
	}
}

//displayNextTetromino
function displayNextTetromino () {
	upNextTetrominos[currentTetromino].forEach(index => displaySquares[index].classList.remove('tetromino'));
	upNextTetrominos[upNextTetromino].forEach(index => displaySquares[index].classList.add('tetromino'));
}

//add functionality to start btn
startBtn.addEventListener('click', startBtnClicked) 

function startBtnClicked () {
	if(gameState == 1) {
		clearInterval(timerId);
		timerId = null;
		gameState = 0;
		cover.innerHTML = "PAUSE";
		cover.style.display = "block";
	} else if(gameState == 0){
		if(currentTetromino == null) {
			gameStart();
		} else {
			timerId = setInterval(moveDown, speeds[speed]*1000);
			gameState = 1;
			cover.style.display = "none";
		}
	}else if(gameState == 2) {
		gameRestart();
	} 
}

//calScore
function calScore() {
	let numberOfRows = 0;
	let row = [0,1,2,3,4,5,6,7,8,9];
	for (var i = 0; i < height; i++) {
		if(row.every( index => squares[i*width + index].classList.contains('taken'))) {
			numberOfRows++;
			row.forEach(index => {
				squares[i*width + index].classList.remove('taken');
				squares[i*width + index].classList.remove('tetromino');
			})
			squaresRemoved =  squares.splice(i*width,width);
			squares = squaresRemoved.concat(squares);
			squares.forEach(cell => grid.appendChild(cell));
		}
	}
	switch (numberOfRows) {
		case 1:
			score += 100;
			break;
		case 2:
			score += 300;
			break;
		case 3:
			score += 700;
			break;
		case 4:
			score += 1500;
		default:
			score += 10;
	} 
	scoreDisplay.innerHTML = "Score:" + score;
}

//clear
function clear () {
	squares.forEach( square => {
		if(!square.classList.contains('bottom')) {
			square.classList.remove('taken');
			square.classList.remove('tetromino');
		}
	})
	displaySquares.forEach( square => {
		square.classList.remove('tetromino');
	})

}

//changeSetting

applySettingBtn.addEventListener('click',changeSetting);

function changeSetting () {
	speed = document.querySelector('input[name="speed"]:checked').value;
	console.log(speed,speeds[speed]*1000);
	rotation = document.querySelector('input[name="rotation"]:checked').value;
	setting.style.display = "none";
	clearInterval(timerId);
	timerId = setInterval(moveDown, speeds[speed]*1000);
}

settingBtn.addEventListener('click',openSetting);

function openSetting () {
	setting.style.display = "block";
}











})