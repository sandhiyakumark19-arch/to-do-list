const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list')

const saved = localStorage.getItem('todo');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  localStorage.setItem('todo', JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;

  const textspan = document.createElement('span');
  textspan.textContent = todo.text;
  textspan.style.margin = '0 8px';
  textspan.style.textDecoration = todo.completed ? 'line-through' : '';

  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    textspan.style.textDecoration = todo.completed ? 'line-through' : '';
    saveTodos();
  });


  textspan.addEventListener('dblclick', () => {
    const newText = prompt('Edit todo', todo.text);
    if (newText !== null && newText.trim() !== '') {
      todo.text = newText.trim();
      textspan.textContent = todo.text;
      saveTodos();
    }
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(textspan);
  li.appendChild(delBtn);

  return li; 
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  input.value = '';
  render();
  saveTodos();
}


addBtn.addEventListener('click', addTodo);


render();
