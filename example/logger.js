export class Logger {
  constructor (elementSelector = '#log', logger = console) {
    this.elementSelector = elementSelector;
    this.logger = logger;
  }

  get element () {
    if (!this._element) {
      this._element = document.querySelector(this.elementSelector);
    }

    return this._element;
  }

  log(...args) {
    const preTag = document.createElement('pre');
  
    this.logger.log.apply(this.logger, args);
  
    if (!this.element) {
      this.logger.error.call(this.logger, 'No element set', this.element)
    }
  
    this.element.appendChild(preTag);
  
    preTag.textContent = Array.from(args).map((arg) => JSON.stringify(arg, null, 2)).join(', ');
  
    preTag.classList.add('bg-info');
    preTag.style.maxHeight = '25vh';
  
    return preTag;
  }

  warn(...args) {
    const preTag = this.log(...args);
  
    preTag.classList.add('bg-warning');
  }

  error(...args) {
    const preTag = this.log(...args);
  
    preTag.classList.add('bg-danger');
  }
}

export const logger = new Logger();
