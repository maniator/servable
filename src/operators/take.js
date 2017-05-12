import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const take = function (source$, amount, filterCallback = () => true) {
  const taken = [];
  
  return passThroughNext(source$, function ({ next, complete }, value) {
    const isComplete = taken.length === amount;
  
    if (!isComplete && filterCallback(value)) {
      taken.push(value);
      next(value);
    }
  
    if (isComplete) {
      complete();
    }
  });
};

Observable.take = take;
Observable.prototype.take = function (amount, filterCallback) {
  return take(this, amount, filterCallback);
};
