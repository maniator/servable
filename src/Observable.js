import { Subscription } from './Subscription';
import { noop } from './utilities';

/**
 * Creates a new Observable
 * @param {Function} observerCallback
 *
 * @example
 * const obs$ = new Observable((observer) => {
 *   for (let i = 0; i < 10; ++i) {
 *     observer.next(i);
 *   }
 *
 *   observer.complete();
 * });
 *
 * @example
 * const obs$ = Observable.create((observer) => {
 *   for (let i = 0; i < 10; ++i) {
 *     observer.next(i);
 *   }
 *
 *   observer.complete();
 * });
 */
export class Observable {
  constructor (observerCallback) {
    this.observerCallback = observerCallback;
  }

  /**
   * @param {Function} observerCallback
   * @returns {Observable}
   */
  static create (observerCallback) {
    return new Observable(observerCallback);
  }

  /**
   * Subscribe to an observable stream
   *
   * @param {{ next: Function, error: Function, complete: Function }} next
   * @param {null} error
   * @param {null} complete
   * @returns {Subscription}
   *
   * @example
   * observable$.subscribe({
   *   next(value) {
   *     console.log('logs if next', value);
   *   },
   *   error() {
   *     console.log('logs if error');
   *   },
   *   complete() {
   *     console.log('logs if complete');
   *   }
   * });
   */
  /**
   *
   * @param {Function} [next]
   * @param {Function} [error]
   * @param {Function} [complete]
   * @returns {Subscription}
   *
   * @example
   * observable$.subscribe(
   *  (value) => console.log('logs if next', value),
   *  () => console.log('logs if error'),
   *  () => console.log('logs if complete')
   * );
   */
  subscribe (next = noop, error = noop, complete = noop) {
    return new Subscription(this.observerCallback, { next, error, complete });
  }
}
