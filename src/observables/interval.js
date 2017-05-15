import { Observable } from '../Observable';
import { addToString } from '../utilities';

export const interval = function (time, start = 0) {
  return addToString(new Observable(function ({ next }) {
    let count = start;
    const id = setInterval(function () {
      const nextNumber = count++;
      
      next(nextNumber);
    }, time);
    
    return () => clearInterval(id);
  }), `interval(${time}, ${start})`);
};

Observable.interval = interval;
