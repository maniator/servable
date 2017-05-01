import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const take = function (source$, amount, filterCallback = () => true) {
  const taken = [];
  
  return passThroughNext(source$, function ({ next, complete }, ...args) {
    const isComplete = taken.length === amount;
  
    if (filterCallback(...args) && !isComplete) {
      taken.push([...args]);
      next(...args);
    }
  
    if (isComplete) {
      complete();
    }
  });
};

Observable.prototype.take = function (amount, filterCallback) {
  return take(this, amount, filterCallback);
};
