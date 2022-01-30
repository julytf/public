$(document).ready(function() {
	let input = $('.new');
	let ul = $('ul');

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
		$('.show_finnished_task')[0].style.backgroundColor = '';
	
	});

	$('.show_finnished_task').click(function(event) {
		$('.task').has('input:checked').toggle();
		$('.show_finnished_task')[0].style.backgroundColor = $('.show_finnished_task')[0].style.backgroundColor == '' ? '#2ECC71' : '';
	});

	function setUp() {//console.log('setUp');
			//updateTaskStatusInData
			$('input[type="checkbox"]').off('change');
			$('input[type="checkbox"]').change(function(event) {
				id = this.getAttribute('data-id');
				if(this.checked == true) {
					$(this).next().prop("readonly",true);
					updateTaskStatusInData(id,'finished');
				} else if(this.checked == false) {
					$(this).next().prop("readonly",false);
					updateTaskStatusInData(id,'unfinished');
				}
			});
			$('input[class="content"]').off('blur');
			$('input[class="content"]').blur(function(event) {
				// console.log(this.getAttribute('value'));
				id = this.getAttribute('data-id');
				content = this.value;
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
					readonly = 'readonly';
					display = 'style="display: none;"';
					checked = 'checked';
				} else {
					readonly = '';
					display = '';
					checked = '';
				}
				ul.append(`<li class="task"`+display+`>
								<input type="checkbox" data-id="`+element.id+`" class="status" `+checked+`>
								<input type="text" data-id="`+element.id+`" class="content" value="`+element.content+`"`+readonly+`>
							</li>`);
			}
		})
		setUp();
	}

	function displayTask (id,content) {
		input.val('');
		ul.append(`<li class="task">
						<input type="checkbox" data-id="`+id+`" class="status">
						<input type="text" data-id="`+id+`" class="content" value="`+content+`">
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
		task = {
			'id': id,
			'status': 'unfinished',
			'content': content,
			'expire': ''
		}
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
		data = [{
			'id': 1,
			'status': 'unfinished',
			'content': 'fill the input to add new task',
			'expire': ''
		},
		{
			'id': 2,
			'status': 'unfinished',
			'content': 'check the checkbox to mark as finished',
			'expire': ''
		},
		{
			'id': 3,
			'status': 'unfinished',
			'content': 'use can change the task content after add as long as it not checked',
			'expire': ''
		}]
		localStorage.setItem('todolist',JSON.stringify(data));
	}
});