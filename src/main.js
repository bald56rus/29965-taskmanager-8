'use strict';
(function () {
  const filterContainer = document.querySelector(`.filter.container`);
  const taskTemplate = document.querySelector(`#card`).content.querySelector(`.card`);
  const taskContainer = document.querySelector(`.board__tasks`);
  const TestTask = {
    type: `repeat`,
    color: `pink`,
    deadline: null,
    repeated: [],
    message: `It is example of repeating task. It marks by wave.`,
    hashtags: [`#repeat`, `#cinema`, `#entertaiment`]
  };
  const filters = [
    {name: `all`, count: 15, disabled: false},
    {name: `overdue`, count: 0, disabled: true},
    {name: `today`, count: 0, disabled: true},
    {name: `favorites`, count: 7, disabled: false},
    {name: `repeating`, count: 2, disabled: false},
    {name: `tags`, count: 6, disabled: false},
    {name: `archive`, count: 115, disabled: false}
  ];
  const tasks = [];

  let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  let removeAllTask = () => {
    taskContainer.innerHTML = ``;
  };

  let createTask = (task) => {
    let newTask = taskTemplate.cloneNode(true);
    newTask.classList.add(`card--${task.type}`);
    newTask.classList.add(`card--${task.color}`);
    newTask.querySelector(`.card__text`).textContent = task.message;
    newTask.querySelector(`.card__date-status`).textContent = task.deadline !== null ? `yes` : `no`;
    newTask.querySelector(`.card__date-deadline`).disabled = task.deadline === null;
    newTask.querySelector(`.card__repeat-status`).textContent = task.repeated.length > 0 ? `yes` : `no`;
    newTask.querySelector(`.card__repeat-days`).disabled = !task.repeated.length > 0;
    newTask.querySelectorAll(`.card__repeat-day-input`).forEach((input) => {
      if (task.repeated.includes(input.value)) {
        input.checked = true;
      }
    });
    newTask.querySelector(`.card__hashtag-list`).appendChild(createHashtags(task.hashtags));
    return newTask;
  };

  let createHashtags = (hashtags) => {
    let hashtagsContainer = new DocumentFragment();
    hashtags.forEach((hashtag) => {
      let hashtagContainer = document.createElement(`span`);
      hashtagContainer.classList.add(`card__hashtag-inner`);
      let input = document.createElement(`input`);
      input.type = `hidden`;
      input.name = `hashtag`;
      input.value = `repeat`;
      input.classList.add(`card__hashtag-hidden-input`);
      let button = document.createElement(`button`);
      button.type = `button`;
      button.classList.add(`card__hashtag-name`);
      button.textContent = hashtag;
      let deleteButton = document.createElement(`button`);
      deleteButton.type = `button`;
      deleteButton.classList.add(`card__hashtag-delete`);
      deleteButton.textContent = `delete `;
      hashtagContainer.appendChild(input);
      hashtagContainer.appendChild(button);
      hashtagContainer.appendChild(deleteButton);
      hashtagsContainer.appendChild(hashtagContainer);
    });
    return hashtagsContainer;
  };

  let createFilter = (filter) => {
    let newFilter = new DocumentFragment();
    let input = document.createElement(`input`);
    input.type = `radio`;
    input.classList.add(`filter__input`, `visually-hidden`);
    input.name = `filter`;
    const filterId = `filter__${filter.name.toLowerCase()}`;
    input.id = filterId;
    input.disabled = filter.disabled;
    newFilter.appendChild(input);
    let label = document.createElement(`label`);
    label.classList.add(`filter__label`);
    label.for = filterId;
    label.textContent = `${filter.name.toUpperCase()} `;
    label.addEventListener(`click`, () => {
      if (!filter.disabled) {
        input.checked = true;
        removeAllTask();
        tasks.length = 0;
        const random = getRandomInt(1, filter.count);
        for (let i = 0; i <= random; i++) {
          tasks.push(TestTask);
        }
        renderTasks();
      }
    });
    let span = document.createElement(`span`);
    span.classList.add(`${filterId}-count`);
    span.textContent = filter.count;
    label.appendChild(span);
    newFilter.appendChild(label);
    return newFilter;
  };

  let renderFilters = () => {
    filterContainer.innerHTML = ``;
    let container = new DocumentFragment();
    filters.forEach((filter) => {
      container.appendChild(createFilter(filter));
    });
    filterContainer.appendChild(container);
  };

  let renderTasks = () => {
    let container = new DocumentFragment();
    tasks.forEach((task) => {
      container.appendChild(createTask(task));
    });
    taskContainer.appendChild(container);
  };
  for (let i = 0; i < 7; i++) {
    tasks.push(TestTask);
  }
  removeAllTask();
  renderFilters();
  renderTasks();
}());
