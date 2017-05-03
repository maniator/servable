import { Observable } from '../Observable';

export const of = function (...list) {
  return new Observable((observer) => {
    Array.from(list).forEach((value) => {
      observer.next(value);
    });
    
    observer.complete();
  });
};

Observable.of = of;
