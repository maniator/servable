import { Observable } from '../Observable';

export const interval = function (time, start = 0) {
  let count = start;
  
  return new Observable(function ({ next }) {
    const id = setInterval(function () {
      const nextNumber = count++;
      
      next(nextNumber);
    }, time);
    
    return () => clearInterval(id);
  });
};

Observable.interval = interval;
