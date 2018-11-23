import { Observable } from '../Observable';

/**
 * Will result in the maximum value passed to the observer then will complete
 *
 * @param {Observable} source$
 * @returns {Observable}
 */
export const max = function (source$) {
  return new Observable(function ({ next, error, complete }) {
    let maxNumber;
    const subscription = source$.subscribe({
      next(value) {
        if (!maxNumber || value > maxNumber) {
          maxNumber = value;
        }
      },
      error,
      complete () {
        next(maxNumber);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.max = max;
Observable.prototype.max = function () {
  return max(this);
};
