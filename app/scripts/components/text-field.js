class TextField extends HTMLElement {
  /**
   * @class TextField
   * @extends HTMLElement
   * 
   * @description 
   * HTMLElement for styled input fields in html forms.
   * Accepts attributes:
   * type - defaults to text, can be any input type
   * value - initial value of the input field
   * placeholder - placeholed for the input field
   * append-icon - material design icon string or any string indicating there
   *  is supposed to be an icon appended, if url parameter is also used uses 
   *  the url instead
   * url - url to an image
   * name - name of the input field
   * label - text for the label
   * 
   */
  constructor() {
    super();

    const appendIcon = this.getAttribute('append-icon');
    let icon = ``;
    if (appendIcon) {
      const url = this.getAttribute('icon-url');
      icon = url ?
        `<img class="append" src='${url}' ></img>` :
        `<i class="append material-icons">${appendIcon}</i>`;
    };
    this.innerHTML =
    `<div class="custom-formfield">
      <div class="input-container">
        <label for="${this.getAttribute('name')}">${this.getAttribute('label')}
        </label>
        <input 
            type="${this.getAttribute('type') || 'text'}"
            value="${this.getAttribute('value') || ''}" 
            placeholder="${this.getAttribute('placeholder') || ''}" 
            name="${this.getAttribute('name')}"></input>
        </div>        
      ${icon}
    </div>`;
  }
}

class SelectField extends HTMLElement {
    /**
   * @class SelectField
   * @extends HTMLElement
   * 
   * @description 
   * HTMLElement for styled input fields in html forms.
   * Accepts attributes:
   * options - an array of a JSON of and array of strings
   * name - name of the form field
   * label - text for the label
   */
  constructor() {
    super();

    let options = '';
    const providedOptions = JSON.parse(this.getAttribute('options'));
    if (Array.isArray(providedOptions)) {
      for (let i = 0; i < providedOptions.length; i++) {
        options += `<option value=${i}>${providedOptions[i]}</option>`;
      }
    }
    this.innerHTML =
    `<div class="custom-formfield custom-formfield--select">
      <div class="input-container input-container--select">
        <label for="${this.getAttribute('name')}">${this.getAttribute('label')}
        </label>
        <div class="select-container">
          <select 
            name="${this.getAttribute('name')}"
            value="0">
            ${options}
          </select>
        </div>
      </div>        
    </div>`;
  }
}
customElements.define('text-field', TextField);
customElements.define('select-field', SelectField);