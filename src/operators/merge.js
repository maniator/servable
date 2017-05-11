import { Observable } from '../Observable';

export const merge = function (sources$) {
  return new Observable(function ({ next, error, complete }) {
    let subscriptions = [];
    
    const onComplete = () => {
      const allComplete = subscriptions.filter((s) => !s.isComplete).length <= 0;
      
      if (allComplete) {
        complete();
      }
    };
    
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
