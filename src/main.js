import Task from './Task';
import Filter from './Filter';

const filterContainer = document.querySelector(`.filter.container`);
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

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createFilter = (filter) => {
  const element = new Filter(filter).render();
  element.addEventListener(`filter:change`, () => {
    taskContainer.innerHTML = ``;
    tasks.length = 0;
    const random = getRandomInt(1, filter.count);
    for (let i = 0; i <= random; i++) {
      tasks.push(TestTask);
    }
    renderTasks();
  });
  return element;
};

const renderFilters = () => {
  filterContainer.innerHTML = ``;
  let container = new DocumentFragment();
  filters.forEach((filter) => {
    container.appendChild(createFilter(filter));
  });
  filterContainer.appendChild(container);
};

const renderTasks = () => {
  taskContainer.innerHTML = ``;
  let container = new DocumentFragment();
  tasks.forEach((task) => {
    container.appendChild(new Task(task).render());
  });
  taskContainer.appendChild(container);
};
for (let i = 0; i < 3; i++) {
  tasks.push(TestTask);
}
renderFilters();
renderTasks();
