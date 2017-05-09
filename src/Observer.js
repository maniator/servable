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
    
    return this;
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
    return this.catchErrors(() => {
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
      
      return this.dispose;
    })();
  }
  
  setupObserver ({ next = noop, error = noop, complete = noop }) {
    // assumes that an object was passed as first value to subscription
    if (typeof next !== 'function' && typeof next === 'object') {
      return this.setupObserver(next);
    }
  
    this.onNext = this.catchErrors((...args) => {
      if (!this.isComplete) {
        return next(...args);
      }
    });
  
    this.onError = (...errors) => {
      if (!this.isComplete) {
        return error(...errors);
      }
    };
  
    this.onComplete = this.catchErrors(() => {
      if (!this.isComplete) {
        this.cleanup();
        return complete();
      }
    });
  
    return this;
  }
}
