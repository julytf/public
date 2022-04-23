const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// class Cell {
// 	construct() {
// 		this.value = 0;
// 		this.isUncover = false;
// 		this.isBomb = false;
// 		this.isFlag = false;
// 	}
// }

const game = {
	board: [0, Array(11), Array(11), Array(11), Array(11), Array(11), Array(11), Array(11), Array(11), Array(11), Array(11)],

	boardElement: $('#board'),
	playBtn: $('#playBtn'),

	start: ()=>{
		game.initial();
		game.initialDraw();
	},


	initial: ()=>{

		game.playBtn.onclick = game.start;

		game.boardElement.onclick = game.cellUncover;

		game.boardElement.innerHTML = "";
		for (var x = 1; x <= 10; x++) 
			for (var y = 1; y <= 10; y++) {
				let cell = document.createElement('div');
				cell.classList = 'board__cell board__cell--uncover';
				// cell.classList = 'board__cell';
				cell.dataset.x = x;
				cell.dataset.y = y;
				game.boardElement.append(cell);
// console.log(i,j);
				game.board[x][y] = cell;
				game.board[x][y].value = 0;
				game.board[x][y].isUncover = false;
				game.board[x][y].isBomb = false;
				game.board[x][y].isFlag = false;
			}
		for (var i = 0; i <= 10; i++) 
			game.addBomb();
		for (var x = 1; x <= 10; x++) 
			for (var y = 1; y <= 10; y++) 
				if (game.board[x][y].isBomb)
					for (var i = -1; i <= 1; i++) 
						for (var j = -1; j <= 1; j++)
							if ((x + i >= 1 && x + i <= 10) && 
								(y + j >= 1 && y + j <= 10) &&
								!(i == 0 && j == 0) &&
								!game.board[x + i][y + j].isBomb)
									game.board[x + i][y + j].value++;
	},

	initialDraw: ()=>{
		for (var i = 1; i <= 10; i++) 
			for (var j = 1; j <= 10; j++) {
				if (game.board[i][j].isBomb) 
					game.board[i][j].classList.add('board__cell--bomb');
				if (game.board[i][j].value) 
					game.board[i][j].classList.add('board__cell--no-'+game.board[i][j].value);
			}

	},

	flagCell: (cell)=>{
		cell.isFlag = true;
	},

	addBomb: ()=>{
		let x, y;
		do {
			x = Math.floor(Math.random()*10)+1;
			y = Math.floor(Math.random()*10)+1;
		} while (game.board[x][y].isBomb);
		game.board[x][y].isBomb = true;
		// game.board[x][y].classList.add('board__cell--bomb');
	},

	cellUncover: (e)=>{
// console.log('cellUncover');
		let cell = e.srcElement;
		// console.log(e.target);
		cell.classList.remove('board__cell--uncover');
		if (cell.isBomb) {
			game.gameOver();
// console.log('isBomb');
			return;
		}
		if (cell.value == 0) {
			game.spreadUncover(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
// console.log('value == 0');
			return;
		}
	},

	spreadUncover: (x, y)=>{
// console.log('spreadUncover');
		game.board[x][y].classList.remove('board__cell--uncover');
		if (game.board[x][y].value != 0)
			return; 
		for (var i = -1; i <= 1; i++) 
			for (var j = -1; j <= 1; j++) {
				if ((x + i >= 1 && x + i <= 10) && 			// x: 1-> 10
					(y + j >= 1 && y + j <= 10) && 			// y: 1-> 10
					!(i == 0 && j == 0) &&		   			// khong xet ban than
					!game.board[x + i][y + j].isBomb &&		// khong la bomb
					game.board[x + i][y + j].classList.contains('board__cell--uncover')) // chua mo
					game.spreadUncover(x + i, y + j);
// console.log((x + i >= 1 && x + i <= 10), 			// x: 1-> 10
// 			x + i,
// 			(y + j >= 1 && y + j <= 10), 			// y: 1-> 10
// 			y + j,
// 			!(i == 0 && j == 0),	);	   			// khong xet ban than
// 			// !game.board[x + i][y + j].isBomb,		// khong la bomb
// 			// game.board[x + i][y + j].classList.contains('board__cell--uncover'));
			}
	},

	gameOver: ()=>{
		game.boardElement.onclick = "";
		for (var x = 1; x <= 10; x++) 
			for (var y = 1; y <= 10; y++) 
				if (game.board[x][y].isBomb)
					game.board[x][y].classList.remove('board__cell--uncover');
	}
}

game.start();