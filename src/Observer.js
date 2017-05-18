import { noop } from './utilities';

export class Observer {
  constructor (observer = {}) {
    this.isComplete = false;
    this.dispose = noop;
    
    this.setupObserver(observer);
  }
  
  cleanup () {
    this.dispose();
  
    this.setupObserverObject = {
      next: noop,
      error: noop,
      complete: noop,
    };
    this.dispose = noop;
  
    this.isComplete = true;
    
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
    const callbackCatch = this.catchErrors(callback);
    const response = callbackCatch({
      next: (value) => this.onNext(value),
      error: (...errors) => this.onError(...errors),
      complete: () => this.onComplete(),
    });
    
    if (typeof response === 'function') {
      this.dispose = this.catchErrors(response);
    } else {
      this.dispose = noop;
    }
    
    return this.dispose;
  }
  
  onNext (value) {
    if (this.isComplete) {
      return null;
    }
    
    return this.setupObserverObject.next(value);
  }
  
  onError (...errors) {
    if (this.isComplete) {
      return null;
    }
  
    return this.setupObserverObject.error(...errors);
  }
  
  onComplete () {
    if (this.isComplete) {
      return null;
    }
    
    this.cleanup();
  
    return this.setupObserverObject.complete();
  }
  
  setupObserver (setupObserverObject = { next: noop, error: noop, complete: noop }) {
    // assumes that an object was passed as first value to subscription
    if (typeof setupObserverObject.next !== 'function' && typeof setupObserverObject.next === 'object') {
      return this.setupObserver(setupObserverObject.next);
    }
    
    const { next = noop, error = noop, complete = noop } = setupObserverObject;
    
    this.setupObserverObject = {
      next: this.catchErrors(next),
      error,
      complete: this.catchErrors(complete),
    };
  
    return this;
  }
}
