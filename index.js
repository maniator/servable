const inputObservable$ = new Observable(({next}) => {
  setTimeout(() => {
    const max = 10;
    let i = 0;

    while (i <= max) {
      next(++i);
    }
  }, 100)
});

const inputObservable2$ =
  Observable.fromEvent(document.getElementById('myInput'), 'input')
    .map((event) => event.target.value);

const mappedObservable$ = inputObservable$
  .map((value) => value * 10)
  .take(3);

const unsubscribe = inputObservable2$
// .map((text) => text.split('').reverse().join(''))
  .filter((text) => text.match(/Hello/))
  .subscribe({
    next(value) {
      console.log('Input value', value);
    },
    complete() {
      console.log('I am complete');
    }
  });

// unsubscribe();
