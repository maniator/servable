import { Observable } from '../Observable';

/**
 * Concatenate any number of observables together
 *
 * @param {Observable} source$
 * @param {Observable} nextSource$
 * @param {Observable[]} otherSources$
 * @returns {Observable}
 */
export const concat = function (source$, nextSource$, ...otherSources$) {
  return new Observable(function ({ next, error, complete }) {
    let innerSubscription;
    const completeSubscription = () => {
      if (nextSource$ && otherSources$.length) {
        innerSubscription = concat(nextSource$, ...otherSources$).subscribe({
          next,
          error,
          complete,
        });
      } else if (nextSource$) {
        innerSubscription = nextSource$.subscribe({
          next,
          error,
          complete,
        });
      } else {
        complete();
      }
    };
    const subscription = source$.subscribe({
      next,
      error,
      complete () {
        completeSubscription();
      }
    });
    
    return () => {
      if (innerSubscription) {
        innerSubscription.unsubscribe();
      }
      
      subscription.unsubscribe();
    };
  });
};

/**
 * @type {function(Observable, Observable, ...[Observable[]]): Observable}
 */
Observable.concat = concat;

/**
 * Concatenate any number of observables to this observable
 * @param {Observable[]} args$
 * @returns {Observable}
 */
Observable.prototype.concat = function (...args$) {
  return concat(this, ...args$);
};
