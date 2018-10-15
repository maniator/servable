class Observable {
  constructor(observer) {
    this.isComplete = false;
    this.observer = observer;
    this.next = this.next.bind(this);
    this.complete = this.complete.bind(this);
    this.error = this.error.bind(this);
  }

  next (value) {
    if (!this.isComplete && this.observerMethods.next) {
      this.observerMethods.next(value);
    }
  }

  complete () {
    this.isComplete = true;
    if (!this.isComplete && this.observerMethods.complete) {
      this.observerMethods.complete();
    }
  }

  error () {
    if (this.observerMethods.error) {
      this.observerMethods.error();
    }
  }

  static fromEvent(target, eventType) {
    return new Observable(({ next }) => {
      const eventFn = (event) => next(event);
      target.addEventListener(eventType, eventFn, false);

      return () => {
        target.removeEventListener(eventType, eventFn);
      }
    });
  }

  subscribe (observerMethods) {
    this.observerMethods = observerMethods;
    const returnFromObserver = this.observer(this);
    return () => {
      if (returnFromObserver && typeof returnFromObserver === "function") {
        returnFromObserver();
      }
      this.complete();
    }
  }

  map (mappingFn) {
    return new Observable(({ next }) => {
      const unsubscribe = this.subscribe({
        next(value) {
          const mappedValue = mappingFn(value);
          next(mappedValue);
        }
      });

      return unsubscribe;
    });
  }

  filter (mappingFn) {
    return new Observable(({ next }) => {
      const unsubscribe = this.subscribe({
        next(value) {
          if(mappingFn(value)) {
            next(value);
          }
        }
      });

      return unsubscribe;
    });
  }

  take (number) {
    return new Observable(({ next, complete }) => {
      const values = [];
      const unsubscribe = this.subscribe({
        next (value) {
          values.push(value);
          next(value);
          if (values.length === number) {
            console.log(values.length, 'length passed', number);
            complete();
          }
        }
      });

      return unsubscribe;
    })
  }
}

window.Observable = Observable;