import { Observer } from './Observer';
import { noop } from './utilities';

export class Subscription {
  constructor (callback, observer) {
    this.dispose = noop;
    
    this.observer = new Observer(observer);
    
    this.observer.use(callback);
  }
  
  unsubscribe () {
    this.observer.cleanup();
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
}
