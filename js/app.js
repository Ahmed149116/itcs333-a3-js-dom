// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here




(function () {
  function initApp() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    if (todoForm) {
      todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
      });
    }

    if (todoList) {
      todoList.addEventListener('click', (e) => {
        const target = e.target;
        const li = target.closest('li');

        if (!li) return;

        if (target.closest('.delete-btn')) {
          li.remove();
          updateCounter();
          return;
        }

        if (target.closest('.item-text')) {
          li.classList.toggle('completed');
          applyFilter();
          updateCounter();
        }
      });
    }

    if (filterAll) {
      filterAll.addEventListener('click', () => {
        setActiveFilter(filterAll, 'all');
      });
    }

    if (filterActive) {
      filterActive.addEventListener('click', () => {
        setActiveFilter(filterActive, 'active');
      });
    }

    if (filterDone) {
      filterDone.addEventListener('click', () => {
        setActiveFilter(filterDone, 'done');
      });
    }

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

      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.type = 'button';

      li.appendChild(span);
      li.appendChild(deleteBtn);

      todoList.appendChild(li);

      todoInput.value = '';

      applyFilter();
      updateCounter();
    }

    const setActiveFilter = (activeBtn, filterName) => {
      currentFilter = filterName;

      [filterAll, filterActive, filterDone].forEach(btn => {
        if (btn) {
          btn.classList.remove('active');
        }
      });

      if (activeBtn) {
        activeBtn.classList.add('active');
      }

      applyFilter();
    };

    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
