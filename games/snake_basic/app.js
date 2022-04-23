$(document).ready(function() {
	const table = $('#game div');
	const tableWidth = 10;

	let game_state = 0;	//0: pausing, 1:playing, 2:gameover

	let snake = {
		head: 13,
		oldHead: 13,
		tail: 10,
		oldTail: 10,
		body: [11,12],
		headDirection: 1	//1,2,3,4: up,right,down,left
	}

	let food = 72;

	$(document).keydown(function(event) {
		key = event.which;
		console.log(key);
		switch (key) {
			// space bar
			case 32:
				pause();
				break;
			case 87:
				snake.headDirection = -10;
				break;
			case 68:
				snake.headDirection = 1;
				break;
			case 83:
				snake.headDirection = 10;
				break;
			case 65:
				snake.headDirection = -1;
				break;
		}
	});

	function pause () {
		if (game_state == 0) {
			game_state = 1;
			gameTimer = setInterval(run,500);
		} else if (game_state == 1) {
			game_state = 0;
			clearInterval(gameTimer);
		}
	}

	function gameOver() {
		game_state = 2;
		clearInterval(gameTimer);
	}

	function run () {
		snake.body.push(snake.head);
		snake.oldHead = snake.head;
		snake.head += snake.headDirection;
		if (snake.head == food) {
			resetFood();
		} else {
			snake.oldTail = snake.tail;
			snake.tail = snake.body.shift();
		}
		if (snake.body.some((node)=>{return node == snake.head}) || snake.head == snake.tail) {
			gameOver();
		}
		loadDisplay();
		// console.log(snake);
	}

	function loadDisplay () {
		table[snake.head].classList.add('head');
		table[snake.head].classList.add('snake');
		table[snake.oldHead].classList.remove('head');
		table[snake.oldTail].classList.remove('snake');
	}

	function resetFood() {
		table[food].classList.remove('food');
		do {
			food = Math.floor(Math.random()*tableWidth*tableWidth);
		} while(food == snake.head || food == snake.tail || snake.body.some((node)=>{return node == food}))
		table[food].classList.add('food');
	}

});