import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

/**
 * Will map each value to a new value using the callback
 *
 * @param {Observable} source$
 * @param {Function} mapCallback
 * @returns {Observable}
 */
export const map = function (source$, mapCallback) {
  return passThroughNext(source$, function ({ next }, value) {
    next(mapCallback(value));
  });
};

Observable.map = map;
Observable.prototype.map = function (mapCallback) {
  return map(this, mapCallback);
};
