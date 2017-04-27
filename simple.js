class Observable {
  constructor(observerCallback) {
    this.observerCallback = observerCallback;
  }
  
  subscribe(next = noop) {
    const observer = {
      next,
    };
    
    this.observerCallback(observer);
  }
}

// "simple" observable
const inputObservable$ = new Observable(function ({ next }) {
  const input = document.querySelector('#myInput');
  
  input.addEventListener('input', function () {
    next(input.value);
  }, false);
});

inputObservable$.subscribe(
  function (value) {
    console.log('Input value', value);
  }
);
