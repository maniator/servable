/**
 * @private
 * @returns {null}
 */
export const noop = () => null;

/**
 * @private
 * @param p
 * @returns {boolean}
 */
export const isPromise = (p) => p !== null && typeof p === 'object' && typeof p.then === 'function';

/**
 * @private
 * @param o$
 * @returns {boolean}
 */
export const isObservable = (o$) => o$ !== null && typeof o$ === 'object' && typeof o$.subscribe === 'function';
