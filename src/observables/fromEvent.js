import { Observable } from '../Observable';

export const fromEvent = function (eventName, element) {
  return new Observable(function ({ next }) {
    const listener = function (event) {
      next(event, element);
    };
  
    element.addEventListener(eventName, listener, false);
  
    return function () {
      element.removeEventListener(eventName, listener, false);
    };
  });
};

Observable.fromEvent = fromEvent;
