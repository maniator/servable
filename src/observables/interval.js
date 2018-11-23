import { Observable } from '../Observable';

/**
 * Creates an interval that will count on every interval tick
 *
 * @param {Number} time in milliseconds to output the interval count
 * @param {Number} [start] number to start the interval count at
 * @returns {Observable}
 */
export const interval = function (time, start = 0) {
  return new Observable(function ({ next }) {
    let count = start;
    const id = setInterval(function () {
      const nextNumber = count++;
      
      next(nextNumber);
    }, time);
    
    return () => clearInterval(id);
  });
};

Observable.interval = interval;
