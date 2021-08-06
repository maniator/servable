import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

/**
 * Will filter out values that you do not want to subscribe to
 * 
 * @memberof operators
 *
 * @param {Observable} source$
 * @param {Function} filterCallback
 * @returns {Observable}
 */
export const filter = function (source$, filterCallback) {
  return passThroughNext(source$, function ({ next }, value) {
    if(filterCallback(value)) {
      next(value);
    }
  });
};

Observable.filter = filter;
Observable.prototype.filter = function (filterCallback) {
  return filter(this, filterCallback);
};
