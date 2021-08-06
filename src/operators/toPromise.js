import { Observable } from '../Observable';
import { first } from './first';

/**
 * Reverse of [`fromPromise`](#frompromise)
 * <br />
 * Converts an Observable to a promise, takes the first value and then completes
 * 
 * @memberof operators
 *
 * @param {Observable} source$
 * @returns {Promise<*>}
 */
export const toPromise = function (source$) {
  if (!global.Promise) {
    throw new Error('Promise does not exist in the current context');
  }
  
  return new Promise(function (respond, reject) {
    return first(source$).subscribe({
      next: respond,
      error: reject,
      complete: respond,
    });
  });
};

Observable.toPromise = toPromise;
Observable.prototype.toPromise = function () {
  return toPromise(this);
};
