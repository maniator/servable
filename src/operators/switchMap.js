import { Observable } from '../Observable';
import { isObservable } from '../utilities';
import '../observables/of';
import './map';

export const switchMap = function (source$, mapCallback) {
  return new Observable((observer) => {
    let currentSubscription;
    let nextSubscription;
  
    currentSubscription = source$
      .map(mapCallback)
      .map((nextValue) => {
        let nextValue$ = nextValue;
        
        if (!isObservable(nextValue$)) {
          nextValue$ = Observable.of(nextValue$);
        }
        
        return nextValue$
      })
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

Observable.prototype.switchMap = function (mapCallback) {
  return switchMap(this, mapCallback);
};
