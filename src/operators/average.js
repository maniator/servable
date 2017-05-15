import { Observable } from '../Observable';
import { addToString } from '../utilities';

export const average = function (source$) {
  return addToString(new Observable(function ({ next, error, complete }) {
    let count = 0;
    let total = 0;
    
    const subscription = source$.subscribe({
      next(value) {
        count++;
        total += value;
      },
      error,
      complete () {
        next(total / count);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  }), 'average', source$);
};

Observable.average = average;
Observable.prototype.average = function () {
  return average(this);
};
