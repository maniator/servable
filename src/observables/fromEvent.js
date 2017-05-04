import { Observable } from '../Observable';
import { makeHot } from '../utilities/makeHot';

export const fromEvent = function (eventName, element, mapCallback = (v) => v) {
  return makeHot(new Observable(function ({ next }) {
    const listener = function (event) {
      next(mapCallback(event));
    };
    
    element.addEventListener(eventName, listener, false);
  
    return function () {
      element.removeEventListener(eventName, listener, false);
    };
  }));
};

Observable.fromEvent = fromEvent;
