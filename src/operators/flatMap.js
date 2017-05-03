import { Observable } from '../Observable';
import { isObservable } from '../utilities';
import '../observables/of';
import './map';

export const flatMap = function (source$, mapCallback) {
  return new Observable((observer) => {
    let subscription = { isComplete: false };
    const nextSubscriptionList = [];
    const onComplete = () => {
      const nextComplete = nextSubscriptionList.reduce(
        (curr, sub) => curr && sub.isComplete,
        true
      );
      
      if (subscription.complete && nextComplete) {
        observer.complete();
      }
    };
    
    subscription = source$
      .map(mapCallback)
      .map((nextValue) => {
        let nextValue$ = nextValue;
    
        if (!isObservable(nextValue$)) {
          nextValue$ = Observable.of(nextValue$);
        }
    
        return nextValue$
      })
      .subscribe((nextValue$) => {
        const nextSubscription = nextValue$.subscribe(
          observer.next,
          observer.error,
          onComplete
        );
        
        nextSubscriptionList.push(nextSubscription);
      }, observer.error, onComplete);
    
    return () => {
      nextSubscriptionList.forEach((nextSub) => nextSub.unsubscribe());
      subscription.unsubscribe();
    };
  });
};

Observable.prototype.flatMap = function (mapCallback) {
  return flatMap(this, mapCallback);
};
