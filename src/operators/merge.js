import { Observable } from '../Observable';
import { onSubscriptionsComplete } from '../utilities/onSubscriptionsComplete';

/**
 * Will merge any number of observables into one observable stream
 * 
 * @memberof operators
 *
 * @param {Observable[]} sources$
 * @returns {Observable}
 */
export const merge = function (sources$) {
  return new Observable(function ({ next, error, complete }) {
    let subscriptions = [];
    
    const onComplete = () => onSubscriptionsComplete(subscriptions, complete);
    const subscribeTo = (obs$) => {
      return obs$.subscribe({
        next,
        error,
        complete: onComplete,
      });
    };
  
    subscriptions = sources$.map((s$, index) => subscribeTo(s$, index));
    
    return () => subscriptions.forEach((s) => s.unsubscribe());
  });
};

Observable.merge = merge;
Observable.prototype.merge = function (otherSources$) {
  return merge([this, ...otherSources$]);
};
