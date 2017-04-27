const noop = () => {};

class Observable {
  constructor (observerCallback) {
    this.observerCallback = observerCallback;
  }
  
  subscribe (next = noop, error = noop, complete = noop) {
    let isComplete = false;
    const observer = {
      next,
      error,
      complete,
    };
    
    let dispose = noop;
    
    const unsubscribe = () => {
      observer.next = noop;
      observer.error = noop;
      observer.complete = noop;
      
      dispose();
      
      console.log('Unsubscribed', observer);
    };
    
    observer.next = (...args) => {
      if (!isComplete) {
        next(...args);
      }
    };
    
    observer.error = (...args) => {
      error(...args);
      unsubscribe();
    };
    
    observer.complete = () => {
      if (!isComplete) {
        complete();
        unsubscribe();
      }
      
      isComplete = true;
    };
    
    try {
      const disposable = this.observerCallback.bind(this, observer)();
      
      if (typeof disposable === 'function') {
        dispose = disposable;
      }
    } catch (e) {
      error(e);
    }
    
    return unsubscribe;
  }
}


// "simple" observable
const inputObservable$ = new Observable(function ({ next, error, complete }) {
  const input = document.querySelector('#myInput');
  const listener = function () {
    next(input.value);
  
    if (input.value === 'Hello') {
      complete();
    }
  };
  
  input.addEventListener('input', listener, false);
  
  return () => input.removeEventListener('input', listener, false);
});

inputObservable$.subscribe(
  function onNext (value) {
    console.log('Input value', value);
  },
  function onError (error) {
    console.error('Caught (in cb): ', error);
  },
  function onComplete () {
    console.log('I am complete');
  }
);
