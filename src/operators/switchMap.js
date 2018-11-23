import { Observable } from '../Observable';
import { passThroughNextObservable } from './passThroughNextObservable';

/**
 * The value from the mapCallback is an observable and if another value comes through the previous observable is cancelled
 * <br />
 * This is useful for things like typeaheads where you dont want a request for every keypress
 *
 * @param {Observable} source$
 * @param {Function} mapCallback
 * @returns {Observable}
 */
export const switchMap = function (source$, mapCallback) {
  return new Observable((observer) => {
    let currentSubscription;
    let nextSubscription;
  
    currentSubscription = passThroughNextObservable(source$, mapCallback)
      .subscribe((nextValue$) => {
        // unsubscribe to the previous subscription if a new value comes in
        if (nextSubscription) {
          nextSubscription.unsubscribe();
        }
  
        nextSubscription = nextValue$.subscribe((value) => {
          observer.next(value);
        }, observer.error, observer.complete);
      }, observer.error, observer.complete);
    
    return () => {
      if (nextSubscription) {
        nextSubscription.unsubscribe();
      }
      currentSubscription.unsubscribe();
    };
  });
};

Observable.switchMap = switchMap;
Observable.prototype.switchMap = function (mapCallback) {
  return switchMap(this, mapCallback);
};
