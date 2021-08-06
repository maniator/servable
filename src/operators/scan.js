import { Observable } from '../Observable';

/**
 * @memberof operators
 * 
 * @param {Observable} source$
 * @param {Function} scanCallback
 * @param {*} [startValue]
 * @returns {Observable}
 */
export const scan = function (source$, scanCallback, startValue) {
  return new Observable(function ({ next, error, complete }) {
    let previousValue = startValue;
    
    const subscription = source$.subscribe({
      next (value) {
        previousValue = scanCallback(previousValue, value);
        
        next(previousValue);
      },
      error,
      complete
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.scan = scan;
Observable.prototype.scan = function (scanCallback, startValue) {
  return scan(this, scanCallback, startValue);
};
