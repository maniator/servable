import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const debounceTime = function (source$, time) {
  return new Observable(function (observer) {
    let timerId;
    
    const subscription = passThroughNext(source$, function ({ next }, value) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        next(value);
      }, time);
    }, function () {
      clearTimeout(timerId);
    }).subscribe(observer);
    
    return () => subscription.unsubscribe();
  });
};

Observable.debounceTime = debounceTime;
Observable.prototype.debounceTime = function (time) {
  return debounceTime(this, time);
};
