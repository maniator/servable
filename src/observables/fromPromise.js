import { Observable } from '../Observable';

export const fromPromise = function (promise) {
  return new Observable(function ({ next, complete, error }) {
    if (promise instanceof Promise) {
      promise.then(function (...values) {
        next(...values);
        complete();
      }, error);
    } else {
      error('Passed an invalid object to fromPromise', promise);
    }
  });
};

Observable.fromPromise = fromPromise;
