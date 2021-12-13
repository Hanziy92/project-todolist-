	"use strict";
// розпаковуєво список що запамятали
function printStoregeTaskList() {
	var taskList = localStorage.getItem('taskList');
	var newData = JSON.parse(taskList);

		$('.js-task-list').empty();

		$.each(newData, function(index, val) {
		printTaskItem(val); 
	});   
}

printStoregeTaskList();

//запамятовуємо спислк задач
function rememberTaskItem() {
	var listTaskItems = $('.js-task-list .tli-text-value');
	var listTaskItemsValue = {};

	$.each(listTaskItems, function(index, val){
		var title = $(val).html();
		listTaskItemsValue['task-' + index] = title;
	});

	var jsonData = JSON.stringify(listTaskItemsValue);	

	localStorage.setItem('taskList', jsonData);
}

function printTaskItem(taskValue) {
	$('.js-task-list').append(`<li class="task-li-item ">
	<div class="task-list-default">
		<label class="tli-text">
			<input type="checkbox"> 
			<span class="tli-text-value js-tli-edit">${taskValue}</span> 
		</label>
		<div class="btn ts-delete js-tli-delete">Видалити</div>
		<div class="btn ts-edit js-tli-edit">Редагувати</div>
	</div>
</li>`);
}



	function setTaskFronJsonSite(argument) {
			printTaskItem(argument['title']);
			rememberTaskItem();
		
	}
	 //витягуєм задачу з jsonplasecholder
	function getJsonPlaseholder(){

		var pageNum = $('.js-task-list .task-li-item').length;
		$.ajax({
			url:'https://jsonplaceholder.typicode.com/todos/'+pageNum,
			type: "GET",
			success: setTaskFronJsonSite
		});
	}
	
	

	$('.btn-add-task').click(function(e){
		e.preventDefault();

		var inputVal = $('.js-add-task').val();

		if (inputVal == '') {
			inputVal = getJsonPlaseholder();
		} else {
			printTaskItem(inputVal);
			rememberTaskItem();	
		}
		

	});
 


	//cлідкуємо за кнопкою видалення

$(document).on('click', '.js-tli-delete', function(e) {
	e.preventDefault();
	var el = $(this);
	el.closest('.task-li-item').remove();
	rememberTaskItem();
});
	

// редаегуємо задачу 
function editTaskItem (el) {
	// відбираємо батьківський елемент
	var parentEl = el.closest('.task-li-item');
	var value = parentEl.find('.js-tli-edit').html();
	parentEl.find('.task-list-default').addClass('hide')



	parentEl.append(`<div class="task-list-edited">	
	<input type="text" value="${value}" class="tli-input-edit js-edit-task">
	<div class="btn tli-update js-tli-update">Зберегти</div>
</div>`);
}


$(document).on('click', '.js-tli-edit', function(e) {
	e.preventDefault();
	editTaskItem($(this));

});

//Редагуємо задачу
function updateTaskItem(argument) {
	var parentEl = argument.closest('.task-li-item');
	//відбираєм input

	var value = parentEl.find('input.js-edit-task').val();
	//помістити текст  у спан  який виводить текст задачі
	 
	parentEl.find('span.js-tli-edit').html(value);

	//Забрати поле редагування і показати блок з текстом задачі
	parentEl.find('.task-list-edited').remove();


	parentEl.find('.task-list-default').removeClass('hide');
	//Оновити локал сторе
	
}
// оновлуємо задаччу
$(document).on('click', '.js-tli-update', function (e) {
	e.preventDefault();

	updateTaskItem($(this));
	rememberTaskItem();
});
