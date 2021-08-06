import { Observable } from '../Observable';
import { makeHot } from '../utilities/makeHot';

/**
 * Will create an observable that will listen for an event on a DOM element
 *
 * Utilizes the [`makeHot`](#makehot) method so that the event does not get reattached on every subscription
 * 
 * @memberof observables
 * 
 * 
 * @param {string} eventName
 * @param {Element} element
 * @param {Function} [mapCallback]
 * @returns {Observable}
 */
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
