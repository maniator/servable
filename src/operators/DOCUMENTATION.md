These methods called by doing: `observableInstance$.<pluginFunction>` or by calling `Observable.<pluginFunction>(observableInstance$, ...arguments)`

`.map(<mapCallback>)` 

 - will map each value to a new value using the callback
    
`.filter(<filterCallback>)` 

- will filter out values that you do not want to subscribe to
    
`.do(<doCallback>)`

- will run some callback before passing the current value to the subscription
    
`.take(<amount>[, <callback>])` 

- will take the amount of values you want (or less if it completes first) and then complete -- this is useful for infinitely running observables
- a callback may be passed to filter out the valeus you want to take
    
`.first([<callback>])` 

 - this is an alias for `.take(1[, <callback>])`
    
`.scan(scanCallback[, startValue])` 

 - will go through each value in array and will increase the value based off the return of the scanCallback
    - there is an optional `startValue` which by default is 0
    
`.reduce(scanCallback[, startValue])` 

 - does the same as `.scan` but only returns when the chained observable is complete and not on every new value
 
 `.toPromise()`
 
 - this will do a `.first()` on the observable object and return the value from that to the response from a promise
 
 `.flatMap(<mapCallback>)`
 
 - same as `.map(<mapCallback>)` but will take the value of the callback and turn it from an observable to a value
 
 `.switchMap(<mapCallback>)`
 
 - the value from the mapCallback is an observable and if another value comes through the previous observable is cancelled
    - this is useful for things like typeaheads where you dont want a request for every keypress
    
`.delay(<time>)`

- will delay output from the observable until a specific time interval has passed

`.debounceTime(<time>)`

- will only output values if there has not been any new values in the past time interval passed

`.sum()`

- will result in a sum of all of the values passed to the observer and then will complete

`.average()`

- will result in an average of all of the values passed to the observer and then will complete

`.max()`

- will result in the maximum value passed to the observer then will complete

`.min()`

- will result in the minimum value passed to the observer then will complete

`.count()`

- will result in the amount of values passed to the observer then will complete

`.concat([...anyNumberOfObservables$])`

- will run any number of observables in order and will only complete when the last one is done

`.combine(otherSources$[, combineCallback])`

- will multiple observables at the same time
    - will only call the observer's next function when all observables have emitted at least one value 
