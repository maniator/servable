These methods are called by doing: `Observable.<observableFunction>`

`.ajax(url[, options])`

- an observable wrapper around the `fetch` API
    - you can add a shim like [this one](https://github.com/github/fetch) if your environment does not have the fetch api

`.fromEvent(<eventName>, <element>[, <mapCallback>)`

- will create an observable that will listen for an event on a DOM element
- there is also an optional mappCallback that can be used to map the event that comes through the next observer function

`.fromPromise(<promise>)`

- turns a promise into an observable that emits the value of the promise and then completes

`.interval(<time>[, <start = 0>])`

- emits a number at the specified time interval and increases by one every time
- there is an optional start value that can be passed

`.of(<...values>)`

- takes any number of arguments and emits them in an observable (in order) and then completes

`.range(<start>[, <end>])`

- emits a range of numbers from start to end and then completes
- if only start is given than the range starts at 0 and ends at the start value