import { Observable } from '../Observable';

export const interval = function (time, start = 0) {
  return new Observable(function ({ next }) {
    let count = start;
    const id = setInterval(function () {
      const nextNumber = count++;
      
      next(nextNumber);
    }, time);
    
    return () => clearInterval(id);
  });
};

Observable.interval = interval;
