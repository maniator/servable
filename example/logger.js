function Logger (element) {
  this.element = element;
}

window.originalConsole = window.console;
Logger.prototype = Object.keys(window.originalConsole).reduce((memo, consoleFn) => ({
  ...memo,
  [`_${consoleFn}`]: typeof window.originalConsole[consoleFn] === 'function' ? window.originalConsole[consoleFn].bind(window.originalConsole) : window.originalConsole[consoleFn],
}), {});

Logger.prototype.log = function () {
  const preTag = document.createElement('pre');

  this._log.apply(this, arguments);

  if (!this.element) {
    this._error('No element set', this.element)
  }

  this.element.appendChild(preTag);

  preTag.textContent = Array.from(arguments).map((arg) => JSON.stringify(arg)).join(', ');

  preTag.classList.add('bg-info');

  return preTag;
};

Logger.prototype.warn = function () {
  const preTag = this.log.apply(this, arguments);

  preTag.classList.add('bg-warning');
};

Logger.prototype.error = function () {
  const preTag = this.log.apply(this, arguments);

  preTag.classList.add('bg-danger');
};

window.console = new Logger(document.getElementById('log'));
