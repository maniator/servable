import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const debounceTime = function (source$, time) {
  let timerId;
  
  return passThroughNext(source$, function ({ next }, value) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      next(value);
    }, time);
  }, function () {
    clearTimeout(timerId);
  });
};

Observable.debounceTime = debounceTime;
Observable.prototype.debounceTime = function (time) {
  return debounceTime(this, time);
};
