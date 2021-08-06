import { Observable } from '../Observable';

/**
 * Takes any number of arguments and outputs them in order in an Observable stream
 * 
 * @memberof observables
 * 
 * @param {Array.<*>} args
 * @returns {Observable}
 */
export const of = function (...args) {
  return new Observable((observer) => {
    Array.from(args).forEach((value) => {
      observer.next(value);
    });
    
    observer.complete();
  });
};

Observable.of = of;
