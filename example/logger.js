function Logger (element) {
  this.element = element;
}

Logger.prototype = window.console;

Logger.prototype.log = function () {
  const preTag = document.createElement('pre');
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

window.logger = new Logger(document.getElementById('log'));

window.console = window.logger;