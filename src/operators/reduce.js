import { Observable } from '../Observable';
import { scan } from './scan';

/**
 * _Sort of_ the same way that Array.reduce works, it will concatenate all of the values
 * passing through an Observable event stream with a given scanCallback
 *
 * @param {Observable} source$
 * @param {Function} scanCallback
 * @param {*} [startValue]
 * @returns {Observable}
 */
export const reduce = function (source$, scanCallback, startValue) {
  return new Observable(function ({next, error, complete }) {
    let lastValue = 0;
    const subscription = scan(source$, scanCallback, startValue).subscribe({
      next (value) {
        lastValue = value;
      },
      error,
      complete () {
        next(lastValue);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.reduce = reduce;
Observable.prototype.reduce = function (scanCallback, startValue) {
  return reduce(this, scanCallback, startValue);
};
