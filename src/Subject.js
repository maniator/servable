import {Subscription} from './Subscription';

export class Subject {
  constructor () {
    this.next = this.next.bind(this);
    this.error = this.error.bind(this);
    this.complete = this.complete.bind(this);
    
    this.observers = [];
  }
  
  subscribe (observer) {
    const subscription = Subscription.createSimple(observer);
    
    this.observers.push(subscription.observer);
    
    return subscription;
  }
  
  unsubscribe () {
    this
      .cleanup((observer) => {
        observer.cleanup();
        
        return false;
      });
  }
  
  cleanup (callback) {
    this.observers = this.observers.filter((observer) => {
      if (!observer.isComplete) {
        const ret = callback(observer);
        
        if (typeof ret === 'boolean') {
          return ret;
        }
        
        return true;
      }
      
      return false;
    });
    
    return this;
  }
  
  next (value) {
    this.cleanup((observer) => {
        observer.onNext(value);
    });
  }
  
  error (...errors) {
    this.cleanup((observer) => {
      observer.onError(...errors);
    });
  }
  
  complete () {
    this.cleanup((observer) => {
      observer.onComplete();
    });
  }
}
