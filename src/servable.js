const noop = () => {};

export class Subscription {
  constructor (callback, observer) {
    this.isComplete = false;
    this.dispose = noop;
    
    this.observer = this.wrapObserver(observer);
    
    this.callWithObserver(callback);
  }
  
  unsubscribe () {
    this.dispose();
    
    this.isComplete = true;
    this.observer.next = noop;
    this.observer.error = noop;
    this.observer.complete = noop;
  }
  
  wrapObserver (observer) {
    let { next = noop, error = noop, complete = noop } = observer;
    
    // assumes that an object was passed as first value to subscription
    if (next.next || next.error || next.complete) {
      return this.wrapObserver(next);
    }
    
    const returnObserver = {};
    
    returnObserver.next = (...args) => {
      if (!this.isComplete) {
        next(...args);
      } else {
        // overwrite the next so it cannot run again if complete
        next = noop;
      }
    };
  
    returnObserver.error = (...errors) => {
      if (!this.isComplete) {
        error(...errors);
      } else {
        // overwrite the error so it cannot run again if complete
        error = noop;
      }
    };
    
    returnObserver.complete = () => {
      if (!this.isComplete) {
        this.unsubscribe();
        complete();
      }
      
      // overwrite the complete so it doesnt run again
      complete = noop;
      this.isComplete = true;
    };
    
    return returnObserver;
  }
  
  callWithObserver (callback) {
    try {
      const response = callback(this.observer);
      
      if (typeof response === 'function') {
        this.dispose = response;
      }
    } catch (error) {
      this.observer.error(error);
    }
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
