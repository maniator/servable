import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const filter = function (source$, mapCallback) {
  return passThroughNext(source$, function ({ next }, ...args) {
    if(mapCallback(...args)) {
      next(...args);
    }
  });
};

Observable.prototype.filter = function (filterCallback) {
  return filter(this, filterCallback);
};
