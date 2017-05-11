const { Observable } = Servable;

const countObservable$ = Observable.interval(1000, 1);

const countSubscription =
  Observable.merge([
    countObservable$
      .take(10)
      .map((n) => n * 5)
      .filter((n) => n > 10),
    countObservable$.take(5).delay(100),
    countObservable$.take(10).map(v => v * 13).delay(200),
  ])
  .subscribe({
    next (number) {
      console.log('NEXT NUMBER: ', number);
    },

    error (errors) {
      console.warn('I HAVE ERRORS', errors)
    },

    complete () {
      console.log('I AM COMPLETE');
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
    error: (e) => console.warn(e, e.response)
  });
