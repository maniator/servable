/**
 * @namespace utilities
 * 
 * 
 */

/**
 * @memberof utilities
 * @returns {null}
 */
 export const noop = () => null;

/**
 * @memberof utilities
 * @param p
 * @returns {boolean}
 */
 export const isPromise = (p) => p !== null && typeof p === 'object' && typeof p.then === 'function';

/**
 * @memberof utilities
 * @param o$
 * @returns {boolean}
 */
export const isObservable = (o$) => o$ !== null && typeof o$ === 'object' && typeof o$.subscribe === 'function';

export { makeHot } from "./utilities/makeHot"
