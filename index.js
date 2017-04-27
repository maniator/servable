// "simple" observable
const inputObservable$ = new Observable(function ({ next, error, complete }) {
  const input = document.querySelector('#myInput');
  const listener = function () {
    next(input.value);
    
    if (input.value === 'Hello') {
      complete();
    }
  };
  
  input.addEventListener('input', listener, false);
  
  return () => input.removeEventListener('input', listener, false);
});

inputObservable$.subscribe(
  function onNext (value) {
    console.log('Input value', value);
  },
  function onError (error) {
    console.error('Caught (in cb): ', error);
  },
  function onComplete () {
    console.log('I am complete');
  }
);
