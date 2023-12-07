let tasks = [
  {
    id: 1,
    text: 'Bay a book for my self in the Mall',
    isImportant: false,
    isDone: false,
  },
	{
    id: 2,
    text: 'Tomorrow I have course',
    isImportant: false,
    isDone: false,
  },
];

if(localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'))
}

// localStorage.setItem('tasks', JSON.stringify(tasks))

const todoList = document.querySelector('.todo__list');
const todoForm = document.querySelector('.todo__form');
const todoField = document.querySelector('.todo__field');
const todoError = document.querySelector('.todo__error');
const todoDone = document.querySelector('.todo__lvl-done');
const todoAll = document.querySelector('.todo__lvl-all');

const addItemInTodoList = () => {
  todoList.innerHTML = '';
  tasks.forEach((item) => {

		todoAll.innerHTML = tasks.length
		todoDone.innerHTML = tasks.filter(el => el.isDone).length

    todoList.innerHTML += `
		<li class="todo__item" 
				style='background: ${item.isDone ? 'green' : item.isImportant ? 'gold' : 'royalblue'}; 
				order: ${item.isDone ? '2' : item.isImportant ? '-1' : '0'};'>
			<div class='todo__item-left'>
			<input data-id='${item.id}' class='todo__item-done' ${item.isDone ? 'checked' : ''} type="checkbox">
			<p class="todo__item-text" style='text-decoration: ${item.isDone ? 'line-through' : 'none'}'>${item.text}</p>
			</div>
			<div class='todo__item-right'>
						<span class='todo__item-imp' data-id='${item.id}'>
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="25" height="25" viewBox="0 0 256 256" xml:space="preserve">
					
								<defs>
								</defs>
								<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
									<path d="M 89.95 34.92 c -0.135 -0.411 -0.519 -0.688 -0.95 -0.688 H 56.508 L 45.948 2.814 C 45.811 2.408 45.43 2.133 45 2.133 s -0.811 0.274 -0.948 0.681 l -10.56 31.417 H 1 c -0.432 0 -0.815 0.277 -0.95 0.688 s 0.009 0.861 0.357 1.117 l 26.246 19.314 l -10 31.21 c -0.131 0.409 0.014 0.856 0.36 1.11 c 0.348 0.257 0.817 0.261 1.168 0.012 L 45 68.795 l 26.818 18.889 c 0.173 0.122 0.375 0.183 0.576 0.183 c 0.208 0 0.416 -0.064 0.592 -0.194 c 0.347 -0.254 0.491 -0.701 0.36 -1.11 l -10 -31.21 l 26.246 -19.314 C 89.94 35.781 90.085 35.331 89.95 34.92 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill:${item.isImportant ? '#000000' : '#ffffff'}; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
								</g>
								</svg>
						</span>
						<span data-id='${item.id}' class="todo__item-del">&times;</span>
			</div>
		</li>
		`;
  });

	const todoItemDelItems = document.querySelectorAll('.todo__item-del');
	const todoItemImp = document.querySelectorAll('.todo__item-imp');
	const todoItemDoneItems = document.querySelectorAll('.todo__item-done');
	const todoDelAll = document.querySelector('.todo__del-all');

	todoDelAll.addEventListener('click', function() {
		tasks = tasks.filter((el) => {
			return !el.isDone
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))
		addItemInTodoList();
	})


	Array.from(todoItemDoneItems).forEach((item) => {
		item.addEventListener('change', function() {
			const itemId = parseInt(item.dataset.id);
			tasks = tasks.map((el) => {
				if(el.id === itemId) {
					return {...el, isDone : !el.isDone}
				}
				return el
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
			addItemInTodoList();
		})
	})

	Array.from(todoItemImp).forEach((item) => {
		item.addEventListener('click', function() {
			const itemId = parseInt(item.dataset.id);
			tasks = tasks.map((el) => {
				if(el.id === itemId) {
					return {...el, isImportant : !el.isImportant}
				}
				return el
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
			addItemInTodoList();
		})
	})

	Array.from(todoItemDelItems).forEach((item) => {
		item.addEventListener('click', function() {
			const itemId = parseInt(item.dataset.id);
			tasks = tasks.filter(el => el.id !== itemId)
			localStorage.setItem('tasks', JSON.stringify(tasks))
			addItemInTodoList();
		})
	})

};

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

	if(tasks.some(task => task.text.toUpperCase() == e.target[0].value.toUpperCase())) {
		alert('Такая задача уже существует')
	} else if (e.target[0].value.trim().length === 0) {
		alert('you have to fill out')
	}else {

		tasks = [
			...tasks,
			{
				id: tasks.length ? tasks.at(-1).id + 1 : 1,
				text: e.target[0].value.trim(),
				isImportant: false,
				isDone: false,
			},
		];
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}


  e.target[0].value = '';
  addItemInTodoList();
});

todoField.addEventListener('input', function(e) {
	if(tasks.some(task => task.text.toUpperCase() == e.target.value.toUpperCase())) {
		todoError.style.display = 'block'
	} else {
		todoError.style.display = 'none'
	}
})


addItemInTodoList();
