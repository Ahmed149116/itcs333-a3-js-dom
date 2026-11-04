// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const errorMsg = document.getElementById('error-msg');
  const counter = document.getElementById('counter');
  
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    const items = todoList.querySelectorAll('li');
    let activeCount = 0;
    items.forEach(item => {
      if (!item.classList.contains('completed')) {
        activeCount++;
      }
    });
    if (counter) {
      counter.textContent = `${activeCount} item(s) left`;
    }
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach(item => {
      const isCompleted = item.classList.contains('completed');
      if (currentFilter === 'all') {
        item.style.display = '';
      } else if (currentFilter === 'active') {
        item.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        item.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
        errorMsg.style.display = 'block';
      }
      return;
    }

    if (errorMsg) {
      errorMsg.classList.add('hidden');
      errorMsg.style.display = 'none';
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-text">${text}</span>
      <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);
    todoInput.value = '';

    applyFilter();
    updateCounter();
  }

  if (addBtn) {
    addBtn.addEventListener('click', addTodo);
  }

  if (todoInput) {
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }

  if (todoList) {
    todoList.addEventListener('click', (e) => {
      const target = e.target;
      const li = target.closest('li');
      if (!li) return;

      if (target.classList.contains('delete-btn')) {
        li.remove();
        updateCounter();
        return;
      }

      li.classList.toggle('completed');
      applyFilter();
      updateCounter();
    });
  }

  const setActiveFilter = (activeBtn, filterName) => {
    currentFilter = filterName;
    [filterAll, filterActive, filterDone].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
    if (activeBtn) activeBtn.classList.add('active');
    applyFilter();
  };

  if (filterAll) filterAll.addEventListener('click', () => setActiveFilter(filterAll, 'all'));
  if (filterActive) filterActive.addEventListener('click', () => setActiveFilter(filterActive, 'active'));
  if (filterDone) filterDone.addEventListener('click', () => setActiveFilter(filterDone, 'done'));

  updateCounter();
});