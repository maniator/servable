import { Observable } from '../Observable';

export const range = function (start, end = null) {
  // if no end is given assume start at 0 until start number
  if (!end) {
    end = start;
    start = 0;
  }
  
  return new Observable(function ({ next, complete }) {
    for (let current = start; current <= end; ++current) {
      next(current);
    }
  
    complete();
  });
};

Observable.range = range;
