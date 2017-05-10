import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const debounceTime = function (source$, time) {
  let timerId;
  
  return passThroughNext(source$, function ({ next }, ...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      next(...args);
    }, time);
  }, function () {
    clearTimeout(timerId);
  });
};

Observable.debounceTime = debounceTime;
Observable.prototype.debounceTime = function (time) {
  return debounceTime(this, time);
};
