class Observable {
  constructor (observer) {
    this.observer = observer;
  }

  subscribe ({ next, complete, error }) {
    const data = this.observer({ next, complete, error });

    if (typeof data === 'function') {
      return data;
    }

    return () => null;
  }

  map (transform) {
    return new Observable(({ next }) => {
      const unsub = this.subscribe({
        next(value) {
          next(transform(value));
        }
      });

      return unsub;
    })
  }

  filter (predicate) {
    return new Observable(({ next }) => {
      const unsub = this.subscribe({
        next(value) {
          const checkP = predicate(value);

          if (checkP) {
            next(value);
          }
        }
      });

      return unsub;
    })
  }

  do (transform) {
    return new Observable(({ next }) => {
      const unsub = this.subscribe({
        next(value) {
          transform(value);
          next(value);
        }
      });

      return unsub;
    })
  }

  flatMap (mapCallback) {
    return new Observable((observer) => {
      const nextSubscriptionList = [];
      const onComplete = () => observer.complete;

      const unsub = this.map(mapCallback)
        .subscribe({next: (nextValue$) => {
          const nextSubscription = nextValue$.subscribe({
              next: observer.next,
            error: observer.error,
            complete: onComplete
          });

          nextSubscriptionList.push(nextSubscription);
        }, error: observer.error, complete: onComplete});

      return () => {
        nextSubscriptionList.forEach((nextSub) => nextSub());
        unsub();
      };
    });
  }
}

const inputObservable$ = new Observable(({ next }) => {
  const max = 10;
  let i = 0;

  while (i <= max) {
    next(i++);
  }
});

const inputListener$ = new Observable(({ next }) => {
  const input = document.getElementById('myInput');

  input.addEventListener('input', ({ currentTarget }) => next(currentTarget.value))
});

const text = document.getElementById('myText');


inputListener$
  // .do(console.log)
  // .filter(value => value === 'Hello')
  // .do(console.log)
  .map((val) => val.split('').reverse().join(''))
  .flatMap((value) => {
    const obs$ = new Observable(({ next }) => {
      text.textContent = value;

      setTimeout(next.bind(this, value), 500);
    });

    return obs$;
  })
  // .do(console.log)
  .subscribe(({
    next(value) {
      console.log('value', value)
    }
  }));