import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const doStuff = function (source$, runCallback) {
  return passThroughNext(source$, function ({ next }, value) {
    runCallback(value);
    
    next(value);
  });
};

Observable.do = doStuff;
Observable.prototype.do = function (runCallback) {
  return doStuff(this, runCallback);
};
