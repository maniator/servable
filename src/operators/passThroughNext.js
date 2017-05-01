import { Observable } from '../Observable';

export const passThroughNext = function (source$, nextFunction) {
  return new Observable(({next, error, complete}) => {
    const subscription = source$.subscribe({
      next: nextFunction.bind(this, next),
      error,
      complete,
    });
    
    return function () {
      subscription.unsubscribe();
    };
  });
};
