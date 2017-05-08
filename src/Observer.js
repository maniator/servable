import { noop } from './utilities';

export class Observer {
  constructor (observer) {
    this.isComplete = false;
    
    this.setupObserver(observer);
  }
  
  cleanup () {
    this.onNext = noop;
    this.onError = noop;
    this.onComplete = noop;
  }
  
  catchErrors (callback) {
    return (...args) => {
      try {
        callback(...args);
      } catch (errors) {
        this.onError(errors);
      }
    };
  }
  
  setComplete () {
    this.isComplete = true;
  }
  
  setupObserver ({ next = noop, error = noop, complete = noop }) {
    // assumes that an object was passed as first value to subscription
    if (typeof next !== 'function') {
      return this.setupObserver(next);
    }
  
    this.onNext = this.catchErrors((...args) => {
      if (!this.isComplete) {
        next(...args);
      } else {
        // overwrite the next so it cannot run again if complete
        next = noop;
      }
    });
  
    this.onError = (...errors) => {
      if (!this.isComplete) {
        error(...errors);
      } else {
        // overwrite the error so it cannot run again if complete
        error = noop;
      }
    };
  
    this.onComplete = this.catchErrors(() => {
      if (!this.isComplete) {
        this.cleanup();
        complete();
      }
    
      // overwrite the complete so it doesnt run again
      complete = noop;
      this.isComplete = true;
    });
  
    return this;
  }
  
  get next () {
    return this.onNext;
  }
  
  get error () {
    return this.onError;
  }
  
  get complete () {
    return this.onComplete;
  }
}