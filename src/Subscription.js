import { Observer } from './Observer';
import { noop } from './utilities';

export class Subscription {
  constructor (callback = noop, observer = {}) {
    this.observer = new Observer(observer);
    
    this.observer.use(callback);
  }
  
  static createSimple (observer) {
    return new Subscription(noop, observer);
  }
  
  unsubscribe () {
    this.observer.cleanup();
  }
  
  get isComplete () {
    return this.observer.isComplete;
  }
  
  get onNext () {
    return this.observer.onNext;
  }
  
  get onError () {
    return this.observer.onError;
  }
  
  get onComplete () {
    return this.observer.onComplete;
  }
}
