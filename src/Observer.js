import { noop } from './utilities';

export class Observer {
  constructor (observer = {}) {
    this.isComplete = false;
    this.dispose = noop;
    
    this.setupObserver(observer);
  }
  
  cleanup () {
    this.catchErrors(() => {
      this.dispose();
  
      this.onNext = noop;
      this.onError = noop;
      this.onComplete = noop;
      this.dispose = noop;
      
      this.isComplete = true;
    })();
  }
  
  catchErrors (callback) {
    return (...args) => {
      try {
        return callback(...args);
      } catch (errors) {
        this.onError(errors);
      }
    };
  }
  
  use (callback) {
    this.catchErrors(() => {
      const response = callback({
        next: (...args) => this.onNext(...args),
        error: (...errors) => this.onError(...errors),
        complete: () => this.onComplete(),
      });
      
      if (typeof response === 'function') {
        this.dispose = response;
      } else {
        this.dispose = noop;
      }
    })();
  }
  
  setupObserver ({ next = noop, error = noop, complete = noop }) {
    // assumes that an object was passed as first value to subscription
    if (typeof next !== 'function' && typeof next === 'object') {
      return this.setupObserver(next);
    }
  
    this.onNext = this.catchErrors((...args) => {
      if (this.isComplete) {
        // overwrite the next so it cannot run again if complete
        next = noop;
      }
      
      return next(...args);
    });
  
    this.onError = (...errors) => {
      if (this.isComplete) {
        // overwrite the error so it cannot run again if complete
        error = noop;
      }
      
      return error(...errors);
    };
  
    this.onComplete = this.catchErrors(() => {
      if (this.isComplete) {
        // overwrite the complete so it doesnt run again
        complete = noop;
        this.isComplete = true;
      } else {
        this.cleanup();
      }
      
      return complete();
    });
  
    return this;
  }
}
