import { Observable } from '../Observable';

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
