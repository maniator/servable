import { Subscription } from './Subscription';
import { noop } from './utilities';

/**
 * @todo better performant way to remove subscriptions that are complete from the loop
 */
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
  
  next (...args) {
    if (this.subscriptionList) {
      this.subscriptionList.forEach((subscription) => {
        if (!subscription.isComplete) {
          subscription.next(...args);
        }
      });
    }
  }
  
  error (...errors) {
    if (this.subscriptionList) {
      this.subscriptionList.forEach((subscription) => {
        if (!subscription.isComplete) {
          subscription.error(...errors);
        }
      });
    }
  }
  
  complete () {
    if (this.subscriptionList) {
      this.subscriptionList.forEach((subscription) => {
        if (!subscription.isComplete) {
          subscription.complete();
        }
      });
    }
  }
}
