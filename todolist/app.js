$(document).ready(function() {
	let input = $('.new');
	let ul = $('ul');

	class Task {
		constructor(id, status, content, expire) {
			this.id = id,
			this.status = status,
			this.content = content,
			this.expire = expire
		}
	}

	if (localStorage.getItem('todolist') == null) {
		createIntitialData();
	}
	loadTask();

	//add new task
	$('form').submit(function(event) {
		event.preventDefault();
		if (input.val().length == 0) {
			return;
		}
		content = input.val();
		// console.log(content);
		id = addTaskToData(content);
		displayTask(id,content);
	});

	$('.reload').click(function(event) {
		loadTask();
		$('.show_finnished_task')[0].classList.toggle('pressed', false);
	
	});

	$('.show_finnished_task').click(function(event) {
		$('.task').has('input:checked').toggle();
		$('.show_finnished_task')[0].classList.toggle('pressed');
	});

	function setUp() {//console.log('setUp');
			//updateTaskStatusInData
			$('.status').off('change');
			$('.status').change(function(event) {
				id = this.getAttribute('data-id');
				if(this.checked == true) {
					$(this).next().prop("contenteditable",false);
					updateTaskStatusInData(id,'finished');
				} else if(this.checked == false) {
					$(this).next().prop("contenteditable",true);
					updateTaskStatusInData(id,'unfinished');
				}
			});
			$('.content').off('blur');
			$('.content').blur(function(event) {
				// console.log($(this).html());	
				id = this.getAttribute('data-id');
				content = $(this).html();
				updateTaskCotentInData(id,content);
			});
	}

	function loadTask() {//console.log('loadTask');
		$('.task').remove();
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {
			return;
		}
		data.forEach( (element) => {
			if (element.expire != '' && element.expire < new Date().getTime()) {
				removeTaskFromData(element.id);
			} else {
				if (element.status == 'finished') {
					contenteditable = '';
					display = 'style="display: none;"';
					checked = 'checked';
				} else {
					contenteditable = 'contenteditable';
					display = '';
					checked = '';
				}
				ul.append(`<li class="task"${display}>
								<input type="checkbox" data-id="${element.id}" class="status" ${checked}>
								<div data-id="${element.id}" class="content" ${contenteditable} spellcheck="false">${element.content}</div>
							</li>`);
			}
		})
		setUp();
	}

	function displayTask (id,content) {
		input.val('');
		ul.append(`<li class="task">
						<input type="checkbox" data-id="${id}" class="status">
						<div data-id="${id}" class="content" contenteditable spellcheck="false">${content}</div>
					</li>`);
		setUp();
	}

	function addTaskToData (content) {
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {
			data = [];
		}
		// console.log(data);

		do {
			id = Math.ceil(Math.random()*1e5);
		} while(data.some((element) => {return element.id == id}));
		task = new Task(id, 'unfinished', content, '');
		data.push(task);

		localStorage.setItem('todolist',JSON.stringify(data));
		// console.log(data);
		return id;
	}

	function updateTaskStatusInData (id,status) {//console.log('changeTaskStatus');
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {			
			return;
		} 

		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].id == id) {
				data[i].status = status;
				if (status == 'finished') {
					data[i].expire = new Date().getTime() + 86400000;
				} else if (status == 'unfinished') {
					data[i].expire = '';
				}
				break;
			}
		}

		// console.log(data);
		localStorage.setItem('todolist',JSON.stringify(data));
	}

	function updateTaskCotentInData (id,content) {//console.log('updateTaskCotentInData');
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {			
			return;
		} 

		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].id == id) {
				data[i].content = content;
				break;
			}
		}

		// console.log(data);
		localStorage.setItem('todolist',JSON.stringify(data));
	}

	function removeTaskFromData(id) {
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {			
			return;
		} 

		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].id == id) {
				data.splice(i,1);
				break;
			}
		}

		// console.log(data);
		localStorage.setItem('todolist',JSON.stringify(data));
	}

	//create intitial data
	function createIntitialData() {
		data = [
			new Task(1,'unfinished','fill the input to add new task',''),
			new Task(2,'unfinished','check the checkbox to mark as finished',''),
			new Task(3,'unfinished','you can change the task content after add as long as it not checked','')
		]
		localStorage.setItem('todolist',JSON.stringify(data));
	}
});