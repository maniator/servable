import { Observable } from '../Observable';

const nullHash = void(0);

export const combineLatest = function (source$, otherSource$, combineCallback = (x, y) => [x, y]) {
  return new Observable(function ({ next, error, complete }) {
    let sourceSubscription;
    let otherSubscription;
    
    let latest = [ nullHash, nullHash ];
    
    const onComplete = () => {
      if (sourceSubscription && otherSubscription) {
        if (sourceSubscription.isComplete && otherSubscription.isComplete) {
          complete();
        }
      }
    };
    
    const subscribeTo = (obs$, index, otherIndex) => {
      return obs$.subscribe({
        next (value) {
          latest[index] = value;
          
          if (latest[otherIndex] !== nullHash) {
            next(combineCallback(...latest));
          }
        },
        error,
        complete: onComplete,
      });
    };
    
    sourceSubscription = subscribeTo(source$, 0, 1);
    otherSubscription = subscribeTo(otherSource$, 1, 0);
    
    return () => {
      sourceSubscription.unsubscribe();
      otherSubscription.unsubscribe();
    };
  });
};

Observable.combineLatest = combineLatest;
Observable.prototype.combineLatest = function (otherSource$, combineCallback) {
  return combineLatest(this, otherSource$, combineCallback);
};
