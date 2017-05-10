import { Observable } from '../Observable';
import { reduce } from './reduce';

export const sum = function (source$) {
  return reduce(source$, (a, b) => a + b);
};

Observable.sum = sum;
Observable.prototype.sum = function () {
  return sum(this);
};
