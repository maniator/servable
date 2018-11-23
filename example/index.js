const {Observable} = Servable;

const countObservable$ = Observable.interval(1000, 1).take(4);
const countObservable2$ = Observable.interval(500, 5);

Observable.zip([
  countObservable$,
  countObservable2$.take(7),
  countObservable$,
  countObservable2$.take(7),
]).subscribe({
  next(number) {
    console.log('Next numbers from countSubscription: ' + number);
  },

  error(errors) {
    console.warn('I HAVE ERRORS', errors)
  },

  complete() {
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

const ajaxCall$ = Observable
  .of('../package.json')
  .do(fileName => console.log('Request ' + fileName))
  .flatMap(fileName => Observable.ajax(fileName))
  .map(response => response.toJSON())
  .do(console.log.bind(console, 'Value of ./package.json: '));

const ajaxSubscription = ajaxCall$
  .subscribe({
    next: () => console.log('Finished request to ./package.json'),
    error: (e) => console.warn('ERROR', e, e.response)
  });

console.error('Cancel one request to package.json')
ajaxSubscription.unsubscribe();

ajaxCall$
  .subscribe({
    next: () => console.log('Finished request to ./package.json'),
    error: (e) => console.warn('ERROR', e, e.response)
  });
