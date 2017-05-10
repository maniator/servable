import { Observable } from '../Observable';
import { passThroughNextObservable } from './passThroughNextObservable';

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
