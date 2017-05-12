import { Observable } from '../Observable';

export const scan = function (source$, scanCallback, startValue = 0) {
  return new Observable(function ({ next, error, complete }) {
    let previousValue = startValue;
    
    const subscription = source$.subscribe({
      next (value) {
        previousValue = scanCallback(previousValue, value);
        
        next(previousValue);
      },
      error,
      complete
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.scan = scan;
Observable.prototype.scan = function (scanCallback, startValue) {
  return scan(this, scanCallback, startValue);
};
