class Filter {
  constructor(filter) {
    Object.keys(filter).forEach((key) => {
      this[`_${key}`] = filter[key];
    });
    this.$element = null;
  }

  get template() {
    const markup =
      `<input type="radio" id="filter__all" class="filter__input visually-hidden" name="filter" />
      <label for="filter__all" class="filter__label">
        ALL
        <span>15</span>
      </label>`;
    const template = document.createElement(`template`);
    template.innerHTML = markup;
    return template.content;
  }

  render() {
    this.$element = this.template.cloneNode(true);
    const filterName = `filter__${this._name.toLowerCase()}`;
    const input = this.$element.querySelector(`input`);
    input.id = filterName;
    input.disabled = this._disabled;
    const label = this.$element.querySelector(`label`);
    label.htmlFor = filterName;
    label.addEventListener(`click`, () => {
      if (!this._disabled) {
        input.checked = true;
        this.$element.dispatchEvent(new CustomEvent(`filter:change`));
      }
    });
    label.innerHTML = `${this._name} <span class="${filterName}-count">${this._count}</span>`;
    return this.$element;
  }

  clickHandler() {
  }
}

export default Filter;
