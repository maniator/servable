import { Observable } from '../Observable';

/**
 * Takes an average of everything coming into the event stream until it completes
 *
 * @param {Observable} source$
 * @returns {Observable}
 */
export const average = function (source$) {
  return new Observable(function ({ next, error, complete }) {
    let count = 0;
    let total = 0;
    
    const subscription = source$.subscribe({
      next(value) {
        count++;
        total += value;
      },
      error,
      complete () {
        next(total / count);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.average = average;
Observable.prototype.average = function () {
  return average(this);
};
