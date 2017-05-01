const noop = () => {};

export class Subscription {
  constructor (callback, observer) {
    this.isComplete = false;
    this.dispose = noop;
    
    this.observer = this.wrapObserver(observer);
    
    this.callWithObserver(callback);
  }
  
  unsubscribe () {
    this.catchErrors(() => {
      this.dispose();
  
      this.isComplete = true;
      this.observer.next = noop;
      this.observer.error = noop;
      this.observer.complete = noop;
    })();
  }
  
  catchErrors (callback) {
    return (...args) => {
      try {
        callback(...args);
      } catch (errors) {
        this.observer.error(errors);
      }
    };
  }
  
  wrapObserver (observer) {
    let { next = noop, error = noop, complete = noop } = observer;
    
    // assumes that an object was passed as first value to subscription
    if (next.next || next.error || next.complete) {
      return this.wrapObserver(next);
    }
    
    const returnObserver = {};
    
    returnObserver.next = this.catchErrors((...args) => {
      if (!this.isComplete) {
        next(...args);
      } else {
        // overwrite the next so it cannot run again if complete
        next = noop;
      }
    });
  
    returnObserver.error = this.catchErrors((...errors) => {
      if (!this.isComplete) {
        error(...errors);
      } else {
        // overwrite the error so it cannot run again if complete
        error = noop;
      }
    });
    
    returnObserver.complete = this.catchErrors(() => {
      if (!this.isComplete) {
        this.unsubscribe();
        complete();
      }
      
      // overwrite the complete so it doesnt run again
      complete = noop;
      this.isComplete = true;
    });
    
    return returnObserver;
  }
  
  callWithObserver (callback) {
    this.catchErrors(() => {
      const response = callback(this.observer);
  
      if (typeof response === 'function') {
        this.dispose = response;
      }
    })();
  }
}

export class Observable {
  constructor (observerCallback) {
    this.observerCallback = observerCallback;
  }
  
  subscribe (next = noop, error = noop, complete = noop) {
    return new Subscription(this.observerCallback, { next, error, complete });
  }
}
