// const inputObservable$ = new Observable(({next}) => {
//   setTimeout(() => {
//     const max = 10;
//     let i = 0;
//
//     while (i <= max) {
//       next(++i);
//     }
//   }, 100)
// });

const inputObservable$ =
  Observable.fromEvent(document.getElementById('myInput'), 'input')
    .map((event) => ({
      value: event.target.value,
      id: event.target.value,
    }))
    .map(({value}) => value);
const inputObservable2$ =
  Observable.fromEvent(document.getElementById('mySecondInput'), 'input')
    .map((event) => ({
      value: event.target.value,
      id: event.target.value,
    }))
    .map(({value}) => value);

Observable.combineLatest(
  inputObservable$,
  inputObservable2$,
  (a, b) => [a, b]
).filter(([valueA, valueB]) => valueA === valueB)
.subscribe({
  next([value]) {
    console.log(`Values are equal to ${value}`);
  }
});

