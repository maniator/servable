import { Observable } from '../Observable';

/**
 *
 * @param {XMLHttpRequest} xhr
 * @returns {*}
 */
function checkStatus (xhr) {
  if (xhr.status >= 200 && xhr.status < 300) {
    return Object.assign(xhr, {
      toJSON () {
        return JSON.parse(xhr.responseText);
      }
    });
  } else {
    const error = new Error(xhr.statusText);

    error.xhr = xhr;

    throw error;
  }
}

/**
 * Make a cancellable XHR request
 *
 * @param {string} url
 * @param {string} [method]
 * @param {*} [requestData]
 * @param {{name: string, value: string}[]} [headers]
 *
 * @returns {Observable}
 */
export const ajax = function (url, { method = 'GET', requestData = '', headers = [] } = {}) {
  return new Observable(function (observer) {
    const xhr = new XMLHttpRequest();

    function xhrStateChanged() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          observer.next(checkStatus(xhr));
        } catch (error) {
          observer.error(error);
        }
        observer.complete();
      }
    }

    xhr.open(method, url);

    headers.forEach(header => {
      xhr.setRequestHeader(header.name, header.value);
    });

    xhr.onreadystatechange = xhrStateChanged;

    xhr.send(JSON.stringify(requestData));

    return () => xhr.abort();
  });
};

Observable.ajax = ajax;
