import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const filter = function (source$, mapCallback) {
  return passThroughNext(source$, function ({ next }, value) {
    if(mapCallback(value)) {
      next(value);
    }
  });
};

Observable.filter = filter;
Observable.prototype.filter = function (filterCallback) {
  return filter(this, filterCallback);
};
