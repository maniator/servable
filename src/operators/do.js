import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

/**
 * Will run some callback before passing the current value to the subscription
 *
 * @param {Observable} source$
 * @param {Function} runCallback
 * @returns {Observable}
 *
 * @example
 * doStuff(obs$, (value) => console.log(value))
 *  .subscribe((sameValue) => console.log('Will log the same value: ', sameValue))l
 */
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
