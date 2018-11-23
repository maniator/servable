import { Observable } from '../Observable';
import { filter } from './filter';

/**
 * Counts the number of values coming into the stream on complete
 *
 * @param {Observable} source$
 * @param {Function} [countCallback] a function to use to filter out values that you do not wish to count
 * @returns {Observable}
 */
export const count = function (source$, countCallback = (value) => true) {
  return new Observable(function ({next, error, complete }) {
    let count = 0;
    const subscription = filter(source$, countCallback).subscribe({
      next () {
        count++;
      },
      error,
      complete () {
        next(count);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.count = count;
Observable.prototype.count = function (countCallback) {
  return count(this, countCallback);
};
