$(document).ready(function() {
	let form = $('form');
	let input = $('.new');

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
	});

	$('.show_finnished_task').click(function(event) {
		loadFullTask();
	});

	function setUp() {console.log('setUp');
			//changeTaskStatusInData
			$('input[type="checkbox"]').off('change');
			$('input[type="checkbox"]').change(function(event) {
				id = this.getAttribute('id');
				if(this.checked == true) {
					changeTaskStatusInData(id,'finished');
				} else if(this.checked == false) {
					changeTaskStatusInData(id,'unfinished');
				}
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
				status = element.status == 'finished' ? ' style="display: none;"' : '';
				form.after('<div class="task"' + status + '><input id="' + element.id + '" type="checkbox" name=""><span>' + element.content + '</span></div>');
			}
		})
		setUp();
	}

	function loadFullTask() {//console.log('loadFullTask');
		$('.task').remove();
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {
			return;
		}
		data.forEach( (element) => {
			if (element.expire != '' && element.expire < new Date().getTime()) {
				removeTaskFromData(element.id);
			} else {
				status = element.status == 'finished' ? ' checked' : '';
				form.after('<div class="task"><input id="' + element.id + '" type="checkbox" name=""' + status + '><span>' + element.content + '</span></div>');
			}
		})
		setUp();
	}

	function displayTask (id,content) {
		input.val('');
		form.after('<div class="task"><input id="' + id + '" type="checkbox" name=""><span>' + content + '</span></div>');
		// console.log(form);
		setUp();
	}

	function addTaskToData (content) {
		data = JSON.parse(localStorage.getItem('todolist'));
		if (!data) {
			data = [];
		}
		console.log(data);

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

	function changeTaskStatusInData (id,status) {//console.log('changeTaskStatus');
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

		console.log(data);
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

		console.log(data);
		localStorage.setItem('todolist',JSON.stringify(data));
	}
});