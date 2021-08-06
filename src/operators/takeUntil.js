import { Observable } from '../Observable';

/**
 * Takes values from the `source$` until the `takeSource$` emits one value
 * 
 * @memberof operators
 *
 * @param {Observable} source$
 * @param {Observable} takeSource$
 * @returns {Observable}
 */
export const takeUntil = function (source$, takeSource$) {
  return new Observable (function (observer) {
    const subscription = source$.subscribe(observer);
    const takeSubscription = takeSource$.subscribe(observer.complete, observer.error, observer.complete);
    
    return () => {
      takeSubscription.unsubscribe();
      subscription.unsubscribe();
    }
  });
};

Observable.takeUntil = takeUntil;
Observable.prototype.takeUntil = function (takeSource$) {
  return takeUntil(this, takeSource$);
};
