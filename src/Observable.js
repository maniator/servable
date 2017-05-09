import { Subscription } from './Subscription';
import { noop } from './utilities';

export class Observable {
  constructor (observerCallback) {
    this.observerCallback = observerCallback;
  }
  
  static create (observerCallback) {
    return new Observable(observerCallback);
  }
  
  subscribe (next = noop, error = noop, complete = noop) {
    return new Subscription(this.observerCallback, { next, error, complete });
  }
}
