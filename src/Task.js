class Task {
  constructor(model) {
    this._model = model;
  }

  get template() {
    return document.querySelector(`#card`).content.querySelector(`.card`);
  }

  get tagTemplate() {
    const markup =
      `<span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input" />
        <button type="button" class="card__hashtag-name">#entertaiment</button>
        <button type="button" class="card__hashtag-delete">delete</button>
      </span>`;
    const template = document.createElement(`template`);
    template.innerHTML = markup;
    return template.content;
  }

  _renderTags(tags) {
    let container = new DocumentFragment();
    tags.forEach((tag) => {
      const element = this.tagTemplate.cloneNode(true);
      element.querySelector(`.card__hashtag-name`).textContent = `#${tag}`;
      container.appendChild(element);
    });
    return container;
  }

  render() {
    const element = this.template.cloneNode(true);
    let repeat = false;
    Object.keys(this._model.repeatingDays).forEach((key) => {
      if (this._model.repeatingDays[key]) {
        repeat = true;
        return;
      }
    });
    if (repeat) {
      element.classList.add(`card--repeat`);
    }
    element.classList.add(`card--${this._model.color}`);
    element.querySelector(`.card__text`).textContent = this._model.title;
    element.querySelector(`.card__date-status`).textContent = this._model.dueDate !== null ? `yes` : `no`;
    element.querySelector(`.card__date-deadline`).disabled = this._model.dueDate === null;
    element.querySelector(`.card__date`).value = this._model.dueDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`});
    element.querySelector(`.card__repeat-status`).textContent = repeat ? `yes` : `no`;
    element.querySelector(`.card__repeat-days`).disabled = !repeat;
    element.querySelectorAll(`.card__repeat-day-input`).forEach((input) => {
      input.checked = this._model.repeatingDays[input.value.replace(/\b\w/g, (l) => l.toUpperCase())];
    });
    element.querySelector(`.card__hashtag-list`).appendChild(this._renderTags(this._model.tags));
    return element;
  }
}

export default Task;
