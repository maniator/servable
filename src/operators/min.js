import { Observable } from '../Observable';

/**
 * Will result in the minimum value passed to the observer then will complete
 * 
 * @memberof operators
 *
 * @param source$
 * @returns {Observable}
 */
export const min = function (source$) {
  return new Observable(function ({ next, error, complete }) {
    let minNumber;
    const subscription = source$.subscribe({
      next(value) {
        if (!minNumber || value < minNumber) {
          minNumber = value;
        }
      },
      error,
      complete () {
        next(minNumber);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.min = min;
Observable.prototype.min = function () {
  return min(this);
};
