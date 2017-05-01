const { Observable } = Servable;

const countObservable$ = Observable.interval(1000, 1);

const countSubscription = countObservable$
  .do((value) => {
    if (value > 10) {
      console.log('Value is greater than 10, so unsubscribe');
      countSubscription.unsubscribe();
    }
  })
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

// test event binding
const inputObservable$ = Observable.fromEvent('input', document.getElementById('myInput'));
const div = document.getElementById('myText');

inputObservable$
  .map((event, element) => element.value)
  .map((text) => text.split('').reverse().join(''))
  .do((text) => div.textContent = text)
  .subscribe();
