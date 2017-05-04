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

### There a few plugins that are available - each return a new Observable instance:

- They are called by doing: `observableInstance$.<pluginFunction>`

`.map(<mapCallback>)` 

 - will map each value to a new value using the callback
    
`.filter(<filterCallback>)` 

- will filter out values that you do not want to subscribe to
    
`.do(<doCallback>)`

- will run some callback before passing the current value to the subscription
    
`.take(<amount>[, <callback>])` 

- will take the amount of values you want (or less if it completes first) and then complete -- this is useful for infinitely running observables
- a callback may be passed to filter out the valeus you want to take
    
`.first([<callback>])` 

 - this is an alias for `.take(1[, <callback>])`
 
 `.toPromise()`
 
 - this will do a `.first()` on the observable object and return the value from that to the response from a promise
 
 `.flatMap(<mapCallback>)`
 
 - same as `.map(<mapCallback>)` but will take the value of the callback and turn it from an observable to a value
 
 `.switchMap(<mapCallback>)`
 
 - the value from the mapCallback is an observable and if another value comes through the previous observable is cancelled
    - this is useful for things like typeaheads where you dont want a request for every keypress
    
`.delay(<time>)`

- will delay output from the observable until a specific time interval has passed

`.debounceTime(<time>)`

- will only output values if there has not been any new values in the past time interval passed

### There are also a few Observables that can be created from the Observable object itself:

- They are called by doing: `Observable.<observableFunction>`

`.fromEvent(<eventName>, <element>[, <mapCallback>)`

- will create an observable that will listen for an event on a DOM element
- there is also an optional mappCallback that can be used to map the event that comes through the next observer function

`.fromPromise(<promise>)`

- turns a promise into an observable that emits the value of the promise and then completes

`.interval(<time>[, <start = 0>])`

- emits a number at the specified time interval and increases by one every time
- there is an optional start value that can be passed

`.of(<...values>)`

- takes any number of arguments and emits them in an observable (in order) and then completes

`.range(<start>[, <end>])`

- emits a range of numbers from start to end and then completes
- if only start is given than the range starts at 0 and ends at the start value
