import { Observable } from '../Observable';

export const delay = function (source$, time) {
  return new Observable((observer) => {
    let subscription;
    const timerId = setTimeout(() => {
      subscription = source$.subscribe(observer.next, observer.error, observer.complete);
    }, time);
    
    return () => {
      clearTimeout(timerId);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  });
};

Observable.delay = delay;
Observable.prototype.delay = function (time) {
  return delay(this, time);
};
