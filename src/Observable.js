import { Subscription } from './Subscription';

const noop = () => {};

export class Observable {
  constructor (observerCallback) {
    this.observerCallback = observerCallback;
  }
  
  subscribe (next = noop, error = noop, complete = noop) {
    return new Subscription(this.observerCallback, { next, error, complete });
  }
}
