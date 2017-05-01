export const noop = () => null;

export const isPromise = (p) => p !== null && typeof p === 'object' && typeof p.then === 'function';
