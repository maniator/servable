import { Observable } from '../Observable';

/**
 * Output a range of numbers to an Observable stream
 *
 * @param {Number} [start]
 * @param {Number} end
 * @returns {Observable}
 */
export const range = function ({ start = 0, end } = {}) {
  return new Observable(function ({ next, complete }) {
    for (let current = start; current <= end; ++current) {
      next(current);
    }
  
    complete();
  });
};

Observable.range = range;
