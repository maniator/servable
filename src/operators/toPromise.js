import { Observable } from '../Observable';
import { first } from './first';

// to convert to a promise just take the first value that the observable emits and then complete
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
