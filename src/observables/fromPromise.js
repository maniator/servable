import { Observable } from '../Observable';
import { isPromise } from '../utilities';

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
