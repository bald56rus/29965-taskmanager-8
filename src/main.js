(function () {
  const taskTemplate = document.querySelector('#card').content.querySelector('.card');
  const tasksContainer = document.querySelector('.board__tasks');

  let createTask = (task) => {
    let newTask = taskTemplate.cloneNode(true);
    newTask.classList.add('card--' + task.type);
    newTask.classList.add('card--' + task.color);
    newTask.querySelector('.card__text').textContent = task.message;
    newTask.querySelector('.card__date-status').textContent = task.deadline !== null ? 'yes' : 'no';
    newTask.querySelector('.card__date-deadline').disabled = task.deadline === null;
    newTask.querySelector('.card__repeat-status').textContent = task.repeated.length > 0 ? 'yes' : 'no';
    newTask.querySelector('.card__repeat-days').disabled = !task.repeated.length > 0;
    newTask.querySelectorAll('.card__repeat-day-input').forEach(input => {
      if (task.repeated.includes(input.value)) {
        input.checked = true;
      }
    });
    newTask.querySelector('.card__hashtag-list').appendChild(createHashtags(task.hashtags));
    return newTask;
  };

  let createHashtags = (hashtags) => {
    let hashtagsContainer = new DocumentFragment();
    hashtags.forEach(hashtag => {
      let hashtagContainer = document.createElement('span');
      hashtagContainer.classList.add('card__hashtag-inner');
      let input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'hashtag';
      input.value = 'repeat';
      input.classList.add('card__hashtag-hidden-input');
      let button = document.createElement('button');
      button.type = 'button';
      button.classList.add('card__hashtag-name');
      button.textContent = hashtag;
      let deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.classList.add('card__hashtag-delete');
      deleteButton.textContent = 'delete';
      hashtagContainer.appendChild(input);
      hashtagContainer.appendChild(button);
      hashtagContainer.appendChild(deleteButton);
      hashtagsContainer.appendChild(hashtagContainer);
    });
    return hashtagsContainer;
  }

  const tasks = [];
  const task = {
    type: 'repeat',
    color: 'pink',
    deadline: null,
    repeated: [],
    message: 'It is example of repeating task. It marks by wave.',
    hashtags: ['#repeat', '#cinema', '#entertaiment']
  };

  tasksContainer.innerHTML = '';


  let renderTasks = (tasks) => {
    let container = new DocumentFragment();
    tasks.forEach(task => {
      container.appendChild(createTask(task));
    });
    tasksContainer.appendChild(container);
  }

  for (let i = 0; i < 7; i++) {
    tasks.push(task);
  }
  renderTasks(tasks);

}())
