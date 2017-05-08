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
  
  get next () {
    return this.observer.next;
  }
  
  get error () {
    return this.observer.error;
  }
  
  get complete () {
    return this.observer.complete;
  }
}
