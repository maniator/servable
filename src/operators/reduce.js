import { Observable } from '../Observable';
import { scan } from './scan';

export const reduce = function (source$, scanCallback, startValue = 0) {
  return new Observable(function ({next, error, complete }) {
    let lastValue = 0;
    const subscription = scan(source$, scanCallback, startValue).subscribe({
      next (value) {
        lastValue = value;
      },
      error,
      complete () {
        next(lastValue);
        complete();
      }
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.reduce = reduce;
Observable.prototype.reduce = function (scanCallback, startValue) {
  return reduce(this, scanCallback, startValue);
};
