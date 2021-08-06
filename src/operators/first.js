import { Observable } from '../Observable';
import { take } from './take';

/**
 * Will take the first value from the observable and then complete
 * This is an alias for `take(obs$, 1, callback)`
 * 
 * @memberof operators
 *
 * @param {Observable} source$
 * @param {Function} [filterCallback] filter out values before taking the first one
 */
export const first = function (source$, filterCallback) {
  return take(source$, 1, filterCallback);
};

Observable.first = first;
Observable.prototype.first = function (filterCallback) {
  return first(this, filterCallback);
};
