class Observable {
  constructor (subscriber) {
    this.subscriber = subscriber;
  }
  
  subscribe ({ next }) {
    const disposed = this.subscriber({ next });
    
    if (typeof disposed === 'function') {
      return disposed;
    }
    
    return () => null;
  }
  
  map (mapCallback) {
    return new Observable(({ next }) => {
      const unsub = this.subscribe({ 
        next (value) {
          next(mapCallback(value));
        }
      })
      
      return unsub;
    });
  }
  
  do (mapCallback) {
    return new Observable(({ next }) => {
      const unsub = this.subscribe({ 
        next (value) {
          mapCallback(value);
          next(value);
        }
      })
      
      return unsub;
    });
  }
  
  filter (mapCallback) {
    return new Observable(({ next }) => {
      const unsub = this.subscribe({ 
        next (value) {
          if(mapCallback(value)) {
            next(value);
          }
        }
      })
      
      return unsub;
    });
  }
}

const inputObservable$ = new Observable(({ next }) => {
	const input = document.getElementById('myInput');
  
  const l = () => {
    next(input.value);
  }
  
  input.addEventListener('input', l, false);
  
  return () => input.removeEventListener('input', l, false)
});

const div = document.getElementById('myText');
const mapObs$ = inputObservable$
  // .do(console.log.bind(console.log, 'BEFORE MAP'))
  .map((text) => text.split('').reverse().join(''));
  
mapObs$.subscribe({
  next(value) {
    console.log('Reverse with no filters', value);
  }
})
const unsubscribe = mapObs$
  // .do(console.log.bind(console.log, 'BEFORE FILTER'))
  .filter((text) => text.length > 4)
  // .do(console.log.bind(console.log, 'BEFORE SUB'))
  .do((value) => div.textContent = value)
  .subscribe({
    next: (value) => {
      console.log('Reverse Filter value', value);
    }
  });

// unsubscribe();