import { Observable } from '../Observable';

export const log = function (source$, name) {
  return new Observable(function ({ next, error, complete }) {
    const subscription = source$.subscribe({
      next (value) {
        console.log(`[${name}]: ${value}`);
        
        next(value);
      },
      error,
      complete,
    });
    
    return () => subscription.unsubscribe();
  });
};

Observable.log = log;
Observable.prototype.log = function () {
  return log(this, this.toString());
};
