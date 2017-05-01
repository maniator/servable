import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const doStuff = function (source$, runCallback) {
  return passThroughNext(source$, function (next, ...args) {
    runCallback(...args);
    
    next(...args);
  });
};

Observable.prototype.do = function (runCallback) {
  return doStuff(this, runCallback);
};
