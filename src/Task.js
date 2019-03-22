class Task {
  constructor(task) {
    Object.keys(task).forEach((key) => {
      this[`_${key}`] = task[key];
    });
  }

  get template() {
    return document.querySelector(`#card`).content.querySelector(`.card`);
  }

  get hashtagTemplate() {
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

  _renderHashtags(hashtags) {
    let container = new DocumentFragment();
    hashtags.forEach((hashtag) => {
      const element = this.hashtagTemplate.cloneNode(true);
      element.querySelector(`.card__hashtag-name`).textContent = hashtag;
      container.appendChild(element);
    });
    return container;
  }

  render() {
    const element = this.template.cloneNode(true);
    element.classList.add(`card--${this._type}`);
    element.classList.add(`card--${this._color}`);
    element.querySelector(`.card__text`).textContent = this._message;
    element.querySelector(`.card__date-status`).textContent = this._deadline !== null ? `yes` : `no`;
    element.querySelector(`.card__date-deadline`).disabled = this._deadline === null;
    element.querySelector(`.card__repeat-status`).textContent = this._repeated.length > 0 ? `yes` : `no`;
    element.querySelector(`.card__repeat-days`).disabled = !this._repeated.length > 0;
    element.querySelectorAll(`.card__repeat-day-input`).forEach((input) => {
      if (this._repeated.includes(input.value)) {
        input.checked = true;
      }
    });
    element.querySelector(`.card__hashtag-list`).appendChild(this._renderHashtags(this._hashtags));
    return element;
  }
}

export default Task;
