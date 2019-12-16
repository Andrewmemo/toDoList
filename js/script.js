'use strict';

let modalAddTask = document.querySelector('#modalAddTask');
let formAddTask = document.querySelector('#formAddTask');
let modalEditTask = document.querySelector('#modalEditTask');
let formEditTask = document.querySelector('#formEditTask');
let modalDeleteTask = document.querySelector('#modalDeleteTask');
let buttonConfirm = document.querySelector('#buttonConfirm');
let deleteAllTasks = document.getElementById('deleteAllButton');
let buttonConfirmAll = document.querySelector('#buttonConfirmAll');

deleteAllButton.addEventListener('click', deleteAllButtonHandler);
formAddTask.addEventListener('submit', formAddTaskHandler);
formEditTask.addEventListener('submit', formEditTaskHandler);
$(modalAddTask).on('shown.bs.modal', modalAddTaskHandler);

for (let key in localStorage) {
	if (localStorage.hasOwnProperty(key)) {
		let task = JSON.parse(localStorage[key]);
		addTask(task, key);
	}
}
firstTaskCounter();

$(function() {
	$('.dates #datepicker').datepicker({
		'format': 'yyyy-mm-dd',
		'autoclose': true
	});
});

