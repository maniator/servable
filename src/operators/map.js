import { Observable } from '../Observable';
import { passThroughNext } from './passThroughNext';

export const map = function (source$, mapCallback) {
  return passThroughNext(source$, function (next, ...args) {
    next(mapCallback(...args));
  });
};

Observable.prototype.map = function (mapCallback) {
  return map(this, mapCallback);
};
