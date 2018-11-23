import { Observable } from '../Observable';

/**
 * Will delay output from the observable until a specific time interval has passed
 *
 * @param {Observable} source$
 * @param {Number} time amount of time in milliseconds
 * @returns {Observable}
 */
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
