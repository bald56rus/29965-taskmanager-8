import Task from './Task';
import Filter from './Filter';
import {getRandom, shuffleArray} from './Utils';

const filterContainer = document.querySelector(`.filter.container`);
const taskContainer = document.querySelector(`.board__tasks`);
const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `bug`, `fix`]);
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const repeatingDays = {
  Mo: false,
  Tu: false,
  We: false,
  Th: false,
  Fr: false,
  Sa: false,
  Su: false
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
let tasks = [];

const generateTask = () => {
  const task = {};
  task.color = shuffleArray(colors)[0];
  task.title = shuffleArray(titles)[0];
  const now = new Date();
  const range = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  task.dueDate = new Date(now.setDate(now.getDate() + shuffleArray(range)[0]));
  task.repeatingDays = {};
  Object.keys(repeatingDays).forEach((key, index) => {
    task.repeatingDays[key] = index % 3 === 0 ? Math.random() >= 0.5 : false;
  });
  task.tags = new Set(shuffleArray([...tags]).slice(0, getRandom(1, 3)));
  task.isFavorite = Boolean(Math.random >= 0.5);
  task.isDone = Boolean(Math.random >= 0.5);
  task.picture = `http://picsum.photos/100/100?r=${getRandom(1, 5000)}`;
  return task;
};

const generateTasks = (count = 5) => {
  const _tasks = [];
  for (let i = 1; i <= getRandom(1, count); i++) {
    _tasks.push(generateTask());
  }
  return _tasks;
};

const renderFilter = (filter) => {
  const element = new Filter(filter).render();
  element.addEventListener(`filter:change`, () => {
    taskContainer.innerHTML = ``;
    tasks = generateTasks(filter.count);
    renderTasks(tasks);
  });
  return element;
};

const renderFilters = (filterList) => {
  filterContainer.innerHTML = ``;
  let container = new DocumentFragment();
  filterList.forEach((filter) => {
    container.appendChild(renderFilter(filter));
  });
  filterContainer.appendChild(container);
};

const renderTasks = (taskList) => {
  taskContainer.innerHTML = ``;
  let container = new DocumentFragment();
  taskList.forEach((task) => {
    container.appendChild(new Task(task).render());
  });
  taskContainer.appendChild(container);
};

const init = () => {
  renderFilters(filters);
  tasks = generateTasks();
  renderTasks(tasks);
};

init();
