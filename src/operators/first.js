import { Observable } from '../Observable';
import { take } from './take';

export const first = function (source$, filterCallback) {
  return take(source$, 1, filterCallback);
};

Observable.prototype.first = function (filterCallback) {
  return first(this, filterCallback);
};
