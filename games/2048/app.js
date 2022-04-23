const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ArrowUp
// Arrowright
// Arrowdown
// Arrowleft
// w
// d
// s
// a

class Game {

	// const up = -size;
	// const right = 1;
	// const left = -1;
	// const down = size;

	constructor() {
		this.size = 4;
		this.cells = [0, Array(5), Array(5), Array(5), Array(5)];
		this.box = $("#box");
		this.scroce_label = $("#scroce_label");
		this.scorce = 0;
	}


	start () {
		this.initial();
		this.play();
	}

	play () {
		this.createCell();
		this.createCell();
		this.render();
	}

	initial () {

		document.onkeydown  = (e) => {
			console.log(e.key);
			let direction;

			switch(e.key) {
				case "ArrowUp":
				case "w":
					direction = "up";
					break;
				case "Arrowright":
				case "d":
					direction = "right";
					break;
				case "Arrowdown":
				case "s":
					direction = "down";
					break;
				case "Arrowleft":
				case "a":
					direction = "left";
					break;
			}

			if (direction) {
				if(this.calculateBoard(direction)) {
// console.log(5);
					this.render();
					this.createCell();	
				}
			}
		}
	}

	calculateBoard (direction) {
console.log("calculateBoard", direction);
// console.log(1);

	let hasChange = false;
		switch(direction) {
			case "up":
				for (let x = 1; x <= this.size; x++)
					for (let y = 1; y <= this.size; y++)
// console.log(x,y);
    					if(this.cells[x][y])
							hasChange = this.calculateCell(x, y, direction) || hasChange;
				break;
// console.log(2);
			case "down":
				for (let x = 1; x <= this.size; x++)
					for (let y = this.size; y >= 1; y--)
						if(this.cells[x][y])
							hasChange = this.calculateCell(x, y, direction) || hasChange;
				break;
// console.log(3);
			case "left":
				for (let x = 1; x <= this.size; x++)
					for (let y = 1; y <= this.size; y++)
						if(this.cells[x][y])
							hasChange = this.calculateCell(x, y, direction) || hasChange;
				break;
// console.log(4);
			case "right":
				for (let x = this.size; x >= 1; x--)
					for (let y = 1; y <= this.size; y++)
						if(this.cells[x][y])
							hasChange = this.calculateCell(x, y, direction) || hasChange;
				break;
		}
		return hasChange;
	}

	calculateCell (cx, cy, direction) {
console.log("calculateCell", cx, cy, direction);
// console.log(6);
		let cell = this.cells[cx][cy];
		let occupiedCell;
		let blankX;
		let blankY;

		switch(direction) {
			case "up":
				// tim cell gan nhat
				for (let y = cy-1; y >= 1; y--) {
					if (this.cells[cx][y])  {
						// pY = y;
						occupiedCell = this.cells[cx][y];
						break;
					}
				}
				// tim null gan nhat
				for (let y = cy-1; y >= 1; y--) {
					if (!this.cells[cx][y])  {
						blankY = y;
					} else break;
				}

				break;
			case "down":
				// tim cell gan nhat
				for (let y = cy+1; y <= this.size; y++) {
					if (this.cells[cx][y])  {
						// pY = y;
						occupiedCell = this.cells[cx][y];
						break;
					}
				}
				// tim null gan nhat
				for (let y = cy+1; y <= this.size; y++) {
					if (!this.cells[cx][y])  {
						blankY = y;
					} else break;
				}
				break;
			case "left":
				// tim cell gan nhat
				for (let x = cx-1; x >= 1; x--) {
					if (this.cells[x][cy])  {
						// pX = x;
						occupiedCell = this.cells[x][cy];
						break;
					}
				}
				// tim null gan nhat
				for (let x = cx-1; x >= 1; x--) {
					if (!this.cells[x][cy])  {
						blankX = x;
					} else break;
				}
				break;
			case "right":
				// tim cell gan nhat
				for (let x = cx+1; x <= this.size; x++) {
					if (this.cells[x][cy])  {
						// pX = x;
						occupiedCell = this.cells[x][cy];
						break;
					}
				}
				// tim null gan nhat
				for (let x = cx+1; x <= this.size; x++) {
					if (!this.cells[x][cy])  {
						blankX = x;
					} else break
				}
				break;
		}
		// kiem tra xem co hop nhat dc k, neu co hop nhat
		if (occupiedCell && 
			occupiedCell.dataset.value == cell.dataset.value && 
			occupiedCell.classList.contains('cell_'+occupiedCell.dataset.value)) {
// console.log(occupiedCell.classList.contains('cell_'+occupiedCell.dataset.value));
			// change dataset value
			occupiedCell.dataset.value = parseInt(occupiedCell.dataset.value)*2;
			// update xy
			cell.dataset.x = occupiedCell.dataset.x;
			cell.dataset.y = occupiedCell.dataset.y;
			// remove
			cell.classList.add("abandoned");
			this.cells[cx][cy] = null;

			this.scorce += parseInt(occupiedCell.dataset.value);
			return 1;
		}
		// neu tim thay, di chuyen den vt do
		if (blankX || blankY) {
			let x = blankX || cx;
			let y = blankY || cy;
			cell.dataset.x = x;
			cell.dataset.y = y;
			this.cells[x][y] = cell;
			this.cells[cx][cy] = null;
			return 1;
		}
		return 0;
	}

	createCell () {
console.log("createCell");
		do {
			var x = Math.floor(Math.random()*this.size) + 1;
			var y = Math.floor(Math.random()*this.size) + 1;
		} while(this.cells[x][y] != null);

		let cell = document.createElement("div");
		cell.dataset.x = x;
		cell.dataset.y = y;
		let roll = Math.random(); 
		cell.dataset.value = roll < 0.75 ? 2 : 4;
		cell.classList = "cell cell_" + cell.dataset.value;

		cell.style.left = 10 + (cell.dataset.x-1)*110 + "px";
		cell.style.top = 10 + (cell.dataset.y-1)*110 + "px";
		cell.innerText = cell.dataset.value;

		this.cells[x][y] = cell;
		box.append(cell);
console.log("createCell", x, y);
	}

	updateColor (cell) {
console.log("updateColor");
		cell.classList.remove('cell_'+parseInt(cell.dataset.value)/2);
		cell.classList.add('cell_'+cell.dataset.value);
	}

	render () {
console.log("render");
		let cells = $$('.cell');
// update scorce
		this.scroce_label.innerText = this.scorce;
// update position
		for (let i = 0; i < cells.length; i++) {
			if (cells[i]) {
				cells[i].style.left = 10 + (cells[i].dataset.x-1)*110 + "px";
				cells[i].style.top = 10 + (cells[i].dataset.y-1)*110 + "px";
			}
		}
		setTimeout( ()=>{
			this.clearAbandoned();
			for (let i = 0; i < cells.length; i++) {
				if (cells[i]) {
					this.updateColor(cells[i]);
					cells[i].innerText = cells[i].dataset.value;
				}
			}
		}, 150)

	}

	clearAbandoned () {
console.log("clearAbandoned");
		let cells = $$('.cell');

		for (let i = 0; i < cells.length; i++) {
			if(cells[i] && cells[i].classList.contains("abandoned"))
				cells[i].remove();
		}
	}

}

const game = new Game();
game.start();