import { Subscription } from './Subscription';
import { noop } from './utilities';

/**
 *
 * @param {Function} observerCallback
 */
export class Observable {
  constructor (observerCallback) {
    this.observerCallback = observerCallback;
  }
  
  static create (observerCallback) {
    return new Observable(observerCallback);
  }

  /**
   *
   * @param {Function} [next]
   * @param {Function} [error]
   * @param {Function} [complete]
   * @returns {Subscription}
   */
  subscribe (next = noop, error = noop, complete = noop) {
    return new Subscription(this.observerCallback, { next, error, complete });
  }
}
