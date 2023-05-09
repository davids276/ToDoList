let todo_control = document.querySelector('.todo-control');
let header_input = document.querySelector('.header-input');
let todo_list = document.querySelector('.todo-list');
let todo_completed = document.querySelector('.todo-completed');

const header_button = document.querySelector('#add');

let todo_data
if (localStorage.save_todo){
    todo_data = JSON.parse(localStorage.save_todo)
}
else{
    todo_data = [];
}

let addToDo = function() {
    todo_list.textContent = '';
    todo_completed.textContent = '';

    todo_data.forEach(function(item, i) {
        let li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        if (item.completed) {
            todo_completed.append(li);
        } else {
            todo_list.append(li);
        }

        const btn_todo_complete = li.querySelector('.todo-complete');
        const btn_todo_remove = li.querySelector('.todo-remove');

        btn_todo_complete.addEventListener('click', function() {
            item.completed = !item.completed;
            addToDo();
        });

        btn_todo_remove.addEventListener('click', function() {
            todo_data.splice(i, 1);
            addToDo();
        });

    });
    localStorage.save_todo=JSON.stringify(todo_data)
};

addToDo();

todo_control.addEventListener('submit', function(event){
    event.preventDefault()
    let new_todo = {
        value: header_input.value.trim(),
        completed: false,
    }
    todo_data.push(new_todo);
    addToDo();
});