import { passThroughNext } from './passThroughNext';
import { isObservable } from '../utilities';
import { of } from '../observables/of';

/**
 * @private
 * @param source$
 * @param mapCallback
 * @returns {Observable}
 */
export const passThroughNextObservable = function (source$, mapCallback) {
  return passThroughNext(source$, ({ next }, value) => {
    let nextValue$ = mapCallback(value);
  
    if (!isObservable(nextValue$)) {
      nextValue$ = of(nextValue$);
    }
  
    next(nextValue$);
  });
};
