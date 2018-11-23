import { Observable } from '../Observable';
import { isPromise } from '../utilities';

/**
 * Turns a promise into an observable that emits the value of the promise and then completes
 *
 * @param {Promise} promise
 * @returns {Observable}
 */
export const fromPromise = function (promise) {
  return new Observable(function ({ next, complete, error }) {
    if (isPromise(promise)) {
      promise.then(function (values) {
        next(values);
        complete();
      }, error).catch(error);
    } else {
      error('Passed an invalid object to fromPromise', promise);
    }
  });
};

Observable.fromPromise = fromPromise;
