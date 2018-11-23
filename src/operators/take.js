import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

/**
 * Takes a number of values that satisfy the `filterCallback` then completes
 *
 * @param {Observable} source$
 * @param {Number} amount
 * @param {Function} [filterCallback]
 * @returns {Observable}
 */
export const take = function (source$, amount, filterCallback = () => true) {
  return new Observable (function (observer) {
    const taken = [];
    
    const subscription = passThroughNext(source$, function ({ next, complete }, value) {
      const isComplete = taken.length === amount;
    
      if (!isComplete && filterCallback(value)) {
        taken.push(value);
        next(value);
      }
    
      if (isComplete) {
        complete();
      }
    }).subscribe(observer);
    
    return () => subscription.unsubscribe();
  });
};

Observable.take = take;
Observable.prototype.take = function (amount, filterCallback) {
  return take(this, amount, filterCallback);
};
