class Observable {
  constructor (subscriber) {
    this.subscriber = subscriber;
  }
  
  subscribe ({ next }) {
    const dispose = this.subscriber({ next });
    return typeof dispose === 'function' ? dispose : () => null;
  }
  
  filter (callback) {
    return new Observable(({ next }) => {
      const innerUnsub = this.subscribe({
        next(value) {
          if (callback(value)) {
            next(value);
          }
        }
      });
      
      return () => {
        innerUnsub();
      }
    });
  }
  
  map (callback) {
    return new Observable(({ next }) => {
      const innerUnsub = this.subscribe({
        next(value) {
          next(callback(value));
        }
      });
      
      return () => {
        innerUnsub();
      }
    });
  }
}

const inputObservable$ = new Observable(({ next }) => {
	const max = 10;
	let i = 0;
	
	while (i <= max) {
		next(i++);
	}
  
  return () => {
    console.log('I am doing some cleanup');
  };
});

const obs$ = new Observable(({ next }) => {
  const input = document.getElementById('myInput');
  const listener = () => {
    next(input.value);
  }
  
  input.addEventListener('input', listener, false);
  
  return () => {
    input.removeEventListener('input', listener, false);
  }
})

const div = document.getElementById('myText');

const unsubscribe2 = obs$
.filter((value) => value.length > 4)
.subscribe({
  next: (value) => {
    console.log('Input value from mapped', value);
    div.textContent = value;
  }
});
