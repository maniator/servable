export const noop = () => null;

export const isPromise = (p) => p !== null && typeof p === 'object' && typeof p.then === 'function';

export const isObservable = (o$) => o$ !== null && typeof o$ === 'object' && typeof o$.subscribe === 'function';

export const addToString = (source$, name, originalSource$ = null) => {
  source$.toString = () => `${originalSource$ ? originalSource$.toString() + '.' : '' }${name}`;
  
  return source$;
};
