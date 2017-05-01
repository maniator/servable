const { Observable } = Servable;

const countObservable$ = new Observable(function ({ next, error, complete }) {
  let number = 0;
  
  const runNext = function () {
    next(number+=1);
    
    if (number < 5) {
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
  
  error (errors) {
    console.warn('I HAVE ERRORS', errors)
  },
  
  complete () {
    console.log('I AM COMPLETE');
  }
});