'use strict';

function addTask(newTask, id) {
	let taskElement = document.createElement('li');
	taskElement.classList.add('list-group-item');
	taskElement.innerText = newTask.title;
	taskElement.setAttribute('data-id', id);

	let buttons = {
		container: document.createElement('div'),
		information: document.createElement('button'),
		edit: document.createElement('button'),
		delete: document.createElement('button'),
	};

	buttons.edit.classList.add('btn', 'btn-warning', 'btn-edit', 'btn-xs');
	buttons.edit.innerHTML = '<i class="glyphicon glyphicon-pencil"></i>';
	buttons.edit.addEventListener('click', editButtonHandler);

	buttons.delete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-xs');
	buttons.delete.innerHTML = '<i class="glyphicon glyphicon-trash"></i>';
	buttons.delete.addEventListener('click', deleteButtonHandler);

	buttons.information.classList.add('btn', 'btn-info', 'btn-information', 'btn-xs');
	buttons.information.innerHTML = '<i class="glyphicon glyphicon-search"></i>';
	buttons.information.setAttribute('data-toggle', 'popover');
	buttons.information.setAttribute('title', newTask.datepicker);
	buttons.information.setAttribute('data-content', 'Date of task');
	buttons.information.setAttribute('data-placement', 'left');
	buttons.information.setAttribute('data-trigger', 'focus');		
	buttons.information.addEventListener('click', informationButtonHandler);

	buttons.container.appendChild(buttons.information);
	buttons.container.appendChild(buttons.edit);
	buttons.container.appendChild(buttons.delete);

	buttons.container.classList.add('pull-right', 'buttons-container');

	taskElement.appendChild(buttons.container);

	let taskContainer = document.querySelector(`[data-status="${newTask.status}"]`);
	taskContainer.appendChild(taskElement);

	$(buttons.information).popover();
}

function deleteTask() {
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
}

function firstTaskCounter() {
	let panelBodys = document.querySelectorAll('.panel-body');
	let todoList = document.querySelectorAll('.list-group');

	let badgeElementToDo = document.createElement('span');
	badgeElementToDo.classList.add('badge');
	badgeElementToDo.innerText = `${todoList[0].childElementCount}`;
	panelBodys[0].appendChild(badgeElementToDo);

	let badgeElementInProgress = document.createElement('span');
	badgeElementInProgress.classList.add('badge');
	badgeElementInProgress.innerText = `${todoList[1].childElementCount}`;
	panelBodys[1].appendChild(badgeElementInProgress);

	let badgeElementDone = document.createElement('span');
	badgeElementDone.classList.add('badge');
	badgeElementDone.innerText = `${todoList[2].childElementCount}`;
	panelBodys[2].appendChild(badgeElementDone);	
}

function taskCounter() {
	let panelBodys = document.querySelectorAll('.panel-body');
	let todoList = document.querySelectorAll('.list-group');

	for ( let i = 0; i < panelBodys.length; i++) {
		panelBodys[i].removeChild(panelBodys[i].lastElementChild)
	}

	let badgeElementToDo = document.createElement('span');
	badgeElementToDo.classList.add('badge');
	badgeElementToDo.innerText = `${todoList[0].childElementCount}`;
	panelBodys[0].appendChild(badgeElementToDo);

	let badgeElementInProgress = document.createElement('span');
	badgeElementInProgress.classList.add('badge');
	badgeElementInProgress.innerText = `${todoList[1].childElementCount}`;
	panelBodys[1].appendChild(badgeElementInProgress);

	let badgeElementDone = document.createElement('span');
	badgeElementDone.classList.add('badge');
	badgeElementDone.innerText = `${todoList[2].childElementCount}`;
	panelBodys[2].appendChild(badgeElementDone);
}

