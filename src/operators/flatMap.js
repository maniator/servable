import { Observable } from '../Observable';
import { passThroughNextObservable } from './passThroughNextObservable';
import { onSubscriptionsComplete } from '../utilities/onSubscriptionsComplete';

/**
 * Same as `map(obs$, mapCallback)` but will take the value of the callback and turn it from an observable to a value
 *
 * @param {Observable} source$
 * @param {Function} mapCallback
 * @returns {Observable}
 */
export const flatMap = function (source$, mapCallback) {
  return new Observable((observer) => {
    let subscription = { isComplete: false };
    const nextSubscriptionList = [];
    const onComplete = () => onSubscriptionsComplete(
      [subscription, ...nextSubscriptionList],
      observer.complete
    );
    
    subscription = passThroughNextObservable(source$, mapCallback)
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

Observable.flatMap = flatMap;
Observable.prototype.flatMap = function (mapCallback) {
  return flatMap(this, mapCallback);
};
