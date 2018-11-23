import { Observable } from '../Observable';
import { reduce } from './reduce';

/**
 * Sums all the values of an observable upon completion
 *
 * @param {Observable} source$
 */
export const sum = function (source$) {
  return reduce(source$, (a, b) => a + b);
};

Observable.sum = sum;
Observable.prototype.sum = function () {
  return sum(this);
};
