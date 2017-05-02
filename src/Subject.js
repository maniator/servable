import { Subscription } from './Subscription';
import { noop } from './utilities';

export class Subject {
  constructor () {
    this.next = this.next.bind(this);
    this.error = this.error.bind(this);
    this.complete = this.complete.bind(this);
    
    this.subscriptionList = [];
  }
  
  subscribe (next = noop, error = noop, complete = noop) {
    const subscription = new Subscription(noop, {next, error, complete});
    
    this.subscriptionList.push(subscription);
    
    return subscription;
  }
  
  cleanup (callback) {
    this.subscriptionList = this.subscriptionList.filter((subscription) => {
      if (!subscription.isComplete) {
        callback(subscription);
        return true;
      }
      
      return false;
    });
  }
  
  next (...args) {
    this.cleanup((subscription) => {
        subscription.next(...args);
    });
  }
  
  error (...errors) {
    this.cleanup((subscription) => {
      subscription.error(...errors);
    });
  }
  
  complete () {
    this.cleanup((subscription) => {
      subscription.complete();
    });
  }
}
