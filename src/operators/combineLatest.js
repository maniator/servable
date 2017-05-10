import { Observable } from '../Observable';

const nullHash = void(0);

export const combineLatest = function (sources$, combineCallback = ((...args) => [...args])) {
  return new Observable(function ({ next, error, complete }) {
    let subscriptions = [];
    
    let latest = sources$.map(s$ => nullHash);
    
    let allHasValue = false;
    const checkAllHasValue = () => latest.filter((l) => l == nullHash).length <= 0;
    const onComplete = () => {
      const allComplete = subscriptions.filter((s) => !s.isComplete).length <= 0;
      
      if (allComplete) {
        complete();
      }
    };
    
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

Observable.combineLatest = combineLatest;
Observable.prototype.combineLatest = function (otherSources$, combineCallback) {
  return combineLatest([this, ...otherSources$], combineCallback);
};
