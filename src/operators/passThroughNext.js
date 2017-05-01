import { Observable } from '../Observable';

const noop = () => {};

export const passThroughNext = function (source$, nextFunction, dispose = noop) {
  return new Observable((observer) => {
    const subscription = source$.subscribe({
      next: nextFunction.bind(this, observer),
      error: observer.error,
      complete: observer.complete,
    });
    
    return function () {
      dispose();
      
      subscription.unsubscribe();
    };
  });
};
