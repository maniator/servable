import { Observable } from '../Observable';
import { onSubscriptionsComplete } from '../utilities/onSubscriptionsComplete';

const startIndex = {
  values: [],
  indexAt: -1,
};

const argsCallback = function () { return Array.from(arguments); }
export const zip = function (sources$, combineCallback = argsCallback) {
  return new Observable(function ({ next, error, complete }) {
    let subscriptions = [];
    
    let latest = sources$.map(s$ => JSON.parse(JSON.stringify(startIndex)));
    
    const checkAllHasValue = (index) => (
      latest.reduce((current, { values }) => {
        return current && Object.keys(values).includes(index + '');
      }, true)
    );
    const getValuesAtIndex = (index) => {
      return latest.map(({ values }) => {
        return values[index];
      });
    };
    
    const onComplete = () => onSubscriptionsComplete(subscriptions, complete);
    const subscribeTo = (obs$, index) => {
      return obs$.subscribe({
        next (value) {
          const currentIndex = latest[index];
          currentIndex.values.push(value);
          currentIndex.indexAt += 1;
  
          const allHasValue = checkAllHasValue(currentIndex.indexAt);
          
          if (allHasValue) {
            const values = getValuesAtIndex(currentIndex.indexAt);
            next(combineCallback(...values));
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

Observable.zip = zip;
Observable.prototype.zip = function (otherSources$, combineCallback) {
  return zip([this, ...otherSources$], combineCallback);
};
