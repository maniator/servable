import { Observer } from './Observer';
import { noop } from './utilities';

export class Subscription {
  constructor (callback, observer) {
    this.dispose = noop;
    
    this.observer = new Observer(observer);
    
    this.callWithObserver(callback);
  }
  
  unsubscribe () {
    this.observer.catchErrors(() => {
      this.dispose();
      
      this.observer.cleanup();
      this.dispose = noop;
    })();
  }
  
  get isComplete () {
    return this.observer.isComplete;
  }
  
  next (...args) {
    return this.observer.next(...args);
  }
  
  error (...errors) {
    return this.observer.error(...errors);
  }
  
  complete () {
    return this.observer.complete();
  }
  
  callWithObserver (callback) {
    this.observer.catchErrors(() => {
      const response = callback(this.observer);
      
      if (typeof response === 'function') {
        this.dispose = response;
      }
    })();
  }
}
