import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

/**
 * Debounces values that will be sent down the stream.
 * Will only output values if there has not been any new values in the past time interval passed
 *
 * @param {Observable} source$
 * @param {Number} time amount of time in milliseconds
 * @returns {Observable}
 */
export const debounceTime = function (source$, time) {
  return new Observable(function (observer) {
    let timerId;
    
    const subscription = passThroughNext(source$, function ({ next }, value) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        next(value);
      }, time);
    }, function () {
      clearTimeout(timerId);
    }).subscribe(observer);
    
    return () => subscription.unsubscribe();
  });
};

Observable.debounceTime = debounceTime;
Observable.prototype.debounceTime = function (time) {
  return debounceTime(this, time);
};
