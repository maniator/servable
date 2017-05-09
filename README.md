# servable

Servable is an implementation of a "simple" observable

## To install run:

```
npm i servable --save
```

---------

It can be used like so:

```
const Observable = require('servable').Observable;

const countObservable$ = Observable.interval(1000, 1);

const countSubscription = countObservable$
  .take(10)
  .map((n) => n * 5)
  .filter((n) => n > 10)
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
```    

This will log out to the console (if subscribe like above is called):
```
NEXT NUMBER:  15
NEXT NUMBER:  20 // after a 1 second delay
NEXT NUMBER:  25 // after a 1 second delay
NEXT NUMBER:  30 // after a 1 second delay
NEXT NUMBER:  35 // after a 1 second delay
NEXT NUMBER:  40 // after a 1 second delay
NEXT NUMBER:  45 // after a 1 second delay
NEXT NUMBER:  50 // after a 1 second delay
I AM COMPLETE // same time as previous line
```

### There a few plugins that are available - each return a new Observable instance

- [Documentation on the plugin operators can be seen here](./src/operators/DOCUMENTATION.md)

### There are also a few Observables that can be created from the Observable object itself

- [Documentation on the observables can be seen here](./src/observables/DOCUMENTATION.md)
