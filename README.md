# servable

Servable is an implementation of a "simple" observable

###To install run:

```
    npm i servable --save
```

---------

It can be used as following:

```
    const { Observable } = require('servable');
    
    const countObservable$ = new Observable(function ({ next, error, complete }) {
      let number = 0;
      
      const runNext = function () {
        next(number+=1);
        
        if (number < 10) {
          setTimeout(runNext, 1000);
        } else {
            complete();
        }
      };
      
      runNext();
      
      // can (optionally) return a function to run when the observer is unsubscribed to
      return function () {
        console.log('I AM UNSUBSCRIBED');
      };
    }); // function will not run until subscribed to
    
    const subscription = countObservable$.subscribe({
      next (number) {
        console.log('NEXT NUMBER: ', number);
      },
      
      complete () {
        console.log('I AM COMPLETE');
      }
    });
```    

This will log out to the console (if subscribe like above is called):
```
NEXT NUMBER:  1
NEXT NUMBER:  2 // after a 1 second delay
NEXT NUMBER:  3 // after a 1 second delay
NEXT NUMBER:  4 // after a 1 second delay
NEXT NUMBER:  5 // after a 1 second delay
NEXT NUMBER:  6 // after a 1 second delay
NEXT NUMBER:  7 // after a 1 second delay
NEXT NUMBER:  8 // after a 1 second delay
NEXT NUMBER:  9 // after a 1 second delay
NEXT NUMBER:  10 // after a 1 second delay
I AM UNSUBSCRIBED // same time as previous line
I AM COMPLETE // same time as previous line
```