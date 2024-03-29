import { Observable } from '../Observable';

/**
 * Concatenate any number of observables together
 * 
 * @memberof operators
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

Observable.concat = concat;
Observable.prototype.concat = function (...args$) {
  return concat(this, ...args$);
};
