const noop = () => {};

export class Observable {
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
