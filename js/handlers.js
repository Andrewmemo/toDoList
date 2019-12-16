'use strict';

function formAddTaskHandler(event) {
	event.preventDefault();

	let dateNewTask = new Date();

	let newTask = {
		title: this.elements.title.value,
		status: 1, // 1 - todo, 2 - inprogress, 3 - done
		datepicker: this.elements.event_date.value || `${dateNewTask.getFullYear()}-${dateNewTask.getMonth()+1}-${dateNewTask.getDate()}`
	};

	let id = new Date().getTime();

	if (!newTask.title) {
		this.elements.title.parentNode.classList.add('has-error');
		return;
	}

	addTask(newTask, id);
	taskCounter();
	localStorage.setItem(id, JSON.stringify(newTask));

	$(modalAddTask).modal('hide');

	this.reset();
}

function deleteButtonHandler() {
	$(modalDeleteTask).modal('show');

	buttonConfirm.addEventListener('click', () => {
		let taskElement = this.parentNode.parentNode;

		let taskId = taskElement.dataset.id;

		localStorage.removeItem(taskId);

		taskElement.parentNode.removeChild(taskElement);
		taskCounter();
		$(modalDeleteTask).modal('hide');
	}, { once: true });
}

function deleteAllButtonHandler() {
	$(modalDeleteAllTasks).modal('show');

	buttonConfirmAll.addEventListener('click', () => {
		localStorage.clear();

		let todoList = document.getElementsByClassName('list-group');
		while(todoList[0].firstChild) {
			todoList[0].removeChild(todoList[0].firstChild);
		}
		while(todoList[1].firstChild) {
			todoList[1].removeChild(todoList[1].firstChild);
		}
		while(todoList[2].firstChild) {
			todoList[2].removeChild(todoList[2].firstChild);
		}
		taskCounter();
		$(modalDeleteAllTasks).modal('hide');
	}, { once: true });
}

function editButtonHandler() {
	let taskElement = this.parentNode.parentNode;

	let taskId = taskElement.dataset.id;

	let task = JSON.parse(localStorage.getItem(taskId));

	for (let key in task) {
		formEditTask.elements[key].value = task[key];
	}

	formEditTask.elements.id.value = taskId;
	
	$(modalEditTask).modal('show');
}

function informationButtonHandler(event) {
	console.log('lalal');
	let taskElement = this.parentNode.parentNode;

	let taskId = taskElement.dataset.id;

	let task = JSON.parse(localStorage.getItem(taskId));

	event.target.setAttribute('data-content', `${task['datepicker']}`);
	$(document).ready(function(){
	  // $('[data-toggle="popover"]').popover();
	});

}

function formEditTaskHandler(event) {
	event.preventDefault();

	let task = {
		title: this.elements.title.value,
		status: +this.elements.status.value,
		datepicker: this.elements.datepicker.value
	};

	let taskId = this.elements.id.value;

	let itemElement = document.querySelector(`[data-id="${taskId}"]`);
	itemElement.parentNode.removeChild(itemElement);

	addTask(task, taskId);

	localStorage.setItem(taskId, JSON.stringify(task));
	taskCounter();
	$(modalEditTask).modal('hide');
}

function modalAddTaskHandler() {
	formAddTask.elements.title.parentNode.classList.remove('has-error');
	formAddTask.elements.title.focus();
}
