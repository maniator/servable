const map = (source, mapCallback) => {
  return new Observable(function ({ next, error, complete }) {
    source.subscribe(
      (...args) => next(mapCallback(...args)),
      error,
      complete,
    )
  });
};

Observable.prototype.map = function (mapCallback) {
  return map(this, mapCallback);
};
