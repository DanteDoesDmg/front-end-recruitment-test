class TextField extends HTMLElement {
  constructor() {
    super();
    const appendIcon = this.getAttribute('append-icon')
    let icon = ``;
    if (appendIcon) {
      const url = this.getAttribute('icon-url')
      icon = url ?
        `<img class="append" src='${url}' ></img>` :
        `<i class="append material-icons">${appendIcon}</i>`
    }
    this.innerHTML = `<div class="custom-formfield">
            <div class="input-container">
            <label for="${this.getAttribute('name')}">${this.getAttribute('label')}</label>
            <input 
                type="text"
                value="${this.getAttribute('value') || ''}" 
                placeholder="${this.getAttribute('placeholder') || ''}" 
                name="${this.getAttribute('name')}"></input>
            </div>        
            ${icon}
        </div>`;
  }
}

class SelectField extends HTMLElement {
  constructor() {
    super();
    let options = ''
    const providedOptions = JSON.parse(this.getAttribute('options'))
    if (Array.isArray(providedOptions)) {
      for (let i = 0; i < providedOptions.length; i++) {
        options += `<option value=${i}>${providedOptions[i]}</option>`
      }
    }
    this.innerHTML = `<div class="custom-formfield custom-formfield--select">
      <div class="input-container input-container--select">
        <label for="${this.getAttribute('name')}">${this.getAttribute('label')}</label>
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
customElements.define('text-field', TextField)
customElements.define('select-field', SelectField)