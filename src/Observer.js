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
    })();
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
}
