import { Observer } from './Observer';
import { noop } from './utilities';

/**
 * @param {Function} callback
 * @param {{next: Function, error: Function, complete: Function}} observer
 */
export class Subscription {
  constructor (callback = noop, observer = {}) {
    this.observer = new Observer(observer);
    
    this.observer.use(callback);
  }
  
  static createSimple (observer) {
    return new Subscription(noop, observer);
  }

  /**
   * Unsubscribe to the event stream
   *
   * @returns {void}
   */
  unsubscribe () {
    this.observer.cleanup();
  }

  /**
   *
   * @returns {boolean}
   */
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
