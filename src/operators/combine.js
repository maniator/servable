import { Observable } from '../Observable';
import { onSubscriptionsComplete } from '../utilities/onSubscriptionsComplete';

const nullHash = void(0);

const argsCallback = function () { return Array.from(arguments); }
export const combine = function (sources$, combineCallback = argsCallback) {
  return new Observable(function ({ next, error, complete }) {
    let subscriptions = [];
    
    let latest = sources$.map(s$ => nullHash);
    
    let allHasValue = false;
    const checkAllHasValue = () => latest.filter((l) => l == nullHash).length <= 0;
    
    const onComplete = () => onSubscriptionsComplete(subscriptions, complete);
    const subscribeTo = (obs$, index) => {
      return obs$.subscribe({
        next (value) {
          latest[index] = value;
  
          allHasValue = allHasValue || checkAllHasValue();
          
          if (allHasValue) {
            next(combineCallback(...latest));
          }
        },
        error,
        complete: onComplete,
      });
    };
  
    subscriptions = sources$.map((s$, index) => subscribeTo(s$, index));
    
    return () => subscriptions.forEach((s) => s.unsubscribe());
  });
};

Observable.combine = combine;
Observable.prototype.combine = function (otherSources$, combineCallback) {
  return combine([this, ...otherSources$], combineCallback);
};
