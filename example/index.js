const { Observable } = Servable;

const countObservable$ = Observable.interval(1000, 1).take(4);
const countObservable2$ = Observable.interval(500, 5);

const countSubscription =
  Observable.zip([
    countObservable$,
    countObservable2$.take(7),
    countObservable$,
    countObservable2$.take(7),
  ])
// countObservable2$.take(5)
  .subscribe({
    next (number) {
      console.log('NEXT NUMBER: ', number);
    },

    error (errors) {
      console.warn('I HAVE ERRORS', errors)
    },

    complete () {
      console.trace('I AM COMPLETE');
    }
  });

// test event binding
const inputObservable$ = Observable.fromEvent('input', document.getElementById('myInput'), (event) => event.currentTarget.value);
const divReverse = document.getElementById('myTextReverse');
const div = document.getElementById('myText');

console.log(inputObservable$);

inputObservable$
  .map((text) => text.split('').reverse().join(''))
  .do((text) => divReverse.textContent = text)
  .subscribe();

inputObservable$
  .do((text) => div.textContent = text)
  .subscribe();

Observable
  .ajax('../package.json')
  .do(console.log.bind(console.log, 'response'))
  .flatMap(response => Observable.fromPromise(response.json()))
  .do(console.log.bind(console.log, 'value'))
  .subscribe({
    next: (value) => console.log(value),
    error: (e) => console.warn('ERROR', e, e.response)
  });
