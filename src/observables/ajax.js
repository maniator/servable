import { Observable } from '../Observable';
import { fromPromise } from './fromPromise';

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

// do an ajax call (depends on the "fetch" api existing)
// can add this shim to simulate fetch in all browsers https://github.com/github/fetch
export const ajax = function (...args) {
  return new Observable(function (observer) {
    if (global.fetch) {
      const fetchPromise = fetch(...args).then(checkStatus).catch(observer.error);
      const subscription = fromPromise(fetchPromise).subscribe(observer);
  
      return () => subscription.unsubscribe();
    } else {
      throw new Error('Fetch API does not exist in your environment');
    }
  });
};

Observable.ajax = ajax;
